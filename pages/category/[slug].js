import { getPropsForCategory, getCategories, getPostsByCategory, getMenuBySlug, getFeaturedIdsWithSlug, getPostById } from '../../lib/api'
import Header from '../../components/header'
import Head from 'next/head'
import Footer from '../../components/footer'
import FeaturedCategory from '../../components/featured-category'
import ArticleGrid from '../../components/article-grid'
import ArticleFilterBar from '../../components/article-filter-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrimace } from '@fortawesome/pro-regular-svg-icons'
import { useState } from 'react'

export default function Categories({ posts, featured, category, categorySlug, filterMenu, navigationMenus }) {
	console.log(category)

	// If we don't have enough featured posts to fill the featured module, fill the rest of the module with regular posts
	featured.length < 20 ?
	featured = featured.concat(posts.nodes.filter((node) => node.categories.edges.every((el) => el.node.name !== 'Featured')).slice(0, (20 - featured.length)))
	: featured

	let featuredArticle
    featured.length > 0 ? featuredArticle = featured[0] : posts[0]
    const categories = []

	const [articles, setArticles] = useState(false)
	const [filteredArticles, setFilteredArticles] = useState(false)
	const [endCursor, setEndCursor] = useState(null)
	const [hasNextPage, setHasNextPage] = useState(true)
	const [loadingMoreArticles, setLoadingMoreArticles] = useState(false)

	posts?.nodes.forEach(el => {
		el.categories.edges.forEach(e => {
			!categories.includes(e.node.name) && categories.push(e.node.name)
		})
	})

	const filterTabs = []
	categories.forEach(el => filterTabs.push({label: el}))

	const filter = (cat) => {
		let arr = []
		if (cat === 'All') {
			!articles ?
				setFilteredArticles(posts?.nodes)
			:
				setFilteredArticles(null)
		} else {
			!articles ?
				posts?.nodes.forEach(el => {
					el.node.categories.edges.forEach(e => {
						e.node.name === cat && arr.push(el)
					})
				})
			:
				articles?.forEach(el => {
					el.node.categories.edges.forEach(e => {
						e.node.name === cat && arr.push(el)
					})
				})
			setFilteredArticles(arr)
		}
	}

	async function loadMoreArticles() {
		setLoadingMoreArticles(true)
		let data = null
		try {
			data = await getPostsByCategory(categorySlug, 40, endCursor || posts?.pageInfo.endCursor)
			setEndCursor(data?.posts.pageInfo.endCursor)
			setHasNextPage(data?.posts.pageInfo.hasNextPage)
			setArticles(articles ? articles.concat(data?.posts.nodes) : posts?.nodes.concat(data?.posts.nodes))
		} catch (e) {
			console.error(e)
		} finally {
			setLoadingMoreArticles(false)
		}
	}

	return (
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
			<Header menu={navigationMenus}/>
			<div className='container px-5 xl:px-0 grid grid-cols-4 gap-5 my-12'>
				<div className='flex col-span-4 lg:col-span-2 items-center flex-wrap lg:flex-nowrap'>
					<div className='font-display text-sky-600 text-7xl lg:border-r-2 border-r-black py-3 pr-3 tracking-wide'>
						{category.edges[0].node.name}
					</div>
					<div className='text-lg md:text-base font-medium tracking-wider lg:pl-5'>
						{category.edges[0].node.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor'}
					</div>
				</div>
			</div>
			{!featuredArticle ?
				<div className='container text-center my-40'>
					<div className='text-6xl mb-6'>
						<FontAwesomeIcon icon={faGrimace}/>
					</div>
					<div className='text-xl'>
						It looks like we haven&apos;t written any articles for this category yet, but we are definitely probably working on it. Please check again later.
					</div>
				</div>
			:
			<>
				<FeaturedCategory myArticles={featured} myCategory={category.edges[0].node.name} />
				<ArticleFilterBar myMenu={filterMenu !== null ? filterMenu : filterTabs} myCategory={category.edges[0].node.name} onFilter={filter} />
				<ArticleGrid myArticles={filteredArticles || articles || posts.nodes} myCategory={category.edges[0].node.name} pageInfo={posts.pageInfo}/>
				<div className='flex justify-center mb-12'>
					{hasNextPage ?
						<div className='text-xl cursor-pointer' as='div' onClick={() => loadMoreArticles()}>
							{loadingMoreArticles ? 
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
						<div className='text-xl cursor-pointer'>
							No more articles in this category.
						</div>
					}
				</div>
			</>
			}
			<Footer myMenu={navigationMenus} />
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