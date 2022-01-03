import Image from 'next/image'

export default function FeaturedCategory ({ myArticles, myCategory }) {
    let featuredArticle
    myArticles.length > 0 ? featuredArticle = myArticles[0] : null

    return (
        <>  
            {!featuredArticle ?
                <div className='container'>
                    There appears to be nothing here...
                </div>
                :
                <div className='container mb-12'>
                    <div className='block lg:grid grid-cols-1 lg:grid-cols-4 lg:gap-5'>
                        <div className='relative lg:col-span-2 mb-3 lg:mb-0'>
                            {featuredArticle.featuredImage &&
                                <div className='relative h-80'>
                                    <Image
                                        src={featuredArticle.featuredImage.node.sourceUrl}
                                        alt={featuredArticle.featuredImage.node.altText}
                                        objectFit='cover'
                                        layout='fill'
                                        priority
                                        blurDataURL={`/_next/image?url=${featuredArticle.featuredImage.node.sourceUrl}&w=16&q=1`}
                                    />
                                </div>
                            }
                            <div className='absolute top-0 bottom-0 w-full h-full bg-opacity-60 bg-black'>
                            </div>
                            <div className='absolute left-0 bottom-0 group:w-full pb-5 px-5'>
                                <a href={`../${featuredArticle.slug}`}>
                                    <div className='text-3xl text-white font-medium pb-2 tracking-wider'>
                                        {featuredArticle.title}
                                    </div>
                                </a>
                                {featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                    <span key={cat.node.id} className='text-sky-600 text-lg font-semibold uppercase tracking-wider'>
                                        <a href={`../category/${cat.node.slug}`} className='text-sky-600 font-semibold hover:text-blue-500'>{cat.node.name}</a> {index < (featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className='flex px-5 lg:px-0 flex-col justify-between col-span-2'>
                            {myArticles.slice(1,4).map((el, index) => (
                                <div key={el.id} className='flex items-center mb-3 lg:mb-0'>
                                    {el.featuredImage &&
                                        <a href={`../${el.slug}`} className='relative shrink-0 w-24 h-24'>
                                            <Image
                                                src={el.featuredImage.node.sourceUrl}
                                                alt={el.featuredImage.node.altText}
                                                layout='fill'
                                                objectFit='cover'
                                                blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                            />
                                        </a>
                                    }
                                    <div className='ml-2'>
                                        <div className='text-xl font-medium mb-2'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className='text-sky-600 text-base font-medium uppercase tracking-wider'>
                                            {el.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a className='text-sky-600 font-semibold hover:text-blue-500' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='sm:grid px-5 lg:px-0 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-[300px]  gap-5 mt-5'>
                        {myArticles.slice(5,14).map((el) => (
                            <div key={el.id} className='flex flex-col justify-start min-h-[50px] sm:h-fit text-lg basis-80 font-medium mb-2'>
                                <div className='mb-2 '>
                                    <a href={`../${el.slug}`}>
                                        {el.title}
                                    </a>
                                </div>
                                <div className='text-sky-600 text-base font-medium uppercase tracking-wider'>
                                    {el.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                        <span key={cat.node.id}>
                                            <a className='text-sky-600 font-semibold hover:text-blue-500' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div  key='ad' className='bg-gray-200 h-72 lg:h-auto sm:row-start-6 sm:row-span-1 sm:col-span-2 lg:col-span-1 lg:row-start-1 lg:row-span-3 lg:col-start-4 mt-10 md:mt-0'>
                            AD
                        </div>
                    </div>
                    <div className='lg:grid px-5 lg:px-0 lg:grid-cols-4 gap-5 mt-5'>
                        <div className='flex flex-col col-span-2'>
                            {myArticles.slice(14,16).map((el, index) => (
                                <div key={el.id} className='inline-flex items-center mb-5'>
                                    {el.featuredImage &&
                                        <a href={`../${el.slug}`} className='relative w-24 h-24 shrink-0'>
                                            <Image
                                                src={el.featuredImage.node.sourceUrl}
                                                alt={el.featuredImage.node.altText}
                                                layout='fill'
                                                objectFit='cover'
                                                blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                            />
                                        </a>
                                    }
                                    <div className='ml-2'>
                                        <div className='text-xl font-medium mb-2'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className='text-sky-600 text-base font-medium uppercase tracking-wider'>
                                            {el.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a className='text-sky-600 font-semibold hover:text-blue-500' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='lg:hidden grid grid-cols-2 gap-5'>
                            {myArticles.slice(18,20).map((el) => (
                                <div key={el.id} className='col-span-2  sm:col-span-1 inline-flex flex-wrap sm:w-72 md:w-full mb-5'>
                                    {el.featuredImage &&
                                        <a href={`../${el.slug}`} className='relative w-full h-48 mb-3'>
                                            <Image 
                                                src={el.featuredImage.node.sourceUrl}
                                                alt={el.featuredImage.node.altText}
                                                objectFit='cover'
                                                layout='fill'
                                                blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                            />
                                        </a>
                                    }
                                    <div className='border-l-4 border-l-sky-600/0'>
                                        <div className='text-lg mb-3'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className='text-base text-sky-600'>
                                            {el.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a className='text-sky-600 font-semibold' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {myArticles.slice(17,19).map((el) => (
                            <div key={el.id} className='hidden lg:inline-flex flex-wrap sm:w-72 lg:w-full mb-5'>
                                {el.featuredImage &&
                                    <a href={`../${el.slug}`} className='relative w-full h-56 mb-3 '>
                                        <Image 
                                            src={el.featuredImage.node.sourceUrl}
                                            alt={el.featuredImage.node.altText}
                                            objectFit='cover'
                                            layout='fill'
                                            blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                        />
                                    </a>
                                }
                                <div className='border-l-4 border-l-sky-600/0'>
                                    <div className='text-lg mb-3'>
                                        <a href={`../${el.slug}`}>
                                            {el.title}
                                        </a>
                                    </div>
                                    <div className='text-base text-sky-600'>
                                        {el.categories.edges.filter((e) => e.node.name !== myCategory).map((cat, index) => (
                                            <span key={cat.node.id}>
                                                <a className='text-sky-600 font-semibold uppercase' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory).length - 1) ? <span>| </span> : <span></span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
