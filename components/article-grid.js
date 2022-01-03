import Image from 'next/image'

export default function ArticleGrid ({ myArticles, myCategory }) {

    return (
        <>
            <div className='container px-5 xl:px-0 mb-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {myArticles.map((el, index) => (
                        <div key={el.id}>
                            {(index !== 0 && index % 7 === 0) ?
                                <div className='bg-gray-200 h-72' key={index}>
                                    AD
                                </div>
                                :
                                <div className='h-80'>
                                    {el.featuredImage &&
                                        <a href={`../${el.slug}`}>
                                            <div className='relative h-44 mb-3'>
                                                <Image 
                                                    src={el.featuredImage.node.sourceUrl}
                                                    alt={el.featuredImage.node.altText}
                                                    objectFit='cover'
                                                    layout='fill'
                                                    placeholder='blur'
                                                    // Work-around for no out-of-box dataUrl
                                                    blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                                />
                                            </div>
                                        </a>
                                    }
                                    <div>
                                        <div className='text-lg mb-3'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className='text-sky-600'>
                                            {el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a className='text-base font-semibold text-sky-600 hover:text-blue-500 uppercase tracking-wider' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>     
        </>
    )
}
