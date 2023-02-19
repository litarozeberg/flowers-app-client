import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PayPalPage = () => {
  const { stp } = useParams();
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: stp,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
            toast.success("Payment passed successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              await axios.delete("/carts/paypal", {
                headers: { Authorization: `${localStorage.getItem("token")}` },
              });
        },
        onError: (err) => {
        },
      })
      .render(paypal.current);
  }, []);

  return <div ref={paypal} className="text-center my-4"></div>;
};

export default PayPalPage;
