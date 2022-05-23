import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getNavigation } from '../../../../lib/api'
import Newsletter from '../../../../components/newsletter'
import Header from '../../../../components/header'
import Footer from '../../../../components/footer'
import Schema from '../../../../components/schema'

export default function Width({nav}) {
    const router = useRouter()
    const hardware = router.asPath.split('/')[1]
    const brand = router.asPath.split('/')[2]
    const width = router.asPath.split('/')[3]
    const routeSearch = `${brand} ${hardware} ${width}`
    console.log(routeSearch)

    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    const [relatedPaths, setRelatedPaths] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const searchData = await getExactDBMatches(routeSearch)
                setRelatedPaths(searchData.data)
                setState('SUCCESS')
            } catch (e) {
                console.log(e)
                setErrorMessage(e.response.data.error)
                setState('ERROR')
            }
        }
        getData()
    }, [routeSearch])

    const getExactDBMatches = async (term) => {
        const data = await axios.post('../../../../api/find-paapi-search', { query: term, type: 'exact' } )
        return data.data
    }

    return (
        <>
            <Header menu={nav}/>
            {state === 'SUCCESS' &&
                <div className='container grid grid-cols-3 px-6 lg:px-22 xl:px-40 gap-5 my-12'>
                    <div className='col-span-3 lg:col-span-2'>
                        <div className='text-base text-gray-500 font-extralight'>
                            The Smart Home Starter team picks the products and services we write about. When you buy through our links, we may get a commission.
                        </div>
                        <div className='text-4xl md:text-5xl font-bold tracking-wider mt-12 mb-8'>
                            <h1>
                                <span>{width}</span> <span className='capitalize'>{brand}</span> <span className='uppercase'>{hardware}</span> links
                            </h1>
                        </div>
                        <div className='grid grid-cols-2'>
                            {relatedPaths?.map((el, index) => (
                                <div key={index}>
                                    <a className='text-lg text-smart-blue font-semibold hover:text-smart-teal' href={`../../../${hardware}/${brand}/${el.data.term.split(' ')[2]}/${el.data.output}`}>
                                        What is a {width} <span className='capitalize'>{brand}</span> <span className='uppercase'>{hardware}</span>&apos;s {el.data.output}?
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='hidden lg:inline col-span-1'>
                        <div className='sidebar-ad w-full mb-14'>
                        </div>
                        <div className='border-y-2 border-y-gray-500 py-12 my-14'>
                            <div className='border-y-2 border-y-gray-500 py-12 my-14'>
                                <div className='text-4xl text-smart-blue font-semibold mb-5 tracking-wider'>
                                    Sign up for our newsletter
                                </div>
                                <Newsletter mode={'light'}/>
                            </div>
                        </div>
                        <div className='sidebar-ad-sticky w-full top-10 sticky'>
                        </div>
                    </div>
                </div>
            }
            <Footer myMenu={nav}/>
        </>
    )
}

export async function getServerSideProps() {

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