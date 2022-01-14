import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPropsForCategory, getCategories, getPostsByCategory, getMenuBySlug, getFeaturedIdsWithSlug, getPostById } from '../../lib/api'
import Header from '../../components/header'
import Script from 'next/script'
import Head from 'next/head'
import Footer from '../../components/footer'
import FeaturedCategory from '../../components/featured-category'
import ArticleGrid from '../../components/article-grid'
import ArticleFilterBar from '../../components/article-filter-bar'
import { useState, useEffect } from 'react'

export default function Categories({ posts, featured, category, categorySlug, filterMenu, navigationMenus }) {

	// If we don't have enough featured posts to fill the featured module, fill the rest of the module with regular posts
	featured.length < 20 ?
	featured = featured.concat(posts.nodes.filter((node) => node.categories.edges.every((el) => el.node.name !== 'Featured')).slice(0, (20 - featured.length)))
	: featured

	let featuredArticle
    featured.length > 0 ? featuredArticle = featured[0] : posts[0]
    const categories = []

	const [filteredPosts, setFilteredPosts] = useState(false)
	const [filterTab, setFilterTab] = useState('All')
	const [endCursor, setEndCursor] = useState(null)
	const [hasNextPage, setHasNextPage] = useState(null)
	const [loadingMorePosts, setLoadingMorePosts] = useState(false)

	useEffect( () => {
        setHasNextPage(posts.pageInfo.hasNextPage)
    }, [] )

	posts?.nodes.forEach(el => {
		el.categories.edges.forEach(e => {
			!categories.includes(e.node.name) && categories.push(e.node.name)
		})
	})


    const router = useRouter()

	if (!router.isFallback && !category) {
        return <ErrorPage statusCode={404} />
    }

	const filterTabs = []
	categories.forEach(el => filterTabs.push({label: el}))

	const filter = (cat) => {
		setFilterTab(cat)
		if (cat === 'All') {
			setFilteredPosts(posts.nodes)
		} else {
			setFilteredPosts(posts.nodes.filter((article) => article.categories.edges.some((el) => el.node.name === cat)))
		}
	}

	async function fetchMorePosts() {
		setLoadingMorePosts(true)
		let data = null
		try {
			data = await getPostsByCategory(categorySlug, 40, endCursor || posts.pageInfo.endCursor)
			setEndCursor(data.posts.pageInfo.endCursor)
			setHasNextPage(data.posts.pageInfo.hasNextPage)
			posts.nodes = posts.nodes.concat(data.posts.nodes)
		} catch (e) {
			console.error(e)
		} finally {
			setLoadingMorePosts(false)
		}
	}

	return (
		<>  
            {router.isFallback ? (
                <div>We&apos;ve found new content for this page, and we&apos;re updating it. Just a moment...</div>
            ) : (
				<>
					<Head>
						<title>
							{category.edges[0].node.name} Articles
						</title>
						<meta
							name='description'
							content={`Check out all of our ${category.edges[0].node.name}-related articles, beginning with our featured articles.`}
							key='desc'
						/>
						<meta property="og:title" content={`${category.edges[0].node.name} Articles`} />
						<meta
						property="og:description"
						content={`Check out all of our ${category.edges[0].node.name}-related articles, beginning with our featured articles.`}
						/>
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
						<div className='container px-5 sm:px-0 md:px-6 xl:px-0 grid grid-cols-4 gap-5 my-12'>
							<div className='flex col-span-4 lg:col-span-2 items-center flex-wrap'>
								<div className={`font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green text-6xl md:text-7xl ${category.edges[0].node.description > 0 && 'lg:border-r-2 border-r-black py-3 pr-3 tracking-wide max-w-md'}`}>
									{category.edges[0].node.name}
								</div>
								<div className={category.edges[0].node.description ? 'text-lg lg:flex-1 md:text-base font-semibold tracking-wider lg:pl-5' : 'hidden'}>
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
								<ArticleGrid
									myArticles={filteredPosts || posts.nodes}
									myCategory={category.edges[0].node.name}
								/>

								{filterTab === 'All' &&
								<div className='flex justify-center mb-12'>
									{hasNextPage ?
										<div className='text-xl cursor-pointer' as='div' onClick={() => fetchMorePosts()}>
											{loadingMorePosts ? 
												<div>
													Loading more articles...
												</div>
											:
												<div>
													Load More
												</div>
											}
										</div>
									:
										<div className='text-xl'>
											No more articles in this category.
										</div>
									}
								</div>
							}
							</>
						}
					</main>
					<Footer myMenu={navigationMenus} />
				</>
			)}
		</>
	)
}

async function getAllFeaturedIdsWithSlug(slug) {
	let data = []
    let endCursor = null
    let hasNextPage = true
    do {
        let res = await getFeaturedIdsWithSlug(100, endCursor || null, slug)
        endCursor = await res?.posts?.pageInfo.endCursor
        hasNextPage = await res?.posts?.pageInfo.hasNextPage
        data.push(...res.posts.nodes)
    } while (hasNextPage)

	return data
}

async function getMyFeaturedArticles(featuredIds) {
	let data = []
	for (const el of featuredIds) {
		let res = await getPostById(el.id)
		data.push(res.post)
	}
	return data
}

export async function getStaticProps({ params, preview = false}) {
	const data = await getPropsForCategory(params.slug, 24)
	const featuredIds = await getAllFeaturedIdsWithSlug(params.slug)
	const myFeaturedIds = featuredIds.filter((el) => el.categories.nodes.length !== 0)
	const myFeaturedArticles = await getMyFeaturedArticles(myFeaturedIds)

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

	// Let's make sure this category exists. If not, 404
	if (!data.categoryName.edges[0]) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			preview,
			posts: data?.posts,
			featured: myFeaturedArticles,
			category: data?.categoryName,
			categorySlug: params.slug,
			// A little data massaging to match shape of filterTabs and catch categories without specified menus
			filterMenu: data?.filterMenu?.nodes[0]?.menuItems.nodes || null,
			navigationMenus: navigationMenus
		},
        revalidate: 1
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
const allPaths = false

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
		fallback: 'blocking',
	}
}