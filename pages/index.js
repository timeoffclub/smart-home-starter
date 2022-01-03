import Head from 'next/head'
import { getPropsForCategory, getMenuBySlug  } from '../lib/api'
import Header from '../components/header'
import Footer from '../components/footer'
import HomeFeatured from '../components/home-featured'
import FeaturedCategory from '../components/featured-category'
import NewsLetterPageCTA from '../components/newsletter-page-cta'

export default function Home({ top, hardware, brands, navigationMenus }) {
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
            </Head>
            <Header menu={navigationMenus}/>
            <div className='container mt-14'>
                <HomeFeatured myArticles={top.nodes} myCategory={'Featured'}/>
            </div>
            <NewsLetterPageCTA/>
            <div className='container px-5 sm:px-0'>
                <div className='bg-gray-300 w-full h-32 mt-14'>
                    AD
                </div>
            </div>
            <div className='container mt-14'>
                <div className='mx-4 xl:mx-0 text-7xl text-sky-600 font-display tracking-wide mb-5'>
                    <a href={kebabCase(`../category/${hardware.categoryName.edges[0].node.name}`)}>
                        {hardware.categoryName.edges[0].node.name}
                    </a>
                </div>
                <FeaturedCategory myArticles={hardware.posts.nodes} myCategory={'TVs'}/>
                <div className='mx-4 xl:mx-0 text-7xl text-sky-600 font-display tracking-wide mb-5'>
                    <a href={kebabCase(`../category/${brands.categoryName.edges[0].node.name}`)}>
                        {brands.categoryName.edges[0].node.name}
                    </a>
                </div>
                <FeaturedCategory myArticles={brands.posts.nodes} myCategory={'Ring'} />
            </div>
			<Footer myMenu={navigationMenus} />
        </>
    )
}

export async function getStaticProps({ preview = false}) {
    const top = await getPropsForCategory('featured', 24)
    const hardware = await getPropsForCategory('tvs', 24)
	const brands = await getPropsForCategory('ring', 24)
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
			hardware: hardware,
			brands: brands,
			navigationMenus: navigationMenus
		},
        revalidate: 1
	}
}
