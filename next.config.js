const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const JavaScriptObfuscatorPlugin = require("webpack-obfuscator");
const { obfuscate } = require("javascript-obfuscator");
const {
  IS_BUNDLED_PAGE,
  MATCH_ROUTE_NAME,
} = require("next/dist/server/lib/utils");

const isDev = process.env.NODE_ENV === "development";

const obfuscatorOptions = {
  optionsPreset: "low-obfuscation",
};

class NextJSBundleObfuscatorPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin("after-compile", (compilation, callback) => {
      const pages = Object.keys(compilation.namedChunks)
        .map((key) => compilation.namedChunks[key])
        .filter((chunk) => IS_BUNDLED_PAGE.test(chunk.name));
      pages.forEach((chunk) => {
        const obfuscated = obfuscate(
          compilation.assets[chunk.name].source(),
          this.options
        ).getObfuscatedCode();
        compilation.assets[chunk.name] = {
          source: () => obfuscated,
          size: () => obfuscated.length,
        };
      });
      callback();
    });
  }
}

const settings = {
  experimental: {
    optimizeFonts: !isDev,
  },
  pwa: {
    dest: "public",
  },
  webpack: (config, { isServer }) => {
    if (!isDev && process.env.OBFUSCATE === "true") {
      config.plugins.push(
        new JavaScriptObfuscatorPlugin(obfuscatorOptions, ["bundles/**/**.js"])
      );
      config.plugins.push(new NextJSBundleObfuscatorPlugin(obfuscatorOptions));
    }

    return isServer
      ? config
      : { ...config, node: { fs: "empty", net: "empty", tls: "empty" } };
  },
  typescript: {
    ignoreBuildErrors: process.env.ANALYZE === "true",
  },
  images:
    process.env.EXPORT === "true"
      ? {
          loader: "imgix",
          path: "https://sophia.imgix.net",
        }
      : {
          domains: [
            "s3.eu-west-1.amazonaws.com",
            "sophia-static-media.s3-eu-west-1.amazonaws.com",
          ],
        },
};

module.exports = withBundleAnalyzer(isDev ? settings : withPWA(settings));
