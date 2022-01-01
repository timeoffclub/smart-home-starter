import { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBadgeCheck, faWindowClose, faSpinner } from '@fortawesome/pro-regular-svg-icons'

// Hook
function useLockBodyScroll() {
    useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
    }, []); // Empty array ensures effect is only run on mount and unmount
}

export default function NewsletterModal({ onClose }) {
    useLockBodyScroll()

    const [email, setEmail] = useState('')
    const [state, setState] = useState('IDLE')
    const [errorMessage, setErrorMessage] = useState(null)

    const subscribe = async () => {
        setState('LOADING')
        setErrorMessage(null)

        try {
            const response = await axios.post('../api/newsletter', { email })
            setState('SUCCESS')
        } catch (e) {
            setErrorMessage(e.response.data.error)
            setState('ERROR')
        }
    }

    return (
        <div className='absolute w-screen h-screen bg-black/50 z-50'>
            <div className='relative top-40 md:top-8 sm:mx-auto text-xl text-sky-600 bg-black py-8 w-full sm:w-[500px]'>
                <FontAwesomeIcon 
                    className='cursor-pointer absolute top-4 right-4'
                    icon={faWindowClose}
                    onClick={onClose}
                />
                <div className='mx-6 md:mx-20'>
                    <div className='w-full'>
                        <div className='flex flex-wrap justify-center'>
                                {state === 'IDLE' && 
                                    <div className='text-sky-600 text-bold text-center text-4xl mb-6'>
                                        Sign up for our newsletter for news, deals and other stuff
                                    </div>
                                }
                                {state === 'LOADING' && 
                                    <div className='flex items-center text-white text-bold text-center text-4xl mb-6 h-44'>
                                        <FontAwesomeIcon className='fa-spin' icon={faSpinner}/>
                                    </div>
                                }
                                {state === 'SUCCESS' &&
                                    <div className='flex flex-wrap justify-center'>
                                        <div className='text-5xl mb-6'>
                                            <FontAwesomeIcon className='text-white' icon={faBadgeCheck}/>
                                        </div>
                                        <div className='text-sky-600 text-bold text-center text-4xl mb-6'>
                                            You&apos;ve been added to our list. See ya soon!
                                        </div>
                                    </div>
                                }
                                {state === 'ERROR' && (
                                    <div className='flex items-center text-white text-base mt-2 mb-5 h-44'>
                                        {errorMessage}
                                    </div>
                                )}
                            <input
                                type='email'
                                className='bg-white w-full pl-2 h-10 appearance-none'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div
                                className='bg-sky-600 text-white text-lg text-bold w-fit cursor-pointer px-7 py-2 mt-2 appearance-none'
                                type='button'
                                disabled={state === 'LOADING'}
                                onClick={subscribe}
                            >
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}