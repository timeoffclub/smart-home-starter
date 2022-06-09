import { getNavigation, getPageById } from '../lib/api'
import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'

export default function PrivacyPolicy({ nav, content }) {
    let navigationObject = []
    navigationObject.push(...nav.menus.nodes[0].menuItems.nodes.filter((el) => el.parentId === null))
    navigationObject.map((el) => {
        el.menuItems = [...nav.menus.nodes[0].menuItems.nodes.filter((node) => node.parentId === el.id)]
    })
    
    return (
        <>
            <Head>
                <title>
                    SmartHomeStarter - Privacy Policy
                </title>
                <meta
                    name='description'
                    content='Privacy Policy'
                    key='desc'
                />
                <meta property='og:title' content='SmartHomeStarter - Privacy Policy' />
                <meta
                    property='og:description'
                    content='Privacy Policy'
                />
            </Head>
            <Header menu={navigationObject}/>
            <div className='container px-6  2xl:px-0 my-12 w-full'>
                <main className='w-fit unreset' dangerouslySetInnerHTML={{__html: content.pageBy.content}}>
                </main>
            </div>
            <Footer myMenu={navigationObject}/>
        </>
    )
}

export async function getStaticProps() {
	const nav = await getNavigation()
    const content = await getPageById('cG9zdDoz')
    
    return {
        props: {
            nav: nav,
            content: content
        }
    }
    
}