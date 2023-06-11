import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_Payment);
const Payment = () => {
  const { loading } = useAuth();
  const id = useParams();
  // console.log(id);
  const [axiosSource] = useAxios();

  const { data: card = [] } = useQuery({
    queryKey: ["card", id],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSource(`/cards/single/${id.id}`);
      // console.log(res.data);
      return res.data;
    },
  });

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-3xl font-bold my-5 ">
        Payment total: ${card?.price}
      </h3>
      <Elements stripe={stripePromise}>
        <CheckOut item={card} price={parseFloat(card?.price).toFixed(2)} />
      </Elements>
    </section>
  );
};

export default Payment;
