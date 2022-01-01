import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
    const FORM_KEY = process.env.NEXT_PUBLIC_FORM
    const [state, handleSubmit] = useForm(FORM_KEY)
    
    if (state.succeeded) {
        return <p>Thanks for your submission!</p>
    }
    
    return (
        <form className='flex flex-wrap justify-start w-full' onSubmit={handleSubmit}>
            <div className='w-full mb-3'>
                <label className='w-full' htmlFor='email'>Email Address: </label>
                <input className='w-full bg-gray-200 h-10 appearance-none' id='email' type='email' name='email' />
                <ValidationError prefix='Email' field='email' errors={state.errors} />
                <ValidationError errors={state.errors} />
            </div>
            <div className='w-full mb-3'>
                <label className='w-full' htmlFor='message'>Message: </label>
                <textarea className='w-full bg-gray-200 h-48 appearance-none' id='message' name='message' />
                <ValidationError prefix='Message' field='message' errors={state.errors} />
            </div>
                <button className='bg-sky-600 text-white text-lg text-bold w-fit cursor-pointer px-7 py-2 appearance-none' type='submit' disabled={state.submitting}>
                    Submit
                </button>
        </form>
    )
}