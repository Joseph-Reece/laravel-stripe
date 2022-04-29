import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

const SetupForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        const response = await stripe.confirmSetup({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: 'http://localhost:8000/profile'
            }
        })

        if (response.error) {
            setErrorMessage(response.error.message)
        }
        else {
            window.location.reload(true)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe}
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
            >Submit</button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    )
}

export default SetupForm
