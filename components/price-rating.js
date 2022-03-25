import { FaDollarSign } from '@react-icons/all-files/fa/FaDollarSign'

export default function PriceRating({ priceCount }) {
    return (
        <>
            {priceCount === 1 &&
                <div className='flex lg:text-lg'>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-gray-500'/>
                    <FaDollarSign className='text-gray-500'/>
                    <FaDollarSign className='text-gray-500'/>
                </div>
            }
            {priceCount === 2 &&
                <div className='flex lg:text-lg'>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-gray-500'/>
                    <FaDollarSign className='text-gray-500'/>
                </div>
            }
            {priceCount === 3 &&
                <div className='flex lg:text-lg'>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-gray-500'/>
                </div>
            }
            {priceCount === 4 &&
                <div className='flex lg:text-lg'>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-black'/>
                    <FaDollarSign className='text-black'/>
                </div>
            }
        </>
    )
}