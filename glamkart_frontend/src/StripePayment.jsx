import React, {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";
import "./StripePayment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    "pk_test_51R6YCxE3fnDexesqHiIuZg2Dsx9VdEzZCnZRvCaRquBEjZ4RWHjKkCeosYtQBT7fszyJcxkHUOnhgwiTSPEicmJe00xeMm5OMK"
);

export default function StripePayment({customerData}) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customerData),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="StripePayment" height="100%" width="100%">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm/>
                </Elements>
            )}
        </div>
    );
}
