import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllCategories, getPostsByCategory, getCategoryNameFromSlug } from '../../lib/api'
import FeaturedArticles from '../../components/featured-articles'

export default function Categories({ posts, category }) {
	console.log(category)
	const router = useRouter()

	if (!router.isFallback && !posts?.edges) {
	  return <ErrorPage statusCode={404} />
	}
	return (
		<>
		{router.isFallback ? (
			<div>Loading…</div>
		  ) : (
			<FeaturedArticles myArticles={posts.edges} myCategory={category} />
		  )}
		</>
	)
}

export async function getStaticProps({ params, preview = false, previewData }) {
	const data = await getPostsByCategory(params.slug, preview, previewData)
	const category = await getCategoryNameFromSlug(params.slug)
	return {
		props: {
			preview,
			posts: data?.posts,
			category: category
		},
	}
  }

export async function getStaticPaths() {
	const allCategories = await getAllCategories()
	
	return {
		paths: allCategories.edges.map(({ node }) => `/categories/${node.slug}`) || [],
		fallback: true,
	}
}