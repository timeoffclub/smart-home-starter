import Image from 'next/image'

export default function HomeFeatured({ myArticles, myCategory }) {
    let featuredArticle
    myArticles.length > 0 ? featuredArticle = myArticles[0] : null

    return (
        <div className='container mb-12 px-6  2xl:px-0'>
            <div className='block lg:grid grid-cols-1 lg:grid-cols-4 lg:gap-5'>
                <div className='relative lg:col-span-2 mb-3 lg:mb-0 -mx-6 md:-mx-0'>
                    {featuredArticle.featuredImage &&
                        <div className='relative h-96'>
                            <Image 
                                src={featuredArticle.featuredImage.node.sourceUrl}
                                alt={featuredArticle.featuredImage.node.altText}
                                objectFit='cover'
                                layout='fill'
                                priority
                            />
                        </div>
                    }
                    <div className='absolute top-0 bottom-0 w-full h-full bg-opacity-60 bg-black'>
                    </div>
                    <div className='absolute left-0 bottom-0 group:w-full pb-5 px-6'>
                        <a href={`../${featuredArticle.slug}`}>
                            <div className='text-2xl text-white font-semibold pb-2 tracking-wider'>
                                {featuredArticle.title.replace(/(<([^>]+)>)/gi, "")}
                            </div>
                        </a>
                        {featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                            <span key={cat.node.id} className='text-smart-blue text-md font-semibold uppercase tracking-wider'>
                                <a href={`../category/${cat.node.slug}`} className='text-smart-blue font-semibold hover:text-smart-teal'>{cat.node.name}</a> {index < (featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='hidden md:grid grid-cols-2 md:col-span-2 gap-x-5'>
                    <div className='col-span-2 text-smart-blue font-bold text-2xl tracking-wider mb-5'>
                        Top Articles
                    </div>
                    {myArticles.slice(1,7).map((el) => (
                        <div key={el.id} className='flex flex-col justify-start h-24 text-lg basis-80 font-semibold mb-2'>
                            <div className='mb-2  hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                <a href={`../${el.slug}`}>
                                    {el.title.replace(/(<([^>]+)>)/gi, "")}
                                </a>
                            </div>
                            <div className='text-smart-blue text-base font-semibold uppercase tracking-wider'>
                                {el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                    <span key={cat.node.id}>
                                        <a className='text-smart-blue font-semibold hover:text-smart-teal' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='md:hidden flex flex-col justify-between col-span-2'>
                    <div className='col-span-2 text-smart-blue font-bold text-2xl tracking-wider mb-5'>
                        Top Articles
                    </div>
                    {myArticles.slice(1,7).map((el, index) => (
                        <div key={el.id} className='flex items-center mb-3 lg:mb-0'>
                            {el.featuredImage &&
                                <a href={`../${el.slug}`} className='relative shrink-0 w-24 h-24'>
                                    <Image
                                        src={el.featuredImage.node.sourceUrl}
                                        alt={el.featuredImage.node.altText}
                                        height={96}
                                        width={96}
                                        objectFit='cover'
                                    />
                                </a>
                            }
                            <div className='ml-2'>
                                <div className='text-xl font-semibold mb-2 hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                    <a href={`../${el.slug}`}>
                                        {el.title.replace(/(<([^>]+)>)/gi, "")}
                                    </a>
                                </div>
                                <div className='text-smart-blue text-base font-semibold uppercase tracking-wider'>
                                    {el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                        <span key={cat.node.id}>
                                            <a className='text-smart-blue font-semibold hover:text-smart-teal' href={`../category/${cat.node.slug}`}>
                                                {cat.node.name}
                                            </a>
                                            {index < (el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
                {myArticles.slice(7,11).map((el) => (
                    <div key={el.id} className='inline-flex flex-wrap w-full mb-5'>
                        {el.featuredImage &&
                            <a href={`../${el.slug}`} className='relative w-full h-56 mb-3'>
                                <Image 
                                    src={el.featuredImage.node.sourceUrl}
                                    alt={el.featuredImage.node.altText}
                                    objectFit='cover'
                                    layout='fill'
                                />
                            </a>
                        }
                        <div>
                            <div className='text-lg mb-3  hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                <a href={`../${el.slug}`}>
                                    {el.title.replace(/(<([^>]+)>)/gi, "")}
                                </a>
                            </div>
                            <div className='text-base text-smart-blue'>
                                {el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                    <span key={cat.node.id}>
                                        <a className='text-smart-blue font-semibold uppercase' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}