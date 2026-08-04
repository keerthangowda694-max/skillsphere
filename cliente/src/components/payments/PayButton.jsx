import { useState } from "react";
import API from "../../services/api";


const PayButton = ({ projectId, amount }) => {

    const [loading,setLoading] = useState(false);


    const makePayment = async()=>{

        try{

            setLoading(true);


            // 1. Create Razorpay Order

            const res = await API.post(
                "/payment/create",
                {
                    projectId,
                    amount
                }
            );


            const {
                order,
                payment
            } = res.data;



            // 2. Razorpay Options

            const options = {

                key:
                import.meta.env.VITE_RAZORPAY_KEY_ID,


                amount:
                order.amount,


                currency:
                order.currency,


                name:
                "SkillSphere",


                description:
                "Freelancer Payment",


                order_id:
                order.id,


                handler:
                async function(response){


                    // 3. Verify Payment

                    await API.post(
                        "/payment/verify",
                        {

                        razorpay_order_id:
                        response.razorpay_order_id,


                        razorpay_payment_id:
                        response.razorpay_payment_id,


                        razorpay_signature:
                        response.razorpay_signature

                        }
                    );


                    alert(
                        "Payment Successful"
                    );


                    window.location.reload();


                },


                theme:{

                    color:"#2563eb"

                }


            };



            const razor =
            new window.Razorpay(options);


            razor.open();



        }
        catch(err){

            console.log(
                err.response?.data || err
            );


            alert(
                "Payment Failed"
            );

        }
        finally{

            setLoading(false);

        }

    };



    return(

        <button

        onClick={makePayment}

        disabled={loading}

        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        py-3
        rounded-xl
        "

        >

        {
            loading
            ?
            "Processing..."
            :
            `Pay ₹${amount}`
        }


        </button>

    );

};


export default PayButton;