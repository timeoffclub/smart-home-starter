import { useRouter } from 'next/router'
import Image from 'next/image'
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
    console.log(query)

    const [productData, setProductData] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    const [avgWeight, setAvgWeight] = useState(null)
    const [canCarry, setCanCarry] = useState(null)
    

    useEffect(() => {

        const fetchPrice = async () => {
            setState('LOADING')
            setErrorMessage(null)
    
            try {
                const response = await axios.post('../../../../api/amazon-search-items', { query })
                setProductData(response.data.data)
                console.log(response.data.data)
                setState('SUCCESS')
                getOutput(response.data.data)
            } catch (e) {
                console.log(e)
                setErrorMessage(e.response.data.error)
                setState('ERROR')
            }
        }
        fetchPrice()
        
    }, [query])

    const getOutput = (data) => {
        output === 'weight' && getAvgWeight(data)
    }

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
                                <Image 
                                    className='transition-all ease-in duration-500'
                                    src={productData.SearchResult.Items[0].Images.Primary.Large.URL}
                                    alt={brand}
                                    objectFit='cover'
                                    layout='fill'
                                    sizes='50vw'
                                    priority
                                />
                            </div>
                            <div className='text-xl mb-4'>
                                A <span className='font-bold'>{width}</span> <span className='capitalize font-bold'>{brand}</span> <span className='uppercase'>{hardware}</span> weighs an average of <span className='font-bold'>{avgWeight}</span>lbs. {canCarry} We have used the average of <span className='font-bold'>{productData.SearchResult.Items.length}</span> different <span className='font-bold capitalize'>{brand}</span> TV&apos;s.
                            </div>
                            <div className='my-12'>
                                {productData.SearchResult.Items.map((el, index) => (
                                    <div key={index} className='mb-6'>
                                        <div className='mb-3 text-xl font-semibold'>
                                            <div>
                                                {el.ItemInfo.Title.DisplayValue}
                                            </div>
                                            <div>
                                                TV Specs and Dimensions:
                                            </div>
                                        </div>
                                        {el.ItemInfo.ManufactureInfo.Model !== undefined &&
                                            <div className='text-lg'>
                                                Item Model Number: {el.ItemInfo.ManufactureInfo.Model.DisplayValue}
                                            </div>
                                        }
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
                    <Footer myMenu={nav}/>
                </>
            }
        </div>
    )
}

export async function getServerSideProps({ params, preview = false, previewData }) {
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