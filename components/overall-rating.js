import { IoMdStarOutline } from '@react-icons/all-files/io/IoMdStarOutline'
import { IoMdStarHalf } from '@react-icons/all-files/io/IoMdStarHalf'
import { IoMdStar } from '@react-icons/all-files/io/IoMdStar'

export default function OverallRating({starCount}) {
    
    return (
        <>
            {starCount === '.5' &&
                <div className='flex text-smart-blue lg:text-2xl'>
                    <IoMdStarHalf/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '1' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '1.5' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStarHalf/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '2' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '2.5' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStarHalf/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '3' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStarOutline/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '3.5' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStarHalf/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '4' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStarOutline/>
                </div>
            }
            {starCount === '4.5' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStarHalf/>
                </div>
            }
            {starCount === '5' &&
                <div className='flex text-smart-blue text-xl lg:text-2xl'>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                    <IoMdStar/>
                </div>
            }
        </>
    )
}