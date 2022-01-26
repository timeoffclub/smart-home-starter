import { getNavigation } from '../lib/api'
import ContactForm from '../components/contact-form'
import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'

export default function ContactUs({ nav }) {
    let navigationObject = []
    navigationObject.push(...nav.menus.nodes[0].menuItems.nodes.filter((el) => el.parentId === null))
    navigationObject.map((el) => {
        el.menuItems = [...nav.menus.nodes[0].menuItems.nodes.filter((node) => node.parentId === el.id)]
    })
    
    return (
        <>
            <Head>
                <title>
                    SmartHomeStarter - Contact Us
                </title>
                <meta
                    name='description'
                    content='Have a question or comment? Reach out to us using this contact form.'
                    key='desc'
                />
                <meta property='og:title' content='SmartHomeStarter - Contact Us' />
                <meta
                    property='og:description'
                    content='Have a question or comment? Reach out to us using this contact form.'
                />
            </Head>
            <Header menu={navigationObject}/>
            <div className='container px-6 xl:px-12 2xl:px-0 my-12 w-full'>
                <div className='w-fit'>
                    <h1 className='text-4xl mb-4 font-semibold text-smart-blue'>
                        Contact Us
                    </h1>
                    <p className='text-lg mb-4'>
                        Have a question? Use the form below to send us a message.
                    </p>
                </div>
                <div className='w-fit'>
                    <ContactForm/>
                </div>
            </div>
            <Footer myMenu={navigationObject}/>
        </>
    )
}

export async function getStaticProps() {
	const nav = await getNavigation()
    
    return {
        props: {
            nav: nav
        }
    }
    
}