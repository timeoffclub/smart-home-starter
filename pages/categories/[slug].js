
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllCategories, getPostsByCategory } from '../../lib/api'

export default function Categories({ posts }) {
	const router = useRouter()

	if (!router.isFallback && !posts?.edges) {
	  return <ErrorPage statusCode={404} />
	}
	return (
		<>
		{router.isFallback ? (
			<div>Loading…</div>
		  ) : (
			posts.edges.map((post) => (
				<div key={post.node.id}>
					<a href={`../${post.node.slug}`}>
						{post.node.title}
					</a>
				</div>
			))
		  )}
		</>
	)
}

export async function getStaticProps({ params, preview = false, previewData }) {
	const data = await getPostsByCategory(params.slug, preview, previewData)
	return {
		props: {
			preview,
			posts: data?.posts
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