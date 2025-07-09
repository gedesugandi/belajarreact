import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="kcBgTZRg3mp333Duor8iVzJ3meMpkdzzFfX_PZuWkic" />
      </Head>
      <body className="antialiased min-h-screen bg-gray-50 text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
