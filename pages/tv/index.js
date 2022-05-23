import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getNavigation } from '../../lib/api'
import Head from 'next/head'
import Newsletter from '../../components/newsletter'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Schema from '../../components/schema'

export default function Tv({nav}) {
    const router = useRouter()
    const hardware = router.asPath.split('/')[1]
    const routeSearch = `${hardware}`

    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)
    const [relatedPaths, setRelatedPaths] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const searchData = await getArrDBMatches(routeSearch)
                console.log(searchData)
                setRelatedPaths(searchData)
                setState('SUCCESS')
            } catch (e) {
                console.log(e)
                setErrorMessage(e.response.data.error)
                setState('ERROR')
            }
        }
        getData()
    }, [routeSearch])

    const getArrDBMatches = async (term) => {
        const data = await axios.post('../../api/find-paapi-search', { query: term, type: 'contains' } )
        // We also need to filter out results whose terms do not contain 'tv' once we have other types of hardware in the DB
        return data.data.data.filter((el) => el.data.output !== 'none')
    }

    return (
        <>
            <Head>
                <title>Smart Home Starter - TV</title>
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
            <Header menu={nav}/>
            {state === 'SUCCESS' &&
                <div className='container grid grid-cols-3 px-6 lg:px-22 xl:px-40 gap-5 my-12'>
                    <div className='col-span-3 lg:col-span-2'>
                        <div className='text-base text-gray-500 font-extralight'>
                            The Smart Home Starter team picks the products and services we write about. When you buy through our links, we may get a commission.
                        </div>
                        <div className='text-4xl md:text-5xl font-bold tracking-wider mt-12 mb-8'>
                            <h1>
                                <span className='uppercase'>{hardware}</span> links
                            </h1>
                        </div>
                        <div className='grid grid-cols-2'>
                            {relatedPaths?.map((el, index) => (
                                <div key={index}>
                                    <a className='text-lg text-smart-blue font-semibold hover:text-smart-teal' href={`../../${hardware}/${el.data.term.split(' ')[0]}/${el.data.term.split(' ')[2]}/${el.data.output}`}>
                                        What is a {el.data.term.split(' ')[2]} <span className='capitalize'>{el.data.term.split(' ')[0]}</span> <span className='uppercase'>{hardware}</span>&apos;s {el.data.output}?
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