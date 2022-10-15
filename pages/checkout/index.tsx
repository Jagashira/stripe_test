
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useRouter } from "next/router"


let stripePromise: any;

const getStripe = () => {
    if (!stripePromise) {
        const API_KEY = ""
        console.log(API_KEY)
        {/* @ts-ignore */ }
        stripePromise = loadStripe(API_KEY);
    }
    return stripePromise;
};

const Checkout = () => {
    const router = useRouter();
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const item = {
        price: "price_1Lt0TVE8HxTVbMcFmtNPqiHI",
        quantity: 1
    };
    const url = "http://localhost:3000/"
    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${url}${router.pathname}/Success`,
        cancelUrl: `${url}${router.pathname}/Cancel`
    };
    const redirectToCheckout = async () => {
        setLoading(true);
        console.log("redirectToCheckout");

        const stripe = await getStripe();
        {/* @ts-ignore */ }
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe Checkout error", error);

        if (error) setStripeError(error.message);
        setLoading(false);
    };
    if (stripeError) alert(stripeError);
    return (
        <div className="checkout">
            <h1>Stripe Checkout</h1>
            <p className="checkout-title">Design+Code React Hooks Course</p>
            <p className="checkout-description">
                Learn how to build a website with React Hooks
            </p>
            <h1 className="checkout-price">$19</h1>

            <button
                className="checkout-button"
                onClick={redirectToCheckout}
                disabled={isLoading}
            >
                <div className="grey-circle">


                </div>
                <div className="text-container">
                    <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
                </div>
            </button>
        </div>
    );
};

export default Checkout;
