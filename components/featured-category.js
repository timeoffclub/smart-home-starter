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
                                                    className='transition-all ease-in duration-500'                          src={featuredArticle.featuredImage.node.sourceUrl}
                                        alt={featuredArticle.featuredImage.node.altText}
                                        objectFit='cover'
                                        layout='fill'
                                        placeholder='blur'
                                        blurDataURL={`/_next/image?url=${featuredArticle.featuredImage.node.sourceUrl}&w=16&q=1`}
                                    />
                                </div>
                            }
                            <div className='absolute top-0 bottom-0 w-full h-full bg-opacity-60 bg-black'>
                            </div>
                            <div className='absolute left-0 bottom-0 group:w-full pb-5 px-5'>
                                <a href={`../${featuredArticle.slug}`}>
                                    <div className='text-3xl text-white font-semibold pb-2 tracking-wider'>
                                        {featuredArticle.title}
                                    </div>
                                </a>
                                {featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                    <span key={cat.node.id} className='text-smart-blue text-lg font-semibold uppercase tracking-wider'>
                                        <a href={`../category/${cat.node.slug}`} className='text-smart-blue font-semibold hover:text-smart-teal'>{cat.node.name}</a> {index < (featuredArticle.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className='flex px-5 sm:px-0 md:px-6 xl:px-0 flex-col justify-between col-span-2'>
                            {myArticles.slice(1,4).map((el, index) => (
                                <div key={el.id} className='flex items-center mb-3 lg:mb-0'>
                                    {el.featuredImage &&
                                        <a href={`../${el.slug}`} className='relative shrink-0 w-24 h-24'>
                                            <Image 
                                                    className='transition-all ease-in duration-500'                                  src={el.featuredImage.node.sourceUrl}
                                                alt={el.featuredImage.node.altText}
                                                height={96}
                                                width={96}
                                                objectFit='cover'
                                                placeholder='blur'
                                                blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                            />
                                        </a>
                                    }
                                    <div className='ml-2'>
                                        <div className='text-xl font-semibold mb-2 hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
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
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='hidden sm:grid px-5 sm:px-0 md:px-6 xl:px-0 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-[300px]  gap-5 mt-5'>
                        {myArticles.slice(5,14).map((el) => (
                            <div key={el.id} className='flex flex-col justify-start min-h-[50px] sm:h-fit text-lg basis-80 font-semibold mb-2'>
                                <div className='mb-2  hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                    <a href={`../${el.slug}`}>
                                        {el.title}
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
                        <div  key='ad' className='adthrive-ad-container h-72 sm:row-start-1 sm:row-span-3 sm:col-span-1 sm:col-start-2 lg:row-start-1 lg:row-span-3 lg:col-start-3 lg:col-span-2 xl:h-auto xl:col-span-1 xl:row-start-1 xl:row-span-3 xl:col-start-4 mt-10 md:mt-0'>
                        </div>
                    </div>
                    <div className='md:hidden flex px-5 sm:px-0 md:px-6 xl:px-0 flex-col justify-between col-span-2'>
                        {myArticles.slice(5,14).map((el, index) => (
                            <div key={el.id} className='flex items-center mb-3 lg:mb-0'>
                                {el.featuredImage &&
                                    <a href={`../${el.slug}`} className='relative shrink-0 w-24 h-24'>
                                        <Image 
                                                    className='transition-all ease-in duration-500'                              src={el.featuredImage.node.sourceUrl}
                                            alt={el.featuredImage.node.altText}
                                            height={96}
                                            width={96}
                                            objectFit='cover'
                                            placeholder='blur'
                                            blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                        />
                                    </a>
                                }
                                <div className='ml-2'>
                                    <div className='text-xl font-semibold mb-2 hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                        <a href={`../${el.slug}`}>
                                            {el.title}
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

                        <div  key='ad' className='adthrive-ad-container h-72 sm:row-start-1 sm:row-span-3 sm:col-span-1 sm:col-start-2 lg:row-start-1 lg:row-span-3 lg:col-start-3 lg:col-span-2 xl:h-auto xl:col-span-1 xl:row-start-1 xl:row-span-3 xl:col-start-4 mt-10 md:mt-0'>
                        </div>
                    </div>
                    <div className='lg:grid px-5 sm:px-0 md:px-6 xl:px-0 lg:grid-cols-4 gap-5 mt-5'>
                        <div className='flex flex-col col-span-2'>
                            {myArticles.slice(14,16).map((el, index) => (
                                <div key={el.id} className='inline-flex items-center mb-5'>
                                    {el.featuredImage &&
                                        <a href={`../${el.slug}`} className='relative w-24 h-24 shrink-0'>
                                            <Image 
                                                    className='transition-all ease-in duration-500'                                  src={el.featuredImage.node.sourceUrl}
                                                alt={el.featuredImage.node.altText}
                                                height={96}
                                                width={96}
                                                objectFit='cover'
                                                placeholder='blur'
                                                blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                            />
                                        </a>
                                    }
                                    <div className='ml-2'>
                                        <div className='text-xl font-semibold mb-2 hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
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
                                                placeholder='blur'
                                                blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                            />
                                        </a>
                                    }
                                    <div className='border-l-4 border-l-smart-blue/0'>
                                        <div className='text-lg font-semibold mb-3 hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                            <a href={`../${el.slug}`}>
                                                {el.title}
                                            </a>
                                        </div>
                                        <div className='text-base text-smart-blue'>
                                            {el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                                <span key={cat.node.id}>
                                                    <a className='text-smart-blue font-semibold uppercase hover:text-smart-teal' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
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
                                            placeholder='blur'
                                            blurDataURL={`/_next/image?url=${el.featuredImage.node.sourceUrl}&w=16&q=1`}
                                        />
                                    </a>
                                }
                                <div className='border-l-4 border-l-smart-blue/0'>
                                    <div className='text-lg mb-3 font-semibold hover:underline decoration-1 underline-offset-4 decoration-gray-300'>
                                        <a href={`../${el.slug}`}>
                                            {el.title}
                                        </a>
                                    </div>
                                    <div className='text-base text-smart-blue'>
                                        {el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').map((cat, index) => (
                                            <span key={cat.node.id}>
                                                <a className='text-smart-blue font-semibold uppercase hover:text-smart-teal' href={`../category/${cat.node.slug}`}>{cat.node.name}</a> {index < (el.categories.edges.filter((e) => e.node.name !== myCategory && e.node.name !== 'Featured').length - 1) ? <span> | </span> : <span></span>}
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
