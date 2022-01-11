import Image from 'next/image'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Script from 'next/script'
import Newsletter from '../components/newsletter'
import { getPostsWithSlug, getPostAndMorePosts, getMenuBySlug, getPostsWithTag } from '../lib/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import Moment from 'react-moment'
import 'moment-timezone'
import { kebabCase } from '../lib/utils'

export default function Post({ post, related, posts, preview, navigationMenus }) {
    const formatExcerpt = (str) => {
        return str.replace(/(<([^>]+)>)/gi, '')
    }
    return (
        <>
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
                        content={post.featuredImage.node.sourceUrl}
                    />
                }
            </Head>
            <Script
                id='load-ads'
                strategy='lazyOnload'
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
            <Header menu={navigationMenus}/>
            <div className='container grid grid-cols-3 px-5 lg:px-22 xl:px-40 gap-5 my-12'>
                <div className='col-span-3 lg:col-span-2'>
                    <div className='text-base text-gray-500 font-extralight'>
                        The Smart Home Starter team picks the products and services we write about. When you buy through our links, we may get a commission.
                    </div>
                    <div className='text-5xl font-bold tracking-wider mt-12 mb-8'>
                        {post.title}
                    </div>
                    <div className='flex justify-between items-baseline mb-2'>
                        <div className='text-lg'>
                            <Moment format={'MMM D, YYYY'}>{post.date}</Moment>
                        </div>
                        <div className='flex text-smart-blue mb-3 text-3xl'>
                        <div className='mr-3'>
                            <FacebookShareButton
                                className='w-full h-full'
                                url={`https://smarthomestarter.com/${post.slug}`}
                                hashtag={`#smart home`}
                            >
                                <FontAwesomeIcon icon={faFacebookSquare} size='lg'/>
                            </FacebookShareButton>
                        </div>
                        <div>
                            <TwitterShareButton
                                url={`https://smarthomestarter.com/${post.slug}`}
                                hashtag={`#smart home`}
                            >
                                <FontAwesomeIcon icon={faTwitterSquare} size='lg' />
                            </TwitterShareButton>
                        </div>
                        </div>
                    </div>
                    {post.featuredImage &&
                        <div className='relative h-96 mb-5'>
                            <Image
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.featuredImage.node.altText}
                                objectFit='cover'
                                layout='fill'
                                // Work-around for no out-of-box dataUrl :/
                                blurDataURL={`/_next/image?url=${post.featuredImage.node.sourceUrl}&w=16&q=1`}
                                priority
                            />
                        </div>
                    }
                    <div className='unreset' dangerouslySetInnerHTML={{__html: post.content}}></div>
                    <div className='sm:flex w-full gap-3'>
                        {post.categories.edges.map((el) => (
                            <div
                                key={el.node.name}
                                className='flex items-center p-3 my-3 flex-1 justify-center text-center cursor-pointer text-white font-bold bg-smart-blue text-lg border-0 focus:outline-none appearance-none'
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
                    {related.map((el) => (
                        el.title !== post.title &&
                        <div className='mb-8' key={el.id}>
                            <div className='text-xl mb-1'>
                                <a href={el.slug}>
                                    {el.title}
                                </a>
                            </div>
                            <div className='text-smart-blue text-base font-medium uppercase tracking-wider'>
                                {el.categories.nodes.map((cat, index) => (
                                    <span key={cat.id}>
                                        <a className='text-smart-blue hover:text-smart-teal' href={`../category/${cat.slug}`}>{cat.name}</a> {index < (el.categories.nodes.length - 1) ? <span>| </span> : <span></span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
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
    )
}

async function getRelatedPosts(tags) {
    let arr = []

    tags.forEach((tag) => {
        arr.push(tag.node.slug)
    })


    let data = []
    let i = 0
    do {
        let res = await getPostsWithTag(arr[i])
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
    
    const related = await getRelatedPosts(data?.post?.tags?.edges)
    
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
        data = await getPostsWithSlug(10) // Generates only a few articles, rest loaded on demand, either on client or server depending on fallback property below
        data = data?.edges
    }

    return {
        paths: data?.map(({ node }) => `/${node.slug}`) || [],
        fallback: 'blocking'
    }
}