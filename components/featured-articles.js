import Image from 'next/image'
import styles from './featured-articles.module.css'

export default function FeaturedArticles({ myArticles, myCategory }) {
	const featuredArticle = myArticles[0].node

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className={styles.featuredArticleWrapper}>
                            {featuredArticle.featuredImage &&
                                    <Image 
                                        className={styles.featuredArticleImage}
                                        src={featuredArticle.featuredImage.node.sourceUrl}
                                        alt={featuredArticle.featuredImage.node.altText} 
                                        width={620}
                                        height={400}
                                    />
                            }
                            <div className={styles.overlay}>
                            </div>
                            <div className={styles.featuredArticleCopy}>
                                <a href={`../${featuredArticle.slug}`}>
                                    <div className={styles.featuredArticleTitle}>
                                        {featuredArticle.title}
                                    </div>
                                </a>
                                {featuredArticle.categories.edges.filter((e) => e.node.slug !== myCategory).map((cat, index) => (
                                    <span key={cat.node.id} className={styles.featuredArticleCategories}>
                                        <a href={`../categories/${cat.node.slug}`}>{cat.node.name}</a> {index < (featuredArticle.categories.edges.filter((e) => e.node.slug !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className="col-2">
                        <div className={subfeaturedArticleWrapper}>
                            {myArticles.slice(1,4).map((el, index) => (
                                    <div key={el.id} className={subfeaturedArticle}>
                                    {el.featuredImage &&
                                        <GatsbyImage className={subfeaturedArticleImage} image={getImage(el.featuredImage.node.localFile.childImageSharp.gatsbyImageData)} alt={el.featuredImage.node.altText} />
                                    }
                                    <div className={subfeaturedArticleCopy}>
                                        <div className={subfeaturedArticleTitle}>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className={subfeaturedArticleCategories}>
                                            {el.categories.nodes.filter((e) => e.name !== myCategory).map((cat, index) => (
                                                <span key={cat.id}>
                                                    <a href={`../${cat.slug}`}>{cat.name}</a> {index < (el.categories.nodes.filter((e) => e.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    */}
                </div>
                {/*
                <div className="row">
                    <div className="col-3">
                        <div className={`row ${topArticleWrapper}`}>
                            {myArticles.slice(5,14).map((el) => (
                                <div key={el.id} className="col-1">
                                    <div className={topArticleCopy}>
                                        <div className={topArticleTitle}>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className={topArticleCategories}>
                                            {el.categories.nodes.filter((e) => e.name !== myCategory).map((cat, index) => (
                                                <span key={cat.id}>
                                                    <a href={`../${cat.slug}`}>{cat.name}</a> {index < (el.categories.nodes.filter((e) => e.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="article-ad">
                            Ad
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        {myArticles.slice(15,17).map((el) => (
                            <div key={el.id} className={subfeaturedArticle}>
                                {el.featuredImage &&
                                        <Image className={subfeaturedArticleImage} image={getImage(el.featuredImage.node.localFile.childImageSharp.ImageData)} alt={el.featuredImage.node.altText} />
                                }
                                <div className={subfeaturedArticleCopy}>
                                    <div className={subfeaturedArticleTitle}>
                                        <a href={`../${el.slug}`}>
                                            {el.title}
                                        </a>
                                    </div>
                                    <div className={subfeaturedArticleCategories}>
                                        {el.categories.nodes.filter((e) => e.name !== myCategory).map((cat, index) => (
                                            <span key={cat.id}>
                                                <a href={`../${cat.slug}`}>{cat.name}</a> {index < (el.categories.nodes.filter((e) => e.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {myArticles.slice(17,19).map((el) => (
                        <div key={el.id} className="col-1">
                            <div className={article}>
                                {el.featuredImage &&
                                    <Image className={articleImage} image={getImage(el.featuredImage.node.localFile.childImageSharp.ImageData)} alt={el.featuredImage.node.altText} />
                                }
                                <div className={articleCopy}>
                                    <div className={articleTitle}>
                                        <a href={`../${el.slug}`}>
                                            {el.title}
                                        </a>
                                    </div>
                                    <div className={articleCategories}>
                                        {el.categories.nodes.filter((e) => e.name !== myCategory).map((cat, index) => (
                                            <span key={cat.id}>
                                                <a href={`../${cat.slug}`}>{cat.name}</a> {index < (el.categories.nodes.filter((e) => e.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 */}
            </div>
        </>
    )
}
