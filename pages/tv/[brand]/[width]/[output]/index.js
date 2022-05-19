import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getNavigation } from '../../../../../lib/api'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare'
import { FaTwitterSquare } from '@react-icons/all-files/fa/FaTwitterSquare'

import Header from '../../../../../components/header'
import Footer from '../../../../../components/footer'
import Schema from '../../../../../components/schema'

export default function Output({nav}) {
    const router = useRouter()
    const hardware = router.asPath.split('/')[1]
    const brand = router.asPath.split('/')[2]
    const width = router.asPath.split('/')[3]
    const output = router.asPath.split('/')[4]
    const query = `${brand} ${hardware} ${width}`

    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    const [avgWeight, setAvgWeight] = useState(null)
    const [canCarry, setCanCarry] = useState(null)
    const [searchRes, setSearchRes] = useState(null)

    // TODO:
    // * Add date to searches stored in db and check to see if older than a week. If so, get new.
    // * Validate data before showing in view or storing in database. Make sure items are actually tvs, for example.
    // * Create interface from data that anticipates future usage--perhaps other outputs and hardware.
    // * Build all pages in database using getStaticPaths on each build
    

    useEffect(() => {
        // Check whether the route search query exists in the databse; i.e., has it been searched before?
        // If it does, use it to populate the view. If not, run a new paapi query, then store that in the database.
        const fetchDatabaseSearches = async () => {
            setState('LOADING')
            setErrorMessage(null)
            try {
                const searchData = await axios.get('../../../../api/find-paapi-search')
                console.log(searchData)
                if (filterSearches(searchData).length !== 0) {
                    let res = filterSearches(searchData)[0].data
                    setSearchRes(res)
                    setState('SUCCESS')
                } else {
                    fetchPaapiRes()
                }
            } catch (e) {
                console.log(e)
                setErrorMessage(e.response.data.error)
                setState('ERROR')
            }
        }
        fetchDatabaseSearches()
        
    }, [query])

    // New paapi query
    const fetchPaapiRes = async () => {
        try {
            const response = await axios.post('../../../../api/amazon-search-items', { query })
            const validatedData = validatePaapiData(response.data)
            const validatedDataLength = validatedData.SearchResult.Items.length
            if (validatedDataLength !== 0) {
                addDatabaseSearch(validatedData)
                setSearchRes(validatedData)
                setState('SUCCESS')
                getOutput(validatedData)
            } else {
                setState('BAD REQUEST')
            }
        } catch (e) {
            console.log(e)
            setErrorMessage(e.response.data.error)
            setState('ERROR')
        }
    }

    // Stores search results in database
    const addDatabaseSearch = async (data) => {
        try {
            const response = await axios.post('../../../../api/add-paapi-search', { query, data })
        } catch (e) {
            console.error(e)
            console.error('The search was not added to the database for some reason.')
        }
    }

    // Checks whether current search exists in database
    const filterSearches = (data) => {
        return data.data.data.filter((el) => el.data.term === query)
    }

    // Validate data before we store it in db or add it to view
    // In this case we filter out results whose size does not match our width
    const validatePaapiData = (data) => {
        return {
            "SearchResult": {
                "TotalResultCount": data.data.SearchResult.TotalResultCount,
                "SearchURL": data.data.SearchResult.SearchURL,
                "Items": data.data.SearchResult.Items.filter((el) => el.ItemInfo.ProductInfo.Size.DisplayValue.slice(0,2) === width.split('-')[0])
            }
        }
    }

    // This should maybe be its own component
    const getOutput = (data) => {
        output === 'weight' && getAvgWeight(data)
    }

    // Own component...
    const getAvgWeight = (data) => {
        let arr = []
        data.SearchResult.Items.forEach((el) => {
            // Check that the ItemDimensions and Weight resource properties exist because they do not always
            if (el.ItemInfo.ProductInfo.ItemDimensions !== undefined) {
                el.ItemInfo.ProductInfo.ItemDimensions.Weight !== undefined && arr.push(el.ItemInfo.ProductInfo.ItemDimensions.Weight.DisplayValue)
            }
        })
        let avg = arr.reduce((a, b) => a + b) / arr.length
        setAvgWeight(avg.toFixed())
        getCanCarry(avg)
    }

    // Own component...
    const getCanCarry = (avg) => {
        if (avg < 30) {
            setCanCarry('An average person should be able to carry this on their own.')
        } else if (avg > 30 && avg < 50) {
            setCanCarry('Most people will need some help carrying this item.')
        } else {
            setCanCarry('You will need some help and possibly some equipment to transport this item.')
        }
    }

    return (
        <div>
            {state === 'SUCCESS' &&
                <>
                    
                    <div className='container grid grid-cols-3 px-6 lg:px-22 xl:px-40 gap-5 my-12'>
                        <div className='col-span-3 lg:col-span-2'>
                            <div className='text-base text-gray-500 font-extralight'>
                                The Smart Home Starter team picks the products and services we write about. When you buy through our links, we may get a commission.
                            </div>
                            <div className='text-4xl md:text-5xl font-bold tracking-wider mt-12 mb-8'>
                                <h1>
                                    How Much Does a {width} <span className='capitalize'>{brand}</span> <span className='uppercase'>{hardware}</span> Weigh?
                                </h1>
                            </div>
                            <div className='flex justify-between items-baseline mb-2'>
                                <div className='flex mb-3 text-3xl'>
                                    <div className='mr-3'>
                                        <FacebookShareButton
                                            url={`https://smarthomestarter.com/${router.asPath}`}
                                            hashtag={`#smart home`}
                                        >
                                            <FaFacebookSquare className='text-smart-blue hover:text-smart-teal' />
                                        </FacebookShareButton>
                                    </div>
                                    <div>
                                        <TwitterShareButton
                                            url={`https://smarthomestarter.com/${router.asPath}`}
                                            hashtag={`#smart home`}
                                        >
                                            <FaTwitterSquare className='text-smart-blue hover:text-smart-teal' />
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>
                            <div className='relative h-96 mb-5'>
                                {searchRes.SearchResult.Items.length !== 0 &&
                                    <Image 
                                        className='transition-all ease-in duration-500'
                                        src={searchRes.SearchResult.Items[0].Images.Primary.Large.URL}
                                        alt={brand}
                                        objectFit='cover'
                                        layout='fill'
                                        sizes='50vw'
                                        priority
                                    />
                                }
                            </div>
                            <div className='text-xl mb-4'>
                                A <span className='font-bold'>{width}</span> <span className='capitalize font-bold'>{brand}</span> <span className='uppercase'>{hardware}</span> weighs an average of <span className='font-bold'>{avgWeight}</span>lbs. {canCarry} We have used the average of <span className='font-bold'>{searchRes.SearchResult.Items.length}</span> different <span className='font-bold capitalize'>{brand}</span> TV&apos;s.
                            </div>
                            <div className='text-3xl md:text-4xl font-bold tracking-wider mt-12 mb-8'>
                                <h2>
                                    Other <span className='capitalize'>{brand}</span> TV Weights
                                </h2>
                            </div>
                            <div className='grid grid-cols-2'>
                            </div>
                            <div className='my-12'>
                                {searchRes.SearchResult.Items.map((el, index) => (
                                    <div key={index} className='mb-6'>
                                        <div className='mb-3 text-xl font-semibold'>
                                            <div>
                                                {el.ItemInfo.Title.DisplayValue}
                                            </div>
                                            <div>
                                                TV Specs and Dimensions:
                                            </div>
                                        </div>
                                        <div>
                                            ...
                                        </div>
                                        <div>
                                            <a className='font-semibold text-smart-blue hover:text-smart-teal' target='_blank' rel='noreferrer' href={el.DetailPageURL}>Amazon Detail Page</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='hidden lg:inline col-span-1'>
                            <div className='sidebar-ad w-full mb-14'>
                            </div>
                            <div className='sidebar-ad-sticky w-full top-10 sticky'>
                            </div>
                        </div>
                    </div>
                </>
            }
            {state === 'BAD REQUEST' &&
                <>
                    <Head>
                        <meta name="robots" content="noindex"/>
                    </Head>
                    <DefaultErrorPage statusCode={404}/>
                </>
            }
        </div>
    )
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const nav = await getNavigation()

    let navigationObject = []
    navigationObject.push(...nav.menus.nodes[0].menuItems.nodes.filter((el) => el.parentId === null))
    navigationObject.map((el) => {
        el.menuItems = [...nav.menus.nodes[0].menuItems.nodes.filter((node) => node.parentId === el.id)]
    })
    
    return {
        props: {
            nav: navigationObject
        }
    }
    
}

export async function getStaticPaths() {
    let data = []
    try {
        const searchData = await axios.get('../../../../api/find-paapi-search')
        data = searchData
    } catch (e) {
        console.error(e)
    }

    

    return {
        paths: data?.data?.map(({ el }) => `tv/${el.term.split(' ')[0]}/${el.term.split(' ')[2]}/${params.output}`) || [],
        fallback: true
    }
}