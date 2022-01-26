import '../styles/globals.scss'
import '@fontsource/source-sans-pro'
import '@fontsource/passion-one'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'

import { useEffect, useState } from 'react'
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
        const loadAds = (url) => {
            window.adthrive = window.adthrive || {};
            window.adthrive.cmd = window.adthrive.cmd || [];
            window.adthrive.plugin = 'adthrive-ads-manual';
            window.adthrive.host = 'ads.adthrive.com';
        
            var s = document.createElement('script');
            s.async = true;
            s.referrerpolicy='no-referrer-when-downgrade';
            s.src = 'https://' + window.adthrive.host + '/sites/6164a6ff014ece4bc4e34c23/ads.min.js?referrer=' + window.encodeURIComponent(window.location.href) + '&cb=' + (Math.floor(Math.random() * 100) + 1);
            var n = document.getElementsByTagName('script')[0];
            n.parentNode.insertBefore(s, n);
        }

        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('routeChangeComplete', loadAds)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('routeChangeComplete', loadAds)
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
