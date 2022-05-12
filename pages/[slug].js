import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Newsletter from '../components/newsletter'
import { getPostsWithSlug, getPostAndMorePosts, getRelatedPostByCategory, getNavigation } from '../lib/api'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { kebabCase } from '../lib/utils'
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare'
import { FaTwitterSquare } from '@react-icons/all-files/fa/FaTwitterSquare'
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus'
import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus'


import Header from '../components/header'
import Footer from '../components/footer'
import Schema from '../components/schema'

// Let's dynamically load product review components
const PriceRating = dynamic(() => import('../components/price-rating'))
const OverallRating = dynamic(() => import('../components/overall-rating'))
const AmazonProduct = dynamic(() => import('../components/amazon-product'))
const BestBuyProduct = dynamic(() => import('../components/bestbuy-product'))
const ProductReviewCarousel = dynamic(() => import('../components/product-review-carousel'))

export default function Post({ post, related, nav }) {

    const router = useRouter()

    const [ expandSpecs, setExpandSpecs ] = useState(false)

    const specsToggle = () => {
        setExpandSpecs(!expandSpecs)
    }

    const formatDate = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
    }

    return (
        <div>
            {router.isFallback ? (
                <div className='container flex justify-center items-center h-screen mx-6'>
                    <div className='text-lg'>
                    You&apos;ve found new content for this page! Just a moment while we update it for everyone.
                    </div>
                </div>
            ) : (
                <>
                    <Schema post={post}/>
                    <Header menu={nav}/>
                    <div className='container grid grid-cols-3 px-6 lg:px-22 xl:px-40 gap-5 my-12'>
                        <div className='col-span-3 lg:col-span-2'>
                            <div className='text-base text-gray-500 font-extralight'>
                                The Smart Home Starter team picks the products and services we write about. When you buy through our links, we may get a commission.
                            </div>
                            <div className='text-4xl md:text-5xl font-bold tracking-wider mt-12 mb-8'>
                                <h1>
                                    {post.title}
                                </h1>
                            </div>
                            <div className='flex justify-between items-baseline mb-2'>
                                {!post.productReviewFields.productReview &&
                                    <div className='text-lg'>
                                        Last Updated {formatDate(post.modified)}
                                    </div>
                                }
                                <div className='flex mb-3 text-3xl'>
                                    <div className='mr-3'>
                                        <FacebookShareButton
                                            url={`https://smarthomestarter.com/${post.slug}`}
                                            hashtag={`#smart home`}
                                        >
                                            <FaFacebookSquare className='text-smart-blue hover:text-smart-teal' />
                                        </FacebookShareButton>
                                    </div>
                                    <div>
                                        <TwitterShareButton
                                            url={`https://smarthomestarter.com/${post.slug}`}
                                            hashtag={`#smart home`}
                                        >
                                            <FaTwitterSquare className='text-smart-blue hover:text-smart-teal' />
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>
                            {post.productReviewFields.productReview &&
                                <div className='flex justify-between lg:justify-start'>
                                    <div className='flex items-center lg:text-xl mb-3 mr-5'>
                                        <div className='font-semibold mr-3'>
                                            Overall
                                        </div>
                                        <OverallRating starCount={post.productReviewFields.overallRating}/>
                                    </div>
                                    <div className='flex items-center lg:text-xl mb-3 mr-5'>
                                        <div className='font-semibold mr-3'>
                                            Price
                                        </div>
                                        <PriceRating priceCount={2}/>
                                    </div>
                                </div>
                            }
                            {post.featuredImage &&
                                <div className='relative h-96 mb-5'>
                                    <Image 
                                        className='transition-all ease-in duration-500'
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.featuredImage.node.altText}
                                        objectFit='cover'
                                        layout='fill'
                                        sizes='50vw'
                                        priority
                                    />
                                </div>
                            }
                            {post.productReviewFields.productReview &&
                                <div className='grid lg:grid-cols-2 my-8'>
                                    <div className='mb-3 lg:mb-0'>
                                        <div className='text-3xl font-semibold mb-3'>
                                            Pros
                                        </div>
                                        {post.productReviewFields.pros.map((el) => (
                                            <div className='flex' key={el.pro}>
                                                <div className='pt-1 mr-1 text-lg text-blue-400'>
                                                    <AiOutlinePlus/>
                                                </div>
                                                <div className='text-lg'>
                                                    {el.pro}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className='text-3xl font-semibold mb-3'>
                                            Cons
                                        </div>
                                        {post.productReviewFields.cons.map((el) => (
                                            <div className='flex' key={el.con}>
                                                <div className='pt-1 mr-1 text-lg text-red-500'>
                                                    <AiOutlineMinus/>
                                                </div>
                                                <div className='text-lg'>
                                                    {el.con}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {post.productReviewFields.productReview &&
                                <>
                                    <AmazonProduct productId={post.productReviewFields.productPriceLinks[0].amazonProductId}/>
                                    <BestBuyProduct sku={post.productReviewFields.productPriceLinks[0].bestBuyProductId}/>
                                </>
                            }
                            {post.productReviewFields.productReview &&
                                <>
                                    <div className='my-12'>
                                        <ProductReviewCarousel images={post.productReviewFields.productGallery} />
                                    </div>
                                    <div className='mb-8'>
                                        <h1 className='text-3xl font-semibold mb-5'>
                                            Specs and Features
                                        </h1>
                                        {post.productReviewFields.specifications[0].specification.map((el, index) => (
                                            !expandSpecs ?
                                                index < 3 && 
                                                    <div className={`grid grid-cols-2 text-left- p-3 border-b text-lg ${index % 2 === 0 ? 'bg-stone-100' : 'bg-white'}`} key={el.name}>
                                                        <div className='col-span-1 font-bold'>
                                                            {el.name}
                                                        </div>
                                                        <div className='col-span-1'>
                                                            {el.value}
                                                        </div>
                                                    </div>
                                            :
                                                <div className={`grid grid-cols-2 text-left- p-3 border-b text-lg ${index % 2 === 0 ? 'bg-stone-100' : 'bg-white'}`} key={el.name}>
                                                    <div className='col-span-1 font-bold'>
                                                        {el.name}
                                                    </div>
                                                    <div className='col-span-1'>
                                                        {el.value}
                                                    </div>
                                                </div>
                                        ))}
                                        {!expandSpecs ?
                                            <div onClick={() => specsToggle()} className='border-t-[1px] border-t-smart-blue text-smart-blue font-semibold cursor-pointer text-center text-lg'>
                                                Show more
                                            </div>
                                        :
                                            <div onClick={() => specsToggle()} className='border-t-[1px] border-t-smart-blue text-smart-blue font-semibold cursor-pointer text-center text-lg'>
                                                Show less
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        
                                    </div>

                                </>
                            }
                            <div className='unreset' dangerouslySetInnerHTML={{__html: post.content}}></div>
                            {post.productReviewFields.productReview &&
                                <>
                                    <AmazonProduct productId={post.productReviewFields.productPriceLinks[0].amazonProductId}/>
                                    <BestBuyProduct sku={post.productReviewFields.productPriceLinks[0].bestBuyProductId}/>
                                </>
                            }
                            {!post.productReviewFields.productReview && 
                                <div className='sm:flex w-full gap-3'>
                                    {post.categories.edges.map((el) => (
                                        <div
                                            key={el.node.name}
                                            className='flex items-center p-3 my-3 flex-1 justify-center text-center cursor-pointer text-white font-bold bg-smart-blue text-base border-0 focus:outline-none appearance-none'
                                        >
                                            <a href={`/category/${kebabCase(el.node.name)}`}>
                                                More {el.node.name} articles
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='hidden lg:inline col-span-1'>
                            <div className='sidebar-ad w-full mb-14'>
                            </div>
                            {!post.productReviewFields.productReview ?
                                <>
                                    <div className='text-3xl font-semibold mb-5'>
                                        Related Articles
                                    </div>
                                    {related.filter((el) => el.title !== post.title).length > 0 ?
                                        related.filter((el) => el.title !== post.title).slice(0,2).map((el) => (
                                            <div className='mb-8' key={el.id}>
                                                <div className='text-xl mb-1'>
                                                    <a href={`/${el.slug}`}>
                                                        {el.title}
                                                    </a>
                                                </div>
                                                <div className='text-smart-blue text-base font-semibold uppercase tracking-wider'>
                                                    {el.categories.edges.filter((el) => el.node.name !== 'Featured').map((cat, index) => (
                                                        <span key={cat.node.id}>
                                                            <a className='text-smart-blue hover:text-smart-teal' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((el) => el.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    :
                                        <div className='text-base text-gray-500'>
                                            No related articles yet
                                        </div>
                                    }
                                </>
                                :
                                    <>
                                        <div className='text-2xl font-semibold mb-5'>
                                            TL/DR
                                        </div>
                                        <div>
                                            {post.productReviewFields.tldr}
                                        </div>
                                    </>
                            }
                            <div className='border-y-2 border-y-gray-500 py-12 my-14'>
                                {post.productReviewFields.productReview &&
                                    <div className='text-4xl text-smart-blue font-semibold mb-5 tracking-wider'>
                                            Get product reviews straight to your inbox
                                    </div>
                                }
                                {!post.productReviewFields.productReview &&
                                    <div className='text-4xl text-smart-blue font-semibold mb-5 tracking-wider'>
                                        Sign up for our newsletter
                                    </div>
                                } 
                                <Newsletter mode={'light'}/>
                            </div>
                            <div className='sidebar-ad-sticky w-full top-10 sticky'>
                            </div>
                        </div>
                    </div>
                    <Footer myMenu={nav}/>
                </>
            )}
        </div>
    )
}

async function getRelatedPosts(categories) {
    let arr = []
    categories.forEach((el) => {
        arr.push(el.node.name)
    })


    let data = []
    let i = 0
    do {
        let res = await getRelatedPostByCategory(arr[i])
        !data.some((el) => res.posts.nodes.some((node) => node.slug === el.slug)) && data.push(...res.posts.nodes)
        i++
    } while (i < arr.length)
    return data
}
            
export async function getStaticProps({ params, preview = false, previewData }) {
    const data = await getPostAndMorePosts(params.slug, preview, previewData)
    const nav = await getNavigation()

    let navigationObject = []
    navigationObject.push(...nav.menus.nodes[0].menuItems.nodes.filter((el) => el.parentId === null))
    navigationObject.map((el) => {
        el.menuItems = [...nav.menus.nodes[0].menuItems.nodes.filter((node) => node.parentId === el.id)]
    })

    if (!data.post) {
        return {
            notFound: true,
        }
    }
    
    const related = await getRelatedPosts(data?.post?.categories?.edges)
    
    return {
        props: {
            preview,
            post: data.post,
            related: related,
            posts: data.posts,
            nav: navigationObject
        },
        // If it's a product review revalidate set to 90 seconds
        revalidate: !data.post.productReviewFields.productReview ? 86400 : 90
    }
    
}

async function getAllPostsWithSlug() {
    let data = []
    let endCursor = null
    let hasNextPage = true
    do {
        let res = await getPostsWithSlug(100, endCursor || null)
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
        data = await getAllPostsWithSlug() // Generates all articles statically
    } else {
        data = await getPostsWithSlug() // Generates only a few articles, rest loaded on demand, either on client or server depending on fallback property below
        data = data?.edges
    }

    return {
        paths: data?.map(({ node }) => `/${node.slug}`) || [],
        fallback: true
    }
}