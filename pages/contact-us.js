import ContactForm from '../components/contact-form'
import Header from '../components/header'
import Footer from '../components/footer'
import { getMenuBySlug } from '../lib/api'

export default function ContactUs({ navigationMenus }) {
    
    return (
        <>
            <Header menu={navigationMenus} />
            <div className='container px-6 sm:px-0 md:px-6 xl:px-0 my-12 w-full'>
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
            <Footer myMenu={navigationMenus}/>
        </>
    )
}

export async function getStaticProps({ params, preview = false}) {
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
			navigationMenus: navigationMenus
		}
	}
}