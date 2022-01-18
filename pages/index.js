import dynamic from 'next/dynamic'
import useInView from 'react-cool-inview'
import Head from 'next/head'
import { kebabCase } from '../lib/utils'
import { getPropsForCategory, getMenuBySlug  } from '../lib/api'
import Header from '../components/header'
import HomeFeatured from '../components/home-featured'

const FeaturedCategory = dynamic(() => import('../components/featured-category'))
const NewsLetterPageCTA = dynamic(() => import('../components/newsletter-page-cta'))
const Footer = dynamic(() => import('../components/footer'))

export default function Home({ top, hardware, brands, navigationMenus }) {

    const { observe, inView } = useInView({
        // Stop observe when the target enters the viewport, so the "inView" only triggered once
        unobserveOnEnter: true
    })

    return (
        <>
            <Head>
                <title>Smart Home Starter</title>
                <meta name="description" content="We are two guys into tech exploring the world of smart home technology. We wanted to share some of our favorites with you!" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="google-site-verification" content="F4mea1tErzcEzFPCTRuzYG1F3gkXIG12ipkpqKvs-e4" />
            </Head>
            <Header menu={navigationMenus}/>
            <main className='adthrive-body'>
                <div className='container mt-14'>
                    <HomeFeatured myArticles={top.nodes} myCategory={'Featured'}/>
                </div>
                <div ref={observe}>
                    {inView ?
                        <NewsLetterPageCTA/>
                    :
                        <div className='h-48 bg-black w-full'>
                        </div>
                    }
                </div>
                <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                    <div className='adthrive-ad-container w-full mt-14'>
                    </div>
                </div>
                <div className='container mt-14'>
                    <div className='mx-4 sm:mx-0 md:text-7xl text-6xl tracking-wide mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={kebabCase(`../category/${hardware.categoryName.edges[0].node.name}`)}>
                            {hardware.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={hardware.posts.nodes} myCategory={'TVs'}/>
                    <div className='text-xl underline underline-offset-2 ml-6 xl:ml-0 mt-[-50px]'>
                        <a href={kebabCase(`../category/${hardware.categoryName.edges[0].node.name}`)}>
                            View all
                        </a>
                    </div>
                    <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                        <div className='adthrive-ad-container w-full mt-14'>
                        </div>
                    </div>
                    <div className='mx-4 sm:mx-0 md:text-7xl text-6xl tracking-wide mt-12 mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={kebabCase(`../category/${brands.categoryName.edges[0].node.name}`)}>
                            {brands.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={brands.posts.nodes} myCategory={'Samsung'} />
                    <div className='text-xl underline underline-offset-2 ml-6 xl:ml-0 mt-[-50px] mb-28'>
                        <a href={kebabCase(`../category/${brands.categoryName.edges[0].node.name}`)}>
                            View all
                        </a>
                    </div>
                    <div className='container px-5 sm:px-0 md:px-6 xl:px-0'>
                        <div className='adthrive-ad-container w-full mt-14'>
                        </div>
                    </div>
                </div>
            </main>
            <Footer myMenu={navigationMenus} />
        </>
    )
}

export async function getStaticProps({ preview = false}) {
    //TODO: Randomize these--or better yet, use some kind of promotion algorithm
    const top = await getPropsForCategory('featured', 24)
    const hardware = await getPropsForCategory('tvs', 24)
	const brands = await getPropsForCategory('samsung', 24)
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
