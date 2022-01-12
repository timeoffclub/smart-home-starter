import Head from 'next/head'
import Script from 'next/script'
import { getPropsForCategory, getMenuBySlug  } from '../lib/api'
import Header from '../components/header'
import Footer from '../components/footer'
import HomeFeatured from '../components/home-featured'
import FeaturedCategory from '../components/featured-category'
import NewsLetterPageCTA from '../components/newsletter-page-cta'

export default function Home({ top, tvs, ring, samsung, lg, navigationMenus }) {
    // Converts menuItem labels to slugs, since slugs don't exist on menuItems
    const kebabCase = string => string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

    return (
        <>
            <Head>
                <title>Smart Home Starter</title>
                <meta name="description" content="We are two guys into tech exploring the world of smart home technology. We wanted to share some of our favorites with you!" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="google-site-verification" content="F4mea1tErzcEzFPCTRuzYG1F3gkXIG12ipkpqKvs-e4" />
            </Head>
            <Script
                id='load-ads'
                strategy='lazyOnload'
                dangerouslySetInnerHTML={{
                __html: `
                (function(w, d) {
                    w.adthrive = w.adthrive || {};
                    w.adthrive.cmd = w.adthrive.cmd || [];
                    w.adthrive.plugin = 'adthrive-ads-manual';
                    w.adthrive.host = 'ads.adthrive.com';
                
                    var s = d.createElement('script');
                    s.async = true;
                    s.referrerpolicy='no-referrer-when-downgrade';
                    s.src = 'https://' + w.adthrive.host + '/sites/6164a6ff014ece4bc4e34c23/ads.min.js?referrer=' + w.encodeURIComponent(w.location.href) + '&cb=' + (Math.floor(Math.random() * 100) + 1);
                    var n = d.getElementsByTagName('script')[0];
                    n.parentNode.insertBefore(s, n);
                })(window, document);
                `,
                }}
            />
            <Header menu={navigationMenus}/>
            <main className='adthrive-body'>
                <div className='container mt-14'>
                    <HomeFeatured myArticles={top.nodes} myCategory={'Featured'}/>
                </div>
                <NewsLetterPageCTA/>
                <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                    <div className='adthrive-ad-container w-full h-60 mt-14'>
                    </div>
                </div>
                <div className='container mt-14'>
                    <div className='mx-4 sm:mx-0 md:text-7xl text-6xl tracking-wide mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={kebabCase(`../category/${tvs.categoryName.edges[0].node.name}`)}>
                            {tvs.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={tvs.posts.nodes} myCategory={'TVs'}/>
                    <div className='text-3xl ml-6 xl:ml-0 mt-[-50px]'>
                        <a href={kebabCase(`../category/${tvs.categoryName.edges[0].node.name}`)}>
                            View all
                        </a>
                    </div>
                    <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                        <div className='adthrive-ad-container w-full h-60 mt-14'>
                        </div>
                    </div>
                    <div className='mx-4 sm:mx-0 md:text-7xl text-6xl tracking-wide mt-12 mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={kebabCase(`../category/${ring.categoryName.edges[0].node.name}`)}>
                            {ring.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={ring.posts.nodes} myCategory={'Ring'} />
                    <div className='text-3xl ml-6 xl:ml-0 mt-[-50px] mb-28'>
                        <a href={kebabCase(`../category/${ring.categoryName.edges[0].node.name}`)}>
                            View all
                        </a>
                    </div>
                    <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                        <div className='adthrive-ad-container w-full h-60 mt-14'>
                        </div>
                    </div>
                    <div className='mx-4 sm:mx-0 md:text-7xl text-6xl tracking-wide mt-12 mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={kebabCase(`../category/${samsung.categoryName.edges[0].node.name}`)}>
                            {samsung.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={samsung.posts.nodes} myCategory={'Samsung'} />
                    <div className='text-3xl ml-6 xl:ml-0 mt-[-50px] mb-28'>
                        <a href={kebabCase(`../category/${samsung.categoryName.edges[0].node.name}`)}>
                            View all
                        </a>
                    </div>
                    <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                        <div className='adthrive-ad-container w-full h-60 mt-14'>
                        </div>
                    </div>
                    <div className='mx-4 sm:mx-0 md:text-7xl text-6xl tracking-wide mt-12 mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={kebabCase(`../category/${lg.categoryName.edges[0].node.name}`)}>
                            {lg.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={lg.posts.nodes} myCategory={'LG'} />
                    <div className='text-3xl ml-6 xl:ml-0 mt-[-50px] mb-28'>
                        <a href={kebabCase(`../category/${lg.categoryName.edges[0].node.name}`)}>
                            View all
                        </a>
                    </div>
                </div>
            </main>
			<Footer myMenu={navigationMenus} />
        </>
    )
}

export async function getStaticProps({ preview = false}) {
    const top = await getPropsForCategory('featured', 24)
    const tvs = await getPropsForCategory('tvs', 24)
	const ring = await getPropsForCategory('ring', 24)
	const samsung = await getPropsForCategory('samsung', 24)
	const lg = await getPropsForCategory('lg', 24)
	let navigationSlugs = [
		'brands',
		'faq',
		'entertainment',
		'in-the-home'
	]
	let navigationMenus = []
	let i = 0
	do {
		let res = await getMenuBySlug(navigationSlugs[i])
		navigationMenus.push(...res?.menus?.nodes)
		i++
	} while (i < navigationSlugs.length)

	return {
		props: {
			preview,
			top: top?.posts,
			tvs: tvs,
			ring: ring,
			samsung: samsung,
			lg: lg,
			navigationMenus: navigationMenus
		},
        revalidate: 1
	}
}
