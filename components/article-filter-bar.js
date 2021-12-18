import { useState } from 'react'
import styles from './article-filter-bar.module.css'

export default function ArticleFilterBar ({ myMenu, myCategory, onFilter }) {
    const tabsPaginate = 7;
    const [moreTabs, setMoreTabs] = useState(
        "none"
    )
    const toggleMoreTabs = () => {
        moreTabs === "none" ? setMoreTabs("block") : setMoreTabs("none")
    }
    const [activeTab, setActiveTab] = useState(
        "All"
    )
    return (
        <>
            <div className="container">
                <div className={styles.filterHeading}>
                    More {myCategory} Articles
                </div>
                <div onClick={() => {onFilter("All"); setActiveTab("All"); setMoreTabs("none")}} className={activeTab !== "All" ? styles.filterTab : styles.activeFilterTab}>
                    All
                </div>
                {myMenu.slice(0,tabsPaginate).map((tab) => (
                    tab.label !== myCategory &&
                    <div onClick={() => {onFilter(tab.label); setActiveTab(tab.label); setMoreTabs("none")}} key={tab.label} className={activeTab !== tab.label ? styles.filterTab : styles.activeFilterTab}>
                        {tab.label}
                    </div>
                ))}
                {myMenu.length > tabsPaginate && 
                    <div className={styles.filterSelect}>
                        <div onClick={() => toggleMoreTabs()} className={styles.filterTab}>
                            More...
                        </div>
                        <div className={styles.filterOptions}>
                            {myMenu.slice(tabsPaginate).map((tab) => (
                                tab.label !== myCategory &&
                                <option onClick={() => {toggleMoreTabs(); onFilter(tab.label); setActiveTab(tab.label)}} style={{display: moreTabs}} key={tab.label} className={activeTab !== tab.label ? styles.filterOption : styles.activeFilterOption}>
                                    {tab.label}
                                </option>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}