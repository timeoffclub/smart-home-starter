
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllCategories, getPostsByCategory } from '../../lib/api'
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
	return {
		props: {
			preview,
			posts: data?.posts,
			category: params.slug
		},
	}
  }

export async function getStaticPaths() {
	const allCategories = await getAllCategories()
	console.log(allCategories)
	
	return {
		paths: allCategories.edges.map(({ node }) => `/categories/${node.slug}`) || [],
		fallback: true,
	}
}