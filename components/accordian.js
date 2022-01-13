import { useState } from 'react'
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown'
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp'
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight'
import { kebabCase } from '../lib/utils'

export default function Accordion({primary, secondary, onToggleNav}) {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => {
        setIsShowing(!isShowing);
    };

    return (
        <div>
            <div
                onClick={toggle}
                className={
                    isShowing ? 
                        'flex text-white tracking-wider justify-between items-end  h-20' 
                    : 
                        'flex text-white tracking-wider justify-between items-end border-b border-b-white h-20'}
            >
                <div className='text-white pb-3'>
                        <div className='flex items-center'>
                            <div  className={isShowing ? 'text-smart-blue text-xl mr-3' : 'hidden'}>
                                <FaArrowRight />
                            </div>
                            <div className='text-xl'>
                                {primary}
                            </div>
                        </div>
                </div>
                <div className={isShowing ? 'hidden' : 'text-smart-blue font-light pb-3 text-2xl'}>
                    <FaChevronDown/>
                </div>
                <div className={isShowing ? 'text-smart-blue font-light pb-3 text-2xl' : 'hidden'}>
                <FaChevronUp />
                </div>
            </div>
            <div className='ml-8'>
                    {secondary.map((el) => (
                        <div className={isShowing ? 'h-fit text-white text-xl py-2 transition-all ease-in-out duration-400' : 'h-0 transition-all ease-in-out duration-400'} key={el.id}>
                            <a href={`../category/${kebabCase(el.label)}`} onClick={onToggleNav}>
                                {el.label}
                            </a>
                        </div>
                    ))}
            </div>
        </div>
    )
}
