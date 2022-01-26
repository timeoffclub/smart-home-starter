import Newsletter from '../components/newsletter'

export default function NewsLetterPageCTA() {
    
    return (
        <div className='flex flex-wrap justify-center items-center bg-black py-12 px-6 sm:px-0'>
            <div className='text-smart-blue w-full md:w-80 text-2xl font-semibold tracking-wider mb-6 md:mb-0'>
                Sign up for our newsletter to stay up to date with smart home tips, new smart home devices, and more!
            </div>
            <div className='w-full md:w-72 md:ml-5'>
                <Newsletter />
            </div>
        </div>
    )
}