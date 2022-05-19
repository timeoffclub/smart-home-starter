import Head from "next/head"
export default function Schema({ post }) {

    const formatExcerpt = (str) => {
        return str.replace(/(<([^>]+)>)/gi, "")
    }
    
    let sourceUrl
    
    if (post.featuredImage) {
        sourceUrl = post.featuredImage.node.sourceUrl
    }
    
    return (
        <Head>
            {post.postFields.seoTitle ?
                <title>
                    {post.postFields.seoTitle}
                </title>
            :
                <title>
                    {post.title}
                </title>
            }
            {post.postFields.seoDescription ?
                <meta
                    name="description"
                    content={formatExcerpt(post.postFields.seoDescription)}
                    key="desc"
                />
            :
                <meta
                    name="description"
                    content={formatExcerpt(post.excerpt)}
                    key="desc"
                />
            }
            {post.postFields.seoTitle ?
                <meta property="og:title" content={post.postFields.seoTitle} />
            :
                <meta property="og:title" content={post.title} />
            }
            {post.postFields.seoDescription ?
                <meta
                    property="og:description"
                    content={formatExcerpt(post.postFields.seoDescription)}
                />
            :
                <meta
                    property="og:description"
                    content={formatExcerpt(post.excerpt)}
                />
            }
            {post.featuredImage &&
                <meta
                    property="og:image"
                    content={sourceUrl}
                />
            }
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