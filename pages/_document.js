// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#001f33" />
        <meta name="description" content="Calculate surface intervals for technical freediving." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
