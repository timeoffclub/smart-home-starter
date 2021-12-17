import Image from 'next/image'
import styles from './featured-category.module.css'

export default function FeaturedCategory ({ myArticles, myCategory }) {
    let featuredArticle
    myArticles.length > 0 ? featuredArticle = myArticles[0].node : null

    return (
        <>  
            {!featuredArticle ?
                <div>
                    There appears to be nothing here...
                </div>
                :
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <div className={styles.featuredArticleWrapper}>
                                {featuredArticle.featuredImage &&
                                    <div className={styles.featuredArticleImageWrapper}>
                                        <Image 
                                            className={styles.featuredArticleImage}
                                            src={featuredArticle.featuredImage.node.sourceUrl}
                                            alt={featuredArticle.featuredImage.node.altText}
                                            objectFit='cover'
                                            width={620}
                                            height={400}
                                        />
                                    </div>
                                }
                                <div className={styles.overlay}>
                                </div>
                                <div className={styles.featuredArticleCopy}>
                                    <a href={`../${featuredArticle.slug}`}>
                                        <div className={styles.featuredArticleTitle}>
                                            {featuredArticle.title}
                                        </div>
                                    </a>
                                    {featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                        <span key={cat.node.id} className={styles.featuredArticleCoCategories}>
                                            <a href={`../categories/${cat.node.slug}`}>{cat.node.name}</a> {index < (featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className={styles.subfeaturedArticleWrapper}>
                                {myArticles.slice(1,4).map((el, index) => (
                                    <div key={el.node.id} className={styles.subfeaturedArticle}>
                                        {el.node.featuredImage &&
                                            <div className={styles.subfeaturedArticleImageWrapper}>
                                                <Image 
                                                    src={el.node.featuredImage.node.sourceUrl}
                                                    alt={el.node.featuredImage.node.altText}
                                                    objectFit='cover'
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                        }
                                        <div className={styles.subfeaturedArticleCopy}>
                                            <div className={styles.subfeaturedArticleTitle}>
                                                <a href={`../${el.node.slug}`}>
                                                    {el.node.title}
                                                </a>
                                            </div>
                                            <div className={styles.subfeaturedArticleCoCategories}>
                                                {el.node.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                    <span key={cat.node.id}>
                                                        <a href={`../categories/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.node.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className={`row ${styles.topArticleWrapper}`}>
                                {myArticles.slice(5,14).map((el) => (
                                    <div key={el.node.id} className="col-1">
                                        <div className={styles.topArticleCopy}>
                                            <div className={styles.topArticleTitle}>
                                                <a href={`../${el.node.slug}`}>
                                                    {el.node.title}
                                                </a>
                                            </div>
                                            <div className={styles.topArticleCoCategories}>
                                                {el.node.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                    <span key={cat.node.id}>
                                                        <a href={`../categories/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.node.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
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
                                <div key={el.node.id} className={styles.subfeaturedArticle}>
                                    {el.node.featuredImage &&
                                        <div className={styles.subfeaturedArticleImageWrapper}>
                                            <Image 
                                                src={el.node.featuredImage.node.sourceUrl}
                                                alt={el.node.featuredImage.node.altText}
                                                objectFit='cover'
                                                width={300}
                                                height={250}
                                            />
                                        </div>                                    }
                                    <div className={styles.subfeaturedArticleCopy}>
                                        <div className={styles.subfeaturedArticleTitle}>
                                            <a href={`../${el.node.slug}`}>
                                                {el.node.title}
                                            </a>
                                        </div>
                                        <div className={styles.subfeaturedArticleCoCategories}>
                                            {el.node.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a href={`../categories/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.node.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {myArticles.slice(17,19).map((el) => (
                            <div key={el.node.id} className="col-1">
                                <div className={styles.article}>
                                    {el.node.featuredImage &&
                                        <div className={styles.articleImageWrapper}>
                                            <Image 
                                                src={el.node.featuredImage.node.sourceUrl}
                                                alt={el.node.featuredImage.node.altText}
                                                objectFit='cover'
                                                width={300}
                                                height={160}
                                            />
                                        </div>                                      }
                                    <div className={styles.articleCopy}>
                                        <div className={styles.articleTitle}>
                                            <a href={`../${el.node.slug}`}>
                                                {el.node.title}
                                            </a>
                                        </div>
                                        <div className={styles.articleCoCategories}>
                                            {el.node.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a href={`../categories/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.node.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
