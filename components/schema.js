import Head from "next/head"
export default function Schema({ post }) {

    console.log(post.productReviewFields.productName)

    const formatExcerpt = (str) => {
        return str.replace(/(<([^>]+)>)/gi, "")
    }
    
    let sourceUrl
    
    if (post.featuredImage) {
        sourceUrl = post.featuredImage.node.sourceUrl
    }
    
    return (
        <Head>
            <title>
                {post.title}
            </title>
            <meta
                name="description"
                content={formatExcerpt(post.excerpt)}
                key="desc"
            />
            <meta property="og:title" content={post.title} />
            <meta
                property="og:description"
                content={formatExcerpt(post.excerpt)}
            />
            {post.featuredImage &&
                <meta
                    property="og:image"
                    content={sourceUrl}
                />
            }
            {post.productReviewFields.productReview &&
                <script 
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{__html: 
                        `{
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": "${post.productReviewFields.productName}",
                            "image": ["${sourceUrl}"],
                            "description": "${post.productReviewFields.tldr}",
                            "review": {
                                "@type": "Review",
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": "${post.productReviewFields.overallRating}",
                                    "bestRating": "5"
                                },
                                    "author": {
                                    "@type": "Person",
                                    "name": "Trae Jacobs"
                                }
                            }
                        }`
                    }}
                >
                </script>
            }
        </Head>
    )
}