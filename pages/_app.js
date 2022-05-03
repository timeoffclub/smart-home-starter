import '../styles/globals.scss'
import '@fontsource/source-sans-pro'
import '@fontsource/passion-one'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'

import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

// export function reportWebVitals({ id, name, label, value }) {
//     console.log(name, value, id)
//     // Use `window.gtag` if you initialized Google Analytics as this example:
//     // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
//     if (window && window.gtag) {
//         window.gtag('event', name, {
//             event_category:
//                 label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
//             value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
//             event_label: id, // id unique to current page load
//             non_interaction: true, // avoids affecting bounce rate.
//         })
//     }
// }

function MyApp({ Component, pageProps }) {

    const router = useRouter()

    useEffect(() => {

        import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
            ReactPixel.init(process.env.NEXT_PUBLIC_FB_PIXEL_ID)
            ReactPixel.pageView()
            
            router.events.on('routeChangeComplete', () => {
                ReactPixel.pageView()
            })
        })

        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
        
    }, [router.events])

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                `,
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
