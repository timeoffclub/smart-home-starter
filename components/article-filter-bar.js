import { useState, useEffect } from 'react'

export default function ArticleFilterBar ({ myMenu, myCategory, onFilter }) {

    const tabsPaginate = 7;
    const [moreTabs, setMoreTabs] = useState(false)

    const toggleMoreTabs = () => {
        setMoreTabs(!moreTabs)
    }

    const [activeTab, setActiveTab] = useState('All')

    return (
        <>
            <div className='container mb-5 px-6 xl:px-0 lg:pb-2 lg:border-b-2 lg:border-b-black lg:border-dashed'>
                <div className='font-semibold text-3xl mb-10 tracking-wider'>
                    More {myCategory} Articles:
                </div>
                <div onClick={() => {onFilter('All'); setActiveTab('All'); setMoreTabs(false)}} className={activeTab !== 'All' ? `inline font-semibold text-2xl tracking-wider px-5 py-1 cursor-pointer` : `inline font-semibold text-2xl text-white bg-black tracking-wider px-5 py-1 cursor-pointer`}>
                    All
                </div>
                {myMenu.slice(0,tabsPaginate).map((tab) => (
                    tab.label !== myCategory &&
                    <div onClick={() => {onFilter(tab.label); setActiveTab(tab.label); setMoreTabs(false)}} key={tab.label} className={activeTab !== tab.label ? `inline-block font-semibold text-2xl tracking-wider px-5 py-1 cursor-pointer pb-0` : `inline font-semibold text-2xl text-white bg-black tracking-wider px-5 py-1 cursor-pointer`}>
                        {tab.label}
                    </div>
                ))}
                {myMenu.length > tabsPaginate && 
                    <div className='inline-block'>
                        <div onClick={() => toggleMoreTabs()} className='font-semibold text-2xl tracking-wider px-5 py-1 cursor-pointer'>
                            More...
                        </div>
                        <div className={moreTabs ? 'absolute block bg-white z-10' : 'hidden absolute bg-white z-50'}>
                            {myMenu.slice(tabsPaginate).map((tab) => (
                                tab.label !== myCategory &&
                                <div onClick={() => {toggleMoreTabs(); onFilter(tab.label); setActiveTab(tab.label)}} key={tab.label} className={activeTab !== tab.label ? `block font-semibold text-2xl tracking-wider px-5 py-1 cursor-pointer` : `block font-semibold text-2xl text-white bg-black tracking-wider px-5 py-1 cursor-pointer`}>
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}