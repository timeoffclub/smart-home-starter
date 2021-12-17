import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllCategories, getPostsByCategory, getCategoryNameFromSlug } from '../../lib/api'
import FeaturedCategory from '../../components/featured-category'
import ArticleGrid from '../../components/article-grid'
import styles from './category.module.css'

export default function Categories({ posts, category }) {
	const router = useRouter()

	if (!router.isFallback && !posts?.edges) {
	  return <ErrorPage statusCode={404} />
	}
	return (
		router.isFallback ? (
			<div>Loading…</div>
		) : (
			<>
				<div className="container">
					<div className="row">
						<div className="col-2">
							<div className={styles.mainCategoryWrapper}>
								<div className={styles.mainCategory}>
									{category}
								</div>
								<div className={styles.mainCategoryDescription}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor
								</div>
							</div>
						</div>
					</div>
				</div>
				<FeaturedCategory myArticles={posts.edges} myCategory={category} />
				<ArticleGrid myArticles={posts.edges} myCategory={category} />
			</>
		  )
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
		paths: allCategories.edges.filter((node) => node.count > 0).map(({ node }) => `/categories/${node.slug}`) || [],
		fallback: true,
	}
}