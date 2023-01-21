import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import gif from '../../Assets/Spinner-1s-104px.svg'
const CheckoutFormA = ({ paymentData }) => {
  console.log(paymentData)
  const [user] = useAuthState(auth);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");

  let amount = paymentData?.price
  useEffect(() => {
    if (amount) {
      fetch(
        "https://ford-server.onrender.com/create-payment-intent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [amount]);

  // if (setProcessing === false) {
  //   return <Loading></Loading>
  // }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confrim card payment
    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setSuccess("");
      setProcessing(false);
    } else {
      const status = "paid"
      const update = { status }
      const url = `https://ford-server.onrender.com/orders/paid/${paymentData._id}`
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'

        },
        body: JSON.stringify(update)

      })

        .then(res => res.json())
        .then(data => {
          console.log('success', data);
          // alert('Quantity updated successfully');

        })
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      toast.success(`Congrats! Your Payment is completed`);
      setSuccess(`Congrats! Your Payment is completed`);
      setProcessing(false);
      event.target.reset();
    }
  }

  return (
    <>
      <form
        className="p-0"
        style={{ display: "inline" }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5 ">
          <div>
            <label style={{ fontSize: "20px" }} className="text-secondary ">
              Email
            </label>
            <input

              type="email" defaultValue={user?.email} readOnly
              placeholder="Your Email Address"
              className="border-rounded border-2 text-primary text-xl bg-transparent border-primary rounded-lg my-3 input-md  w-full max-w-2xl block "
            />
          </div>
          <div>
            <div>
              <label style={{ fontSize: "20px" }} className="text-secondary ">
                Amount
              </label>
              <input

                type="number"
                defaultValue={paymentData?.price} readOnly
                placeholder="Amount"
                className="border-rounded border-2 bg-transparent border-primary rounded-lg text-xl  my-3 input-md  w-full max-w-2xl block text-primary"
              />
            </div>
          </div>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#E62E5F",
                "::placeholder": {
                  color: "#E62E5F",
                },
              },
              invalid: {
                color: "yellow",
              },
            },
          }}
        />

        <div className="mt-10 mb-5">
          <button className="btn text-white btn-primary" type="submit" disabled={!stripe}>
            Pay
          </button>
        </div>
      </form>

      {processing && (
        <div className="mx-auto"><img src={gif} alt="" /></div>

      )}
      {cardError && <p style={{ color: "red" }}>{cardError}</p>}
      {success && (
        <div style={{ color: "green" }}>
          <p> {success}</p>
          <p>
            Your TransactionId:{" "}
            <span className="text-primary font-bold">{transactionId}</span>
          </p>
        </div>
      )}

    </>
  );
};

export default CheckoutFormA;
