const { createProxyMiddleware } = require("http-proxy-middleware");

const expressMiddleWare = (router) => {
  router.use(
    "/_next/image",
    createProxyMiddleware({
      target: "http://192.168.1.4:3000",
      changeOrigin: true,
    })
  );
};

module.exports = expressMiddleWare;
