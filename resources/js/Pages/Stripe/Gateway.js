import React, { useState, useEffect } from 'react'
import Authenticated from '@/Layouts/Authenticated';
import { Head, usePage } from '@inertiajs/inertia-react';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '@/Components/CheckoutForm';
import axios from 'axios'


const Gateway = (props) => {
    const { app } = usePage().props;
    const [clientSecret, setClientSecret] = useState(null);
    useEffect(() => {

        const getClientSecret = async () => {
            const { data } = await axios.post(`/stripe-payment`);
            // console.log(data)
            setClientSecret(data.paymentIntent);
        };

        getClientSecret();

    }, []);

    const appearance = {
        theme: 'stripe',
        variables: {
          colorPrimary: '#d2118e',
        },
      };

    const stripePromise = loadStripe(app.Stripe_key)

    const options = {
        clientSecret,
        appearance,
      };

    // console.log(name)
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Checkout</h2>}
        >
            <Head title="Checkout" />
            <div className="mt-10 py-10 border-t border-gray-300 flex justify-center">
                <div className="w-1/2">
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
                        </Elements>
                    )}

                </div>
            </div>

        </Authenticated>
    )
}

export default Gateway
