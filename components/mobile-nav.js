import dynamic from 'next/dynamic'
import Accordion from './accordian'

const SearchForm = dynamic(() => import('./search-form'))

export default function MobileNav({ menu, slug, mobileNav, mobileSearchInput, onSetMobileNav, onSetModalOpen, searchQuery, onSetSearchQuery, onHandleSearchFormSubmit, onToggleMobileNav }) {
    return (
        <div
            className={
                mobileNav ? 
                    // If slug is /search bump this menu up higher with top attribute
                    slug === 'search' ? 
                        'absolute lg:hidden z-50 left-0 w-screen h-fit bg-black transition-all ease-in-out duration-400 py-12' 
                    :
                        'absolute lg:hidden z-50 top-20 left-0 w-screen h-fit bg-black transition-all ease-in-out duration-400 py-12'
                :
                    'absolute lg:hidden w-screen z-50 h-0 bg-black transition-all ease-in-out duration-400'
            }
        >
            {/* Mobile search - beneath main nav on mobile viewports, unless slug is /search */}
            <div className={mobileSearchInput ? 'block' : 'hidden'}>
                <div>
                    <label className='text-smart-blue flex lg:hidden justify-center items-center w-full h-24 bg-neutral-900  px-6 md:px-10'>
                        <SearchForm
                            searchQuery={ searchQuery }
                            setSearchQuery={ onSetSearchQuery }
                            handleSearchFormSubmit={ onHandleSearchFormSubmit } 
                            mode={'dark'}
                        />
                    </label>
                </div>
            </div>
            {menu.map((el) => (
                <div className={mobileNav ? 'px-6 bg-black ' : 'hidden'} key={el.id}>
                    <Accordion primary={el.label} secondary={el.menuItems} onToggleNav={onToggleMobileNav}/>
                </div>
            ))}
            <div
                onClick={() => {onSetMobileNav(false), onSetModalOpen(true)}} 
                className={mobileNav ? 'text-smart-blue px-6 text-2xl mt-6 cursor-pointer' : 'hidden'}
            >
                Subscribe
            </div>
            <div  className={mobileNav ? 'text-smart-blue px-6 text-2xl mt-6 cursor-pointer' : 'hidden'}>
                <a href={'/contact-us'}>
                    Contact Us
                </a>
            </div>
        </div>
    )
}