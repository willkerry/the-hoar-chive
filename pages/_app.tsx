import '../styles/globals.css'
import '@fontsource/rubik/variable.css'
import '@fontsource/rubik/variable-italic.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
