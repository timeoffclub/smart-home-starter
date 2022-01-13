import Script from 'next/script'
import { getPostsWithSlug, getPostAndMorePosts, getMenuBySlug, getPostsByCategory } from '../lib/api'

export default function Post() {
    return (
        <>
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
            <div className='container grid grid-cols-3 px-5 lg:px-22 xl:px-40 gap-5 my-12'>
                <div className='hidden lg:inline col-span-1'>
                    <div className='sidebar-ad-sticky w-full top-10 sticky'>
                    </div>
                </div>
            </div>
        </>
    )
}

// In case we ever start tagging articles again.
// async function getRelatedPosts(tags) {
//     let arr = []

//     tags.forEach((tag) => {
//         arr.push(tag.node.slug)
//     })


//     let data = []
//     let i = 0
//     do {
//         let res = await getPostsWithTag(arr[i])
//         !data.some((el) => res.posts.nodes.some((node) => node.slug === el.slug)) && data.push(...res.posts.nodes)
//         i++
//     } while (i < arr.length)

//     return data
// }

async function getRelatedPosts(categories) {
    let arr = []
    categories.forEach((el) => {
        arr.push(el.node.name)
    })


    let data = []
    let i = 0
    do {
        let res = await getPostsByCategory(arr[i])
        !data.some((el) => res.posts.nodes.some((node) => node.slug === el.slug)) && data.push(...res.posts.nodes)
        i++
    } while (i < arr.length)
    return data
}
            
export async function getStaticProps({ params, preview = false, previewData }) {
    
    
    return {
        props: {
            preview
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
const allPaths = true

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