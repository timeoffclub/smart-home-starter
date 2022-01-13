import '../styles/globals.scss'
import "@fontsource/source-sans-pro"
import "@fontsource/alfa-slab-one"
import "@fontsource/passion-one"
import "@fontsource/source-sans-pro/300.css"
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-sans-pro/600.css"
import "@fontsource/source-sans-pro/700.css"
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export function reportWebVitals(metric) {
  console.log(metric)
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
