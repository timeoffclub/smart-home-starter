import Router from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getSearchResults, getMenuBySlug } from '../lib/api'
import Header from '../components/header'
import Footer from '../components/footer'
import SearchForm from '../components/search-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-regular-svg-icons'
import { isEmpty } from '../lib/utils'

export default function Search({ data, navigationMenus, slug }) {
    const searchQueryString = process.browser ? ( Router?.query?.s ?? '' ) : ''
    const [ searchQuery, setSearchQuery ] = useState( searchQueryString )
    const [ searchError, setSearchError ] = useState( '' )
    const [ queryResultPosts, setQueryResultPosts  ] = useState( {} )
    const [ showResultInfo, setShowResultInfo ] = useState( false )
	const [loading, setLoading] = useState(false)

    // There's really no reason to return every match, but we will keep this here for now.
    // async function getAllSearchResults(first, after, query) {
    //     let data = {
    //         posts: {
    //             edges: []
    //         }
    //     }
    //     let res = null
    //     let hasNextPage = true
    //     do {
    //         res = await getSearchResults(first, after || null, query)
    //         after = res.posts.pageInfo.endCursor
    //         hasNextPage = res.posts.pageInfo.hasNextPage
    //         data.posts.edges.push(...res.posts.edges)
    //     } while (hasNextPage)
    //     return data
    // }

    async function fetchPosts(first, after, query) {
        setLoading(true)
        data = null
        try {
            data = await getSearchResults(first, after, query)
            setQueryResultPosts( data?.posts ?? {} )
            setShowResultInfo( true )
        } catch (e) {
            console.error(e)
            setSearchError(e)
        } finally {
            setLoading(false)
        }
    }


    const handleSearchFormSubmit = ( event ) => {
        event.preventDefault()
        setShowResultInfo( false )
        
        if ( isEmpty( searchQuery ) ) {
            setSearchError( 'Please enter text to search.' )
            setQueryResultPosts( {} )
            return null
        }
        
        setSearchError( '' )
        
        fetchPosts(100, null, searchQuery)
    }

    useEffect( () => {
        /**
        * This is technically not safe because fetchPosts() should be defined inside
        * of useEffect() in order for useEffect() to see all of the variables it uses.
        * This is why Vercel gives us a warning on build. But since fetchPost() calls
        * getAllSearchResults(), which calls getSearchResults() from GraphQL, we would
        * have to move all of that inside of useEffect(), introducing all kinds of clutter.
        * It's enough apparently to list searchQueryString in the dependency array, 
        * because ultimately that's the prop that stores the data anyway. See here:
        * https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
        */
        if ( searchQueryString ) {
            setSearchQuery( searchQueryString )
            fetchPosts(100, null, searchQueryString)
        }
        
    }, [ searchQueryString ] )
    
    const totalPostResultCount = (queryResultPosts?.edges?.length < 100 ? queryResultPosts?.edges?.length : `more than ${queryResultPosts?.edges?.length}`)

    return (
        <>
            <Header menu={navigationMenus} slug={slug} />
            <div className='flex justify-center px-5 sm:px-0 md:px-6 xl:px-0  my-12'>
                <SearchForm
                    searchQuery={ searchQuery }
                    setSearchQuery={ setSearchQuery }
                    handleSearchFormSubmit={handleSearchFormSubmit}
                    mode={'light'}
                />
            </div>
            {loading ?
                <div className='flex justify-center h-[800px] text-5xl'>
                    <FontAwesomeIcon icon={faSpinner} className='fa-spin'/>
                </div>
            :
                <>
                    <div className='container mb-12'>
                        <div className={showResultInfo ? 'text-xl my-5 mx-6 sm:mx-0' : 'hidden'}>
                            Your search returned {totalPostResultCount} articles.
                        </div>
                        <div className={searchError ? 'container text-xl my-5' : 'hidden'}>
                            Error: {searchError}
                        </div>
                        <div className='grid grid-cols-1 px-5 sm:px-0 md:px-6 xl:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                            {queryResultPosts?.edges?.map((el) => (
                                <div key={el.node.id}>
                                    <div className='h-80'>
                                        {el.node.featuredImage &&
                                            <div className='relative h-44 mb-3'>
                                                <Image 
                                                    src={el.node.featuredImage.node.sourceUrl}
                                                    alt={el.node.featuredImage.node.altText}
                                                    objectFit='cover'
                                                    layout='fill'
                                                    placeholder='blur'
                                                    // Work-around for no out-of-box dataUrl
                                                    blurDataURL={`/_next/image?url=${el.node.featuredImage.node.sourceUrl}&w=16&q=1`}
                                                />
                                            </div>
                                        }
                                        <div>
                                            <div className='text-lg mb-3 font-semibold'>
                                                <a href={`../${el.node.slug}`}>
                                                    {el.node.title}
                                                </a>
                                            </div>
                                            <div className='text-smart-blue'>
                                                {el.node.categories.edges.map((cat, index) => (
                                                    <span key={cat.node.id}>
                                                        <a
                                                            className='text-base font-semibold text-smart-blue hover:text-smart-teal uppercase tracking-wider'
                                                            href={`../category/${cat.node.slug}`}>{cat.node.name}
                                                        </a> 
                                                        {index < (el.node.categories.edges.length - 1) ? 
                                                            <span> | </span> 
                                                        : 
                                                            <span></span>
                                                        }
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
            <Footer myMenu={navigationMenus}/>
        </>
    )
}

export async function getStaticProps({ params, preview = false, previewData }) {
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
            navigationMenus: navigationMenus,
            slug: 'search'
        }
    }
    
}