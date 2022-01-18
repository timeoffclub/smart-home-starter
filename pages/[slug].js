import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../components/header'
import Footer from '../components/footer'
import Newsletter from '../components/newsletter'
import { getPostsWithSlug, getPostAndMorePosts, getMenuBySlug, getRelatedPostByCategory } from '../lib/api'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { kebabCase } from '../lib/utils'
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare'
import { FaTwitterSquare } from '@react-icons/all-files/fa/FaTwitterSquare'

export default function Post({ post, related, navigationMenus }) {
    const router = useRouter()

    const formatExcerpt = (str) => {
        return str.replace(/(<([^>]+)>)/gi, '')
    }

    const formatDate = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
    }

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
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
                    <Head>
                        <title>
                            {post.title}
                        </title>
                        <meta
                            name='description'
                            content={formatExcerpt(post.excerpt)}
                            key='desc'
                        />
                        <meta property='og:title' content={post.title} />
                        <meta
                            property='og:description'
                            content={formatExcerpt(post.excerpt)}
                        />
                        {post.featuredImage &&
                            <meta
                                property='og:image'
                                content={post.featuredImage.node.sourceUrl}
                            />
                        }
                    </Head>
                    <Header menu={navigationMenus}/>
                        <div className='container grid grid-cols-3 px-5 lg:px-22 xl:px-40 gap-5 my-12'>
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
                                    <div className='text-lg'>
                                        {formatDate(post.date)}
                                    </div>
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
                                {post.featuredImage &&
                                    <div className='relative h-96 mb-5'>
                                        <Image 
                                            className='transition-all ease-in duration-500'
                                            src={post.featuredImage.node.sourceUrl}
                                            alt={post.featuredImage.node.altText}
                                            objectFit='cover'
                                            height={384}
                                            width={633}
                                            priority
                                        />
                                    </div>
                                }
                                <div className='unreset' dangerouslySetInnerHTML={{__html: post.content}}></div>
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
                            </div>
                            <div className='hidden lg:inline col-span-1'>
                                <div className='sidebar-ad w-full mb-14'>
                                </div>
                                <div className='text-3xl font-semibold mb-5'>
                                    Related Articles
                                </div>
                                {related.filter((el) => el.title !== post.title).length > 0 ?
                                    related.filter((el) => el.title !== post.title).slice(0,2).map((el) => (
                                        <div className='mb-8' key={el.id}>
                                            <div className='text-xl mb-1'>
                                                <a href={el.slug}>
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
                                <div className='border-y-2 border-y-gray-500 py-12 my-14'>
                                    <div className='text-4xl text-smart-blue font-semibold mb-5 tracking-wider'>
                                        Sign up for our newsletter
                                    </div>
                                    <Newsletter mode={'light'}/>
                                </div>
                                <div className='sidebar-ad-sticky w-full top-10 sticky'>
                                </div>
                            </div>
                        </div>
                    <Footer myMenu={navigationMenus} />
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

    if (!data.post) {
        return {
            notFound: true,
        }
    }
    
    const related = await getRelatedPosts(data?.post?.categories?.edges)
    
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
    
    return {
        props: {
            preview,
            post: data.post,
            related: related,
            posts: data.posts,
            navigationMenus: navigationMenus
        },
        revalidate: 1
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