import { useState } from 'react'
import { getPropsForCategory, getCategories, getPostsByCategory, getNavigation } from '../../lib/api'
import Head from 'next/head'
import FeaturedCategory from '../../components/featured-category'
import ArticleFilterBar from '../../components/article-filter-bar'
import useInView from 'react-cool-inview'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import Header from '../../components/header'
import Footer from '../../components/footer'

const ArticleGrid = dynamic(() => import('../../components/article-grid'))

export default function Categories({ posts, featured, category, filterMenu, nav}) {

	const [filteredPosts, setFilteredPosts] = useState(false)
	const [allLoaded, setAllLoaded] = useState(false)

	const { observe, inView } = useInView({
        // Stop observe when the target enters the viewport, so the "inView" only triggered once
        unobserveOnEnter: true
    })

    const router = useRouter()

	const categories = []

	let featuredArticle

	if (!router.isFallback) {
		// If we don't have enough featured posts to fill the featured module, fill the rest of the module with regular posts
		featured.length < 20 ?
		featured = featured.concat(posts.nodes.filter((node) => node.categories.edges.every((el) => el.node.name !== 'Featured')).slice(0, (20 - featured.length)))
		: featured

		featured.length > 0 ? featuredArticle = featured[0] : posts[0]

		posts.nodes.forEach(el => {
			el.categories.edges.forEach(e => {
				!categories.includes(e.node.name) && categories.push(e.node.name)
			})
		})
	}

	const filterTabs = []
	categories.forEach(el => filterTabs.push({label: el}))

	const filter = (cat) => {
		if (cat === 'All') {
			setFilteredPosts(posts.nodes)
			setAllLoaded(true)
		} else {
			setFilteredPosts(posts.nodes.filter((article) => article.categories.edges.some((el) => el.node.name === cat)))
			setAllLoaded(true)
		}
	}

	async function loadAllPosts() {
		setFilteredPosts(posts.nodes)
		setAllLoaded(true)
	}

	return (
		<>  
			{router.isFallback ? (
                <div className='container flex justify-center items-center h-screen mx-6'>
                    <div className='text-lg'>
                        You&apos;ve found new content for this page! Just a moment while we update it for everyone.
                    </div>
                </div>
			) : (
				<>
					<Head>
						<title>
							Smart Home Starter - {category.edges[0].node.name} Articles
						</title>
						<meta
							name='description'
							content={`${category.edges[0].node.description ? category.edges[0].node.description : 'Check out all of our ' + category.edges[0].node.name + '-related articles, beginning with our featured articles.'}`}
							key='desc'
						/>
						<meta property="og:title" content={`Smart Home Starter - ${category.edges[0].node.name} Articles`} />
						<meta
							property="og:description"
							content={`${category.edges[0].node.description ? category.edges[0].node.description : 'Check out all of our ' + category.edges[0].node.name + '-related articles, beginning with our featured articles.'}`}
						/>
						<script
							id='load-ads'
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
					</Head>
					<Header menu={nav}/>
					<main className='adthrive-body'>
						<div className='container px-6  2xl:px-0 grid grid-cols-4 gap-5 my-12'>
							<div className='flex col-span-4 lg:col-span-2 items-center flex-wrap'>
								<div className={`font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green text-6xl md:text-7xl ${category.edges[0].node.description && 'lg:border-r-2 border-r-black py-3 pr-3 tracking-wide max-w-md'}`}>
									{category.edges[0].node.name}
								</div>
								<div className={category.edges[0].node.description ? 'text-lg lg:flex-1 md:text-base font-semibold lg:pl-5' : 'hidden'}>
									{category.edges[0].node.description || ''}
								</div>
							</div>
						</div>
						{!featuredArticle ?
							<div className='container text-center my-40'>
								<div className='text-xl'>
									It looks like we haven&apos;t written any articles for this category yet, but we are definitely probably working on it. Please check again later.
								</div>
							</div>
						:
							<>
								<FeaturedCategory 
									myArticles={featured} 
									myCategory={category.edges[0].node.name}
								/>
								<ArticleFilterBar myMenu={filterMenu !== null ? filterMenu : filterTabs} myCategory={category.edges[0].node.name} onFilter={filter} />
								<div ref={observe}>
									{inView ?
										<ArticleGrid
											myArticles={filteredPosts || posts.nodes.slice(0,36)}
											myCategory={category.edges[0].node.name}
										/>
									:
										<div className='h-[2020px] bg-slate-100 w-full'>
										</div>
									}
								</div>

								{!allLoaded & posts.nodes.length > 36 ?
									<div className='flex flex-wrap justify-center mb-12'>
										<div className='text-sm w-full text-center text-gray-500 mb-6'>
											There are {posts.nodes.length - 36} more articles in this category
										</div>
										<div className='text-xl cursor-pointer underline underline-offset-4' as='div' onClick={() => loadAllPosts()}>
											Load All
										</div>
									</div>
									:
									null
								}
							</>
						}
					</main>
					<Footer myMenu={nav}/>
				</>
			)}
		</>
	)
}

async function getAllPosts(slug) {
	let data = {
			posts: {
				nodes: []
		}
	}
    let endCursor = null
    let hasNextPage = true
    do {
        let res = await getPostsByCategory(slug, 100, endCursor || null)
        endCursor = await res?.posts?.pageInfo.endCursor
        hasNextPage = await res?.posts?.pageInfo.hasNextPage
        data.posts.nodes.push(...res.posts.nodes)
    } while (hasNextPage)
    return data.posts
}

export async function getStaticProps({ params, preview = false}) {
	const data = await getPropsForCategory(params.slug, 24)
	const posts = await getAllPosts(params.slug)
	const myFeaturedArticles = posts.nodes.filter((post) => post.categories.edges.some((cat) => cat.node.slug === 'featured'))
	const nav = await getNavigation()

    let navigationObject = []
    navigationObject.push(...nav.menus.nodes[0].menuItems.nodes.filter((el) => el.parentId === null))
    navigationObject.map((el) => {
        el.menuItems = [...nav.menus.nodes[0].menuItems.nodes.filter((node) => node.parentId === el.id)]
    })

	// Let's make sure this category exists. If not, 404
	if (!data.categoryName.edges[0]) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			preview,
			posts: posts,
			featured: myFeaturedArticles,
			category: data?.categoryName,
			// A little data massaging to match shape of filterTabs and catch categories without specified menus
			filterMenu: data?.filterMenu?.nodes[0]?.menuItems.nodes || null,
			nav: navigationObject
		},
        revalidate: 3600
	}
}

async function getAllCategories() {
	let data = []
    let endCursor = null
    let hasNextPage = true
    do {
        let res = await getCategories(100, endCursor || null)
        endCursor = await res?.pageInfo.endCursor
        hasNextPage = await res?.pageInfo.hasNextPage
        data.push(...res.edges)
    } while (hasNextPage)

	return data
}

// Generate all paths?
// This has to be false to catch errors related to fallback
const allPaths = true

export async function getStaticPaths() {
    let data = []
    if (allPaths) {
        data = await getAllCategories() // Generates all articles statically
	} else {
        data = await getCategories() // Generates only a few articles, rest loaded on demand, either on client or server depending on fallback property below
		data = data?.edges
	}
	
	return {
		paths: data?.map(({ node }) => `/category/${node.slug}`) || [],
		fallback: true,
	}
}