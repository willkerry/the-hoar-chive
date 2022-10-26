import '../styles/globals.css'
import '@fontsource/rubik/variable.css'
import '@fontsource/rubik/variable-italic.css'

import Header from '../components/header'
import Footer from '../components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <title>The Hoar</title>
      </head>
      <body className="flex flex-col items-center justify-center min-h-screen antialiased">
        <main className="flex flex-col flex-1 max-w-screen-sm gap-4 px-4 my-4 lg:my-8">
          <Header />
          <div className="h-6" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
