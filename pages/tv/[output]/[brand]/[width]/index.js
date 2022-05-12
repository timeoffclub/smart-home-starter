import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getNavigation } from '../../../../../lib/api'

import Header from '../../../../../components/header'
import Footer from '../../../../../components/footer'
import Schema from '../../../../../components/schema'

export default function Output({nav}) {
    const router = useRouter()
    const hardware = router.asPath.split('/')[1]
    const output = router.asPath.split('/')[2]
    const brand = router.asPath.split('/')[3]
    const width = router.asPath.split('/')[4]
    const query = `${brand} ${hardware} ${width}`
    console.log(query)

    const [productData, setProductData] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    const [avgWeight, setAvgWeight] = useState(null)
    

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
            if (el.ItemInfo.ProductInfo.ItemDimensions.Weight !== undefined) {
                arr.push(el.ItemInfo.ProductInfo.ItemDimensions.Weight.DisplayValue)
            }
        })
        let avg = arr.reduce((a, b) => a + b) / arr.length
        setAvgWeight(avg.toFixed())
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
                            <div className='text-2xl mb-4'>
                                A <span className='font-bold'>{width}</span> <span className='capitalize font-bold'>{brand}</span> <span className='uppercase'>{hardware}</span> weighs <span className='font-bold'>{avgWeight}</span>lbs.
                            </div>
                            <div className='text-2xl'>
                                We have used the average of <span className='font-bold'>{productData.SearchResult.Items.length}</span> different <span className='font-bold capitalize'>{brand}</span> TV&apos;s.
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
                                        <div className='text-lg'>
                                            Product Dimensions: {el.ItemInfo.ProductInfo.ItemDimensions.Height.DisplayValue} x {el.ItemInfo.ProductInfo.ItemDimensions.Length.DisplayValue} x {el.ItemInfo.ProductInfo.ItemDimensions.Width.DisplayValue}
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