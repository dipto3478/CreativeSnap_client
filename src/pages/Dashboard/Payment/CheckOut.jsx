import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment/moment";

const CheckOut = ({ price, item }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [axiosSource] = useAxios();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const [process, setProcess] = useState(false);
  const [txnId, setTxnId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosSource.post("/create-payment-intent", { price }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSource]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[paymentMethod]", paymentMethod);
      setCardError("");
    }

    setProcess(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unKnown",
            email: user?.email || "unKnown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    setProcess(false);

    if (paymentIntent.status === "succeeded") {
      const date = new Date();
      const formattedDate = moment(date).format("MMMM Do, YYYY, h:mm:ss A");
      // console.log(formattedDate);
      const txnId = paymentIntent.id;
      setTxnId(txnId);
      const payment = {
        email: user?.email,
        price,
        date: formattedDate,
        class_Id: item?.class_Id,
        title: item?.title,
        instructor_email: item?.instructor_email,
        instructor_img: item?.instructor_img,
        instructor_name: item?.instructor_name,
        itemId: item?._id,
        Available_seats: item?.Available_seats,
      };
      axiosSource.post("/payment", payment).then((res) => {
        navigate("/dashboard/myclasses");
        toast.success("successful payment");
        console.log(res.data);
      });
    }
  };
  return (
    <form className="w-[500px]" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-black font-bold my-3 rounded-lg text-lg px-3 py-1 text-white"
        type="submit"
        disabled={!stripe || !clientSecret || process}
      >
        Pay
      </button>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {txnId && <p className="text-green-500">completed TxnId: {txnId}</p>}
    </form>
  );
};

export default CheckOut;
