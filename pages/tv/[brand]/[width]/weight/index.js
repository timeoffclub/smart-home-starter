import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getNavigation } from '../../../../../lib/api'
import Newsletter from '../../../../../components/newsletter'
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
    const routeSearch = `${brand} ${hardware} ${width}`

    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    const [avgWeight, setAvgWeight] = useState(null)
    const [canCarry, setCanCarry] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [relatedWeights, setRelatedWeights] = useState(null)
    const [bestSelling, setBestSelling] = useState(null)
    const [wallMounts, setWallMounts] = useState(null)

    // TODO:
    // * Add date to searches stored in db and check to see if older than a week. If so, get new.
    // * Create interface from data that anticipates future usage--perhaps other outputs and hardware.
    // * Build all pages in database using getStaticPaths on each build?
    // * Refactor to divide responsibilities into components, e.g., accessories should be its own component
    

    useEffect(() => {
        // Check whether the route search query exists in the databse; i.e., has it been searched before?
        // If it does, use it to populate the view. If not, run a new paapi query, then store that in the database.
        const getData = async () => {
            setState('LOADING')
            setErrorMessage(null)
            try {
                const searchData = await getExactDBMatch(routeSearch)
                if (searchData.data[0] !== undefined) {
                    getAccessories('wall mount')
                    .then((res) => setWallMounts(res))
                    getRelatedWeights(searchData.data[0].data)
                    .then((res) => setRelatedWeights(res))
                    setSearchResults(searchData.data[0].data)
                    setAvgWeight(getAvgWeight(searchData.data[0].data))
                    getCanCarry(avgWeight)
                    setBestSelling(getBestSelling(searchData.data[0].data))
                    setState('SUCCESS')
                } else {
                    fetchPaapiRes()
                }
            } catch (e) {
                console.log(e)
                setErrorMessage(e)
                setState('ERROR')
            }
        }
        getData()
        
    }, [routeSearch])

    const getExactDBMatch = async (term) => {
        const data = await axios.post('../../../../api/find-paapi-search', { query: term, type: 'exact' } )
        return data.data
    }

    const getArrayFieldDBMatch = async (term) => {
        const data = await axios.post('../../../../api/find-paapi-search', { query: term, type: 'array' } )
        return data.data
    }

    // New paapi query
    const fetchPaapiRes = async () => {
        try {
            const response = await axios.post('../../../../api/amazon-search-items', { query: routeSearch })
            console.log(response)
            const validatedData = validatePaapiData(response.data)
            const validatedDataLength = validatedData.SearchResult.Items.length
            if (validatedDataLength !== 0) {
                addDatabaseSearch(routeSearch, validatedData, 'weight')
                setSearchResults(validatedData)
                getAccessories('wall mount')
                .then((res) => setWallMounts(res))
                getRelatedWeights(validatedData)
                .then((res) => setRelatedWeights(res))
                setAvgWeight(getAvgWeight(validatedData))
                getCanCarry(avgWeight)
                setBestSelling(getBestSelling(validatedData))
                setState('SUCCESS')
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
    const addDatabaseSearch = async (query, data, output) => {
        try {
            const response = await axios.post('../../../../api/add-paapi-search', { query, data, output })
            return response
        } catch (e) {
            console.error(e)
            console.error('There was an error, and search was not added to the database.')
        }
    }

    // Validate data before we store it in db or add it to view
    // In this case we filter out results whose size does not match our width
    const validatePaapiData = (data) => {
       console.log( 
        {
            "SearchResultTest": {
                "TotalResultCount": data.data.SearchResult.TotalResultCount,
                "SearchURL": data.data.SearchResult.SearchURL,
                "Items": data?.data?.SearchResult?.Items?.filter((el) => {
                    el?.ItemInfo?.ProductInfo?.Size?.DisplayValue.slice(0,2) === width.split('-')[0] && el?.ItemInfo?.Title?.DisplayValue.toLowerCase().includes(brand.toLowerCase())
                })
            }
        })
        return {
            "SearchResult": {
                "TotalResultCount": data.data.SearchResult.TotalResultCount,
                "SearchURL": data.data.SearchResult.SearchURL,
                "Items": data?.data?.SearchResult?.Items?.filter((el) =>  el?.ItemInfo?.ProductInfo?.Size?.DisplayValue.slice(0,2) === width.split('-')[0] && el?.ItemInfo?.Title?.DisplayValue.toLowerCase().includes(brand.toLowerCase()))
            }
        }
    }

    // Weight calculations
    const getAvgWeight = (data) => {
        let arr = []
        data.SearchResult.Items.forEach((el) => {
            // Check that the ItemDimensions and Weight resource properties exist because they do not always
            if (el?.ItemInfo?.ProductInfo?.ItemDimensions?.Weight !== undefined) {
                arr.push(el.ItemInfo.ProductInfo.ItemDimensions.Weight.DisplayValue)
            }
        })
        let avg = arr.reduce((a, b) => a + b) / arr.length
        return avg.toFixed()
    }

    // Get weights for other widths to be displayed in table
    const getRelatedWeights = async () => {
        let arr = []
        const data = await getArrayFieldDBMatch(brand)
        data.data.map((el) => {
            el.data.term.split(' ')[0] === brand && arr.push({
                width: el.data.term.split(' ')[2],
                avgWeight: getAvgWeight(el.data)
            })
        })
        function compare(a, b) {
            if (a.width > b.width) return 1;
            if (a.width < b.width) return -1;
            return 0;
        }
        arr.sort(compare)
        console.log(arr.length)
        return arr
    }

    // Get the best selling {hardware} for this brand and width
    const getBestSelling = (data) => {
        let bestSelling = data.SearchResult.Items[0]
        data.SearchResult.Items.map((el) => {
            if (el.BrowseNodeInfo.BrowseNodes[0].SalesRank < bestSelling.BrowseNodeInfo.BrowseNodes[0].SalesRank) {
                bestSelling = el
            }
        })
        return bestSelling
    }

    // Get accessories
    // We need to query the actual database instead of pulling it and filtering here.
    const getAccessories = async (term) => {
        try {
            let data = await getExactDBMatch(`${term} for ${width} ${hardware}`)
            if (data.data.length !== 0) {
                console.log(data.data[0])
                return data.data[0]
            } else {
                try {
                    let data = await axios.post('../../../../api/amazon-search-items', { query: `${term} for ${width} ${hardware}` })
                    addDatabaseSearch(`${term} for ${width} ${hardware}`, data.data.data, 'none' )
                    return data.data
                } catch (e) {
                    console.error(e)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const randomIntroString = () => {
        let arr = [
            `When you are shopping for a TV it is important to consider multiple factors like price, weight, features, and even mounting solutions.`,
            `When you are browsing for a TV it is important to consider multiple factors like price, features, weight, and even mounting solutions.`,
            `When you are shopping for a TV it is critical to consider multiple factors like price, weight, features, and even mounting solutions.`,
            `When you are looking for a new TV, it's crucial to consider multiple factors such as features, weight, price, and mounting solutions.`,
            `When you are looking to purchase a new TV, it's crucial to consider multiple factors such as features, weight, price, and mounting solutions.`,
            `When you are looking to purchase a new TV, it's crucial to consider multiple elements such as features, weight, price, and mounting solutions.`,
            `When you are looking to purchase a new TV for your home, it's crucial to consider multiple elements such as features, weight, price, and mounting solutions.`,
            `When you are looking to purchase a new TV for your home, it's important to consider multiple elements such as features, weight, price, and mounting solutions.`,
            `When you are looking to purchase a new TV for your home, it's critical to consider multiple elements such as features, weight, price, and mounting solutions.`,
            `People who are interested in new TVs should consider several factors like features, weight, price, and mounting solutions.`,
            `People who are interested in new TVs should consider several elements like features, weight, price, and mounting solutions.`,
            `People who are interested in new TVs should consider several variables like features, weight, price, and mounting solutions.`,
            `People who are interested in new TVs should consider several aspects like features, weight, price, and mounting solutions.`,
            `When you are shopping around for a new TVs should consider several elements like features, weight, price, and mounting solutions.`,
            `When you are shopping around for a new TVs should consider several variables like features, weight, price, and mounting solutions.`,
            `When you are shopping around for a new TVs should consider several aspects like features, weight, price, and mounting solutions.`
        ]

        return arr[Math.floor(Math.random() * arr.length)]
    }

    const randomSecondString = () => {
        let arr = [
            `Most consumers want a lighter TV because it is easier to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
            `Most people want a lighter TV because it is easier to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
            `Most consumers want a TV that weighs less because it is easier to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
            `Most consumers want a lighter TV because it is easy to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
            `Most people want a TV that is light because it is easier to carry, package, and unload from their car. Being able to carry your TV ensures reduces the change of damage while in transport.`,
            `Most consumers want a lighter TV because it is easier to transport, package, and unload from their car and into their home. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
            `Most people want a lighter TV because it is much easier to transport, package, and unload from their car. Being able to simply carry your TV ensures minimizing any damage while in transport.`,
            `Most folks want a TV that weighs less because it is easier to transport, package, and unload from their car. You want to be able to easily carry your TV ensures minimizing any damage while in transport.`,
            `Most individuals want a TV that weighs less because it is much easier to carry, package, and remove from their car. Being able to carry your TV ensures minimizing any damage while traveling with it.`
        ]

        return arr[Math.floor(Math.random() * arr.length)]
    }

    const randomWeightString = (w,b,h,wt) => {
        let arr = [
            `A ${w} <span style='text-transform: capitalize'>${b}</span> <span style='text-transform: uppercase'>${h}</span> weighs on average ${wt} lbs.`,
            `An average ${w} <span style='text-transform: capitalize'>${b}</span> <span style='text-transform: uppercase'>${h}</span> weighs exactly ${wt} lbs.`,
            `A ${w} <span style='text-transform: capitalize'>${b}</span> <span style='text-transform: uppercase'>${h}</span> weighs on average ${wt} lbs.`,
            `The weight of a ${w} <span style='text-transform: capitalize'>${b}</span> <span style='text-transform: uppercase'>${h}</span> is ${wt} lbs.`,
            `The average weight of a <span style='text-transform: capitalize'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> is ${wt} lbs.`,
            `The <span style='text-transform: capitalize'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> weighs ${wt} lbs.`,
            `The <span style='text-transform: capitalize'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> weighs exactly ${wt} lbs.`,
            `The average weight of a <span style='text-transform: capitalize'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> is ${wt} lbs.`,
            `The average weight of a ${w} <span style='text-transform: capitalize'>${b}</span> <span style='text-transform: uppercase'>${h}</span> is exactly ${wt} lbs.`,
        ]

        return arr[Math.floor(Math.random() * arr.length)]
    }

    const getCanCarry = (avg) => {
        const arr = [
            `An average person should be able to carry this on their own.`,
            `An average individual should be able to carry this on their own.`,
            `An average person will be able to carry this on their own.`,
            `An average individual will be able to carry this on their own.`,
            `Normally one individual can handle transporting this from a retail store to their car and home.`,
            `Normally one person can handle transporting this from a retail store to their car and home.`,
            `Normally one person can handle carrying this from a retail store to their car and home.`,
            `Normally one individual can handle carrying this from a retail store to their car and home.`,
            `One individual should be able to comfortably handle carrying this on their own.`,
            `One individual should be able to comfortably handle carrying this TV on their own.`,
            `One individual will be able to comfortably handle carrying this on their own.`,
            `One individual will be able to comfortably handle carrying this TV on their own.`,
            `One person will be able to comfortably handle carrying this on their own.`,
            `One person will be able to comfortably handle carrying this TV on their own.`,
            `One person should be able to comfortably handle carrying this on their own.`,
            `One person should be able to comfortably handle carrying this TV on their own.`
                ]
        if (avg < 30) {
            setCanCarry(arr[Math.floor(Math.random() * arr.length)])
        } else if (avg > 30 && avg < 50) {
            setCanCarry('Most people will want some help carrying this item.')
        } else {
            setCanCarry('You will need some help and possibly some equipment to transport this item.')
        }
    }

    const randomOtherWeightsString = (b) => {
        let arr = [
            `Here are other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below are other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Here are the other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Here are the weights for all other <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below are the weights for all other <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below you will find other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below you can find other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below you will see other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below you can see other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below are other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`,
            `Below you can view the other TV weights for <span style='text-transform: capitalize'>${b}</span> TVs:`
        ]

        return arr[Math.floor(Math.random() * arr.length)]
    }

    const randomWallMountsString = (w,b) => {
        let arr = [
            `Any universal TV mount will work for your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Any universal TV mount will be suitable for your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Any universal TV mount will be appropriate for your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Most universal TV mount will work for your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Most universal TV mount will fit your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Most universal TV mount will be compatible for your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Any universal TV mount will be compatible for your <span style='text-transform: capitalize'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
            `Most TV mounts are universal and will work with your <span style='text-transform: capitalize'>${b}</span> ${w} TV. Just check to see if the weights and dimensions are compatible with your TV first.`,
            `Almost all universal TV mounts will work for your <span style='text-transform: capitalize'>${b}</span> ${w} TV. Verify that it does not exceed the weight limit and fits the dimensions of your TV.`,
            `Almost all universal TV mounts will be suitable for your <span style='text-transform: capitalize'>${b}</span> ${w} TV. Confirm that it does not exceed the weight limit and fits the dimensions of your TV.`,
            `Almost all universal TV mounts will be suited for your <span style='text-transform: capitalize'>${b}</span> ${w} TV. Double check that it does not exceed the weight limit and fits the dimensions of your TV.`
        ]

        return arr[Math.floor(Math.random() * arr.length)]
    }

    const randomWallMountsStringTwo = () => {
        let arr = [
            `Other things to be aware of are if you want it to move forward and back, swivel to the left or right, or if the height should be adjustable for situations like a fireplace.`,
            `Other factors to be cognizant of are if you want it to move forward and back, swivel to the left or right, or if the height should be adjustable for situations like a fireplace.`,
            `Other variables to be cognizant of are if you want it to move forward and back, swivel to the left or right, or if the height should be adjustable for situations like a fireplace.`,
            `Other factors to be cognizant of is if you want the height to be adjustable, move back or forward, or if you want to swivel it to the left or right.`,
            `Other variables to be aware of is if you want the height to be adjustable, move back or forward, or if you want to swivel it to the left or right.`,
            `Other things to be aware of is if you want the height to be adjustable, move back or forward, or if you want to swivel it to the left or right.`,
            `Other things to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Other variables to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Other factors to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Other details to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Other details to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Other details to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Also take note of if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Also take note of if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
            `Also take note of if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`
        ]

        return arr[Math.floor(Math.random() * arr.length)]
    }

    return (
        <>
            <Head>
                <title>Smart Home Starter - TV Weight</title>
                <meta name="description" content="We are two guys into tech exploring the world of smart home technology. We wanted to share some of our favorites with you!" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="google-site-verification" content="F4mea1tErzcEzFPCTRuzYG1F3gkXIG12ipkpqKvs-e4" />
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
            </Head>
            {state === 'SUCCESS' &&
                <>
                    <Header menu={nav}/>
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
                                {searchResults.SearchResult.Items.length !== 0 &&
                                    <Image 
                                        className='transition-all ease-in duration-500'
                                        src={searchResults.SearchResult.Items[0].Images.Primary.Large.URL}
                                        alt={brand}
                                        objectFit='cover'
                                        layout='fill'
                                        sizes='50vw'
                                        priority
                                    />
                                }
                            </div>
                            <div className='text-xl mb-4'>
                                <div className='mb-3'>
                                    {randomIntroString()}
                                </div>
                                <div className='mb-3'>
                                    <b dangerouslySetInnerHTML={{__html: randomWeightString(width,brand,hardware,avgWeight)}}></b>
                                </div>
                                <div>
                                    {randomSecondString()}
                                    <span> {canCarry}</span>
                                </div>
                            </div>
                            {relatedWeights?.length !== 0 &&
                                <div className='text-3xl md:text-4xl font-bold tracking-wider mt-12 mb-8'>
                                    <h2 dangerouslySetInnerHTML={{__html: randomOtherWeightsString(brand)}}>
                                    </h2>
                                    {relatedWeights?.map((el, index) => (
                                        <div className={`grid grid-cols-2 text-left- p-3 border-b text-lg mt-8 ${index % 2 === 0 ? 'bg-stone-100' : 'bg-white'}`} key={el.width}>
                                        <div className='col-span-1 font-bold'>
                                            <a className='text-smart-blue hover:text-smart-teal' href={`/tv/${brand}/${el.width}/weight`}>
                                                {el.width}
                                            </a>
                                        </div>
                                        <div className='col-span-1'>
                                            {el.avgWeight}lb.
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            }
                            <div className='text-3xl md:text-4xl font-bold tracking-wider mt-12 mb-8'>
                                <h2>
                                    Best selling <span className='font-bold'>{width}</span> <span className='capitalize font-bold'>{brand}</span> <span className='uppercase'>{hardware}</span>
                                </h2>
                            </div>
                            <div className='flex border-[1px] border-gray-300 items-center p-2'>
                                <div className='flex flex-1 w-1/4 h-fit'>
                                    <div className='w-5/6'>
                                        <Image 
                                            className='transition-all ease-in duration-500'
                                            src={bestSelling.Images.Primary.Large.URL}
                                            alt={brand}
                                            objectFit='cover'
                                            layout='responsive'
                                            width={75}
                                            height={50}
                                        />
                                    </div>
                                </div>
                                <div className='w-3/4'>
                                    <div className='font-semibold mb-3'>
                                        <a href={bestSelling.DetailPageURL} target='_blank' rel='noreferrer'>
                                            {bestSelling.ItemInfo.Title.DisplayValue}
                                        </a>
                                    </div>
                                    <div className='flex justify-between w-full items-center'>
                                        <div className='font-semibold text-gray-500'>
                                            {!bestSelling?.Offers?.Listings[0]?.ViolatesMAP
                                            ?
                                                bestSelling?.Offers?.Listings[0]?.Price?.DisplayAmount
                                            :
                                                'Price Unavailable'
                                            }
                                        </div>
                                        <a href={bestSelling.DetailPageURL} target='_blank' rel='noreferrer'>
                                            <div className='bg-orange-500 text-white font-bold rounded-md p-2 w-fit'>
                                                Buy Now
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {wallMounts &&
                                <>
                                    <div className='text-3xl md:text-4xl font-bold tracking-wider mt-12 mb-8'>
                                        <h2>
                                            What wall mount do I need for my <span className='font-bold'>{width}</span> <span className='capitalize font-bold'>{brand}</span> <span className='uppercase'>{hardware}</span>?
                                        </h2>
                                    </div>
                                    <div className='text-xl mb-4'>
                                        <span dangerouslySetInnerHTML={{__html: randomWallMountsString(width, brand)}}/>
                                        <span> {randomWallMountsStringTwo()}</span>
                                    </div>
                                    <div className='text-3xl md:text-4xl font-bold tracking-wider mt-12 mb-8'>
                                        <h2>
                                            Top <span className='uppercase'>{hardware}</span> mounts for a <span className='font-bold'>{width}</span> <span className='uppercase'>{hardware}</span>?
                                        </h2>
                                    </div>
                                    {wallMounts.data.SearchResult.Items.map((el, index) => (
                                        index < 3 &&
                                        <div className='flex border-[1px] border-gray-300 items-center p-2 mb-2' key={el.ASIN}>
                                            <div className='flex flex-1 w-1/4 h-fit'>
                                                <div className='w-5/6'>
                                                    <Image 
                                                        className='transition-all ease-in duration-500'
                                                        src={el.Images.Primary.Large.URL}
                                                        alt={brand}
                                                        objectFit='cover'
                                                        layout='responsive'
                                                        width={75}
                                                        height={50}
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-3/4'>
                                                <div className='font-semibold mb-3'>
                                                    <a href={el.DetailPageURL} target='_blank' rel='noreferrer'>
                                                        {el.ItemInfo.Title.DisplayValue}
                                                    </a>
                                                </div>
                                                <div className='flex justify-between w-full items-center'>
                                                    <div className='font-semibold text-gray-500'>
                                                        {!el?.Offers?.Listings[0]?.ViolatesMAP
                                                        ?
                                                            el?.Offers?.Listings[0]?.Price?.DisplayAmount
                                                        :
                                                            'Price Unavailable'
                                                        }
                                                    </div>
                                                    <a href={el.DetailPageURL} target='_blank' rel='noreferrer'>
                                                        <div className='bg-orange-500 text-white font-bold rounded-md p-2 w-fit'>
                                                            Buy Now
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                            
                        </div>
                        <div className='hidden lg:inline col-span-1'>
                            <div className='sidebar-ad w-full mb-14'>
                            </div>
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
                    <Footer myMenu={nav}/>
                </>
            }
            {state === 'BAD REQUEST' &&
                <>
                    <Head>
                        <meta name='robots' content='noindex'/>
                    </Head>
                    <div className='container px-6  2xl:px-0'>
                        <div className='flex items-center justify-center h-screen'>
                            <div className='flex items-center'>
                                <div className='font-display text-transparent bg-clip-text bg-gradient-to-r from-smart-blue to-smart-green text-7xl pr-8 border-r-2 border-r-black'>
                                    404
                                </div>
                                <div className='pl-8 text-center'>
                                    <div>
                                        This item doesn&apos;t appear to exist on Amazon. We suggest you check another time.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export async function getServerSideProps(context) {

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