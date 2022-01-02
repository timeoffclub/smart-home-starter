export default function Custom404() {
    return (
        <div className='container px-6 xl:px-0'>
            <div className='flex items-center justify-center h-screen'>
                <div className='flex items-center'>
                    <div className='font-display text-sky-600 text-7xl pr-8 border-r-2 border-r-black'>
                        404
                    </div>
                    <div className='pl-8 text-center'>
                        <div>
                            Hey, there, time traveler. This page doesn&apos;t exist... yet. Click <a href='/' className='text-sky-600'>here</a> to go home,
                            or just hit the back button.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}