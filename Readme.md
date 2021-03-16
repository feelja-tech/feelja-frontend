## dev HTTPS

FE

```bash
cd ./certs
sudo ./ssl-proxy-linux-amd64 -from 0.0.0.0:443 -to 0.0.0.0:3000 -cert cert.pem -key key.pem
```

API

```bash
cd ./certs
sudo ./ssl-proxy-linux-amd64 -from 0.0.0.0:4443 -to 0.0.0.0:4000 -cert cert.pem -key key.pem
```

## iOS

- Disable bitcode in "Build settings" in project config

## Chromatic

You can check out the UI at https://www.chromatic.com/pullrequests?appId=5fb24e28552e8e00212e89a7

## Usage

This project is a standard Next.js app, so the typical Next.js development process applies (`npm run dev` for browser-based development). However, there is one caveat: the app must be exported to deploy to iOS and Android, since it must run purely client-side. ([more on Next.js export](https://nextjs.org/docs/advanced-features/static-html-export))

To build the app, run:

```bash
yarn run build
yarn run export
```

All the client side files will be sent to the `./out/` directory. These files need to be copied to the native iOS and Android projects, and this is where Capacitor comes in:

```bash
yarn cap copy
```

Finally, to run the app, open the Native IDE for the platform and follow the IDE's run process (note: a CLI run [will be available in Capacitor 3](https://capacitorjs.com/blog/announcing-capacitor-3-0-beta):

```
yarn cap open ios
yarn cap open android
```

## Caveats

One caveat with this project: Because the app must be able to run purely client-side and use [Next.js's Export command](https://nextjs.org/docs/advanced-features/static-html-export), that means no Server Side Rendering in this code base. There is likely a way to SSR and a fully static Next.js app in tandem but it requires [a Babel plugin](https://github.com/erzr/next-babel-conditional-ssg-ssr) or would involve a more elaborate monorepo setup with code sharing that is out of scope for this project.

Additionally, Next.js routing is not really used much in this app beyond a catch-all route to render the native app shell and engage the Ionic React Router. This is primarily because Next.js routing is not set up to enable native-style transitions and history state management like the kind Ionic uses.
