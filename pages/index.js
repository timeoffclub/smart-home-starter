import dynamic from 'next/dynamic'
import useInView from 'react-cool-inview'
import Head from 'next/head'
import { kebabCase } from '../lib/utils'
import { getPropsForCategory, getNavigation  } from '../lib/api'
import HomeFeatured from '../components/home-featured'
import Header from '../components/header'
import Footer from '../components/footer'

const FeaturedCategory = dynamic(() => import('../components/featured-category'))
const NewsLetterPageCTA = dynamic(() => import('../components/newsletter-page-cta'))

export default function Home({ top, hardware, brands, nav }) {
    let navigationObject = []
    navigationObject.push(...nav.menus.nodes[0].menuItems.nodes.filter((el) => el.parentId === null))
    navigationObject.map((el) => {
        el.menuItems = [...nav.menus.nodes[0].menuItems.nodes.filter((node) => node.parentId === el.id)]
    })


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
            <Header menu={navigationObject}/>
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
                <div className='container px-6 sm:px-0 md:px-6  2xl:px-0'>
                    <div className='adthrive-ad-container w-full mt-14'>
                    </div>
                </div>
                <div className='container mt-14'>
                    <div className='px-6  2xl:px-0 sm:mx-0 md:text-7xl text-6xl tracking-wide mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={`../category/${kebabCase(hardware.categoryName.edges[0].node.name)}`}>
                            {hardware.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={hardware.posts.nodes} myCategory={'TVs'}/>
                    <div className='text-xl underline underline-offset-2 px-6  2xl:px-0 mt-[-50px]'>
                        <a href={`../category/${kebabCase(hardware.categoryName.edges[0].node.name)}`}>
                            View all
                        </a>
                    </div>
                    <div className='container px-6  2xl:px-0'>
                        <div className='adthrive-ad-container w-full mt-14'>
                        </div>
                    </div>
                    <div className='px-6  2xl:px-0 sm:mx-0 md:text-7xl text-6xl tracking-wide mt-12 mb-5'>
                        <a className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green' href={`../category/${kebabCase(brands.categoryName.edges[0].node.name)}`}>
                            {brands.categoryName.edges[0].node.name}
                        </a>
                    </div>
                    <FeaturedCategory myArticles={brands.posts.nodes} myCategory={'Samsung'} />
                    <div className='text-xl underline underline-offset-2 px-6  2xl:px-0 mt-[-50px] mb-28'>
                        <a href={`../category/${kebabCase(brands.categoryName.edges[0].node.name)}`}>
                            View all
                        </a>
                    </div>
                    <div className='container px-6  2xl:px-0'>
                        <div className='adthrive-ad-container w-full mt-14'>
                        </div>
                    </div>
                </div>
            </main>
            <Footer myMenu={navigationObject}/>
        </>
    )
}

export async function getStaticProps({ preview = false}) {
    //TODO: Randomize these--or better yet, use some kind of promotion algorithm
    const top = await getPropsForCategory('featured', 24)
    const hardware = await getPropsForCategory('tvs', 24)
	const brands = await getPropsForCategory('samsung', 24)
	const nav = await getNavigation()

	return {
		props: {
			preview,
			top: top?.posts,
			hardware: hardware,
			brands: brands,
            nav: nav
		},
        revalidate: 3600
	}
}
