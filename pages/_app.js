import '../styles/globals.scss'
import '@fontsource/source-sans-pro'
import '@fontsource/passion-one'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'

export function reportWebVitals(metric) {
  console.log(metric)
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
