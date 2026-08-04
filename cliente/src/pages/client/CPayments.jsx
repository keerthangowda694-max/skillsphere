import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import API from "../../services/api";

import {
    FaWallet,
    FaMoneyBillWave,
    FaCheckCircle,
    FaClock,
    FaUndo,
    FaUser,
    FaProjectDiagram,
    FaSyncAlt
} from "react-icons/fa";


const Payments = () => {


    const [payments,setPayments] = useState([]);

    const [loading,setLoading] = useState(true);

    const [processing,setProcessing] = useState(null);



    useEffect(()=>{

        loadPayments();

    },[]);





    const loadPayments = async()=>{

        try{


            setLoading(true);


            const res = await API.get(
                "/payment/client"
            );


            if(res.data.success){

                setPayments(
                    res.data.payments || []
                );

            }


        }
        catch(error){

            console.log(
                error.response?.data || error
            );

        }
        finally{

            setLoading(false);

        }

    };









    const releasePayment = async(paymentId)=>{


        try{


            setProcessing(paymentId);



            const res = await API.put(

                `/payment/release/${paymentId}`

            );


            alert(
                res.data.message
            );


            loadPayments();


        }
        catch(error){


            alert(

                error.response?.data?.message ||
                "Release failed"

            );


        }
        finally{

            setProcessing(null);

        }


    };









    const refundPayment = async(paymentId)=>{


        const confirmRefund =
        window.confirm(
            "Are you sure you want to refund?"
        );


        if(!confirmRefund)
        return;



        try{


            setProcessing(paymentId);



            const res = await API.put(

                `/payment/refund/${paymentId}`

            );


            alert(
                res.data.message
            );


            loadPayments();



        }
        catch(error){


            alert(

                error.response?.data?.message ||
                "Refund failed"

            );


        }
        finally{

            setProcessing(null);

        }


    };









    const totalAmount =
    payments.reduce(
        (sum,p)=>sum+p.amount,
        0
    );


    const escrowAmount =
    payments
    .filter(
        p=>p.status==="Escrow"
    )
    .reduce(
        (sum,p)=>sum+p.amount,
        0
    );


    const releasedAmount =
    payments
    .filter(
        p=>p.status==="Released"
    )
    .reduce(
        (sum,p)=>sum+p.amount,
        0
    );



    const refundedAmount =
    payments
    .filter(
        p=>p.status==="Refunded"
    )
    .reduce(
        (sum,p)=>sum+p.amount,
        0
    );








    if(loading){


        return(

            <ClientLayout>

                <div className="
                p-10
                text-center
                text-xl
                ">

                    Loading Payments...

                </div>


            </ClientLayout>

        );

    }










return(


<ClientLayout>


<div className="p-8">





<div className="
flex
justify-between
items-center
mb-8
">


<h1 className="
text-4xl
font-bold
flex
items-center
gap-3
">

<FaWallet/>

Payment Dashboard

</h1>



<button

onClick={loadPayments}

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
hover:bg-blue-700
"

>

<FaSyncAlt/>

Refresh

</button>



</div>









{/* STATISTICS */}


<div className="
grid
md:grid-cols-4
gap-6
mb-10
">



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<p className="text-gray-500">

Total Payment

</p>

<h2 className="
text-3xl
font-bold
mt-2
">

₹{totalAmount}

</h2>


</div>







<div className="
bg-yellow-50
shadow
rounded-2xl
p-6
">


<p className="text-yellow-700">

Escrow

</p>


<h2 className="
text-3xl
font-bold
">

₹{escrowAmount}

</h2>


</div>








<div className="
bg-green-50
shadow
rounded-2xl
p-6
">


<p className="text-green-700">

Released

</p>


<h2 className="
text-3xl
font-bold
">

₹{releasedAmount}

</h2>


</div>







<div className="
bg-red-50
shadow
rounded-2xl
p-6
">


<p className="text-red-700">

Refunded

</p>


<h2 className="
text-3xl
font-bold
">

₹{refundedAmount}

</h2>


</div>




</div>









{
payments.length===0 ?


<div className="
bg-white
rounded-2xl
shadow
p-12
text-center
">


<FaWallet

className="
mx-auto
text-6xl
text-gray-300
mb-5
"

/>


<h2 className="
text-2xl
font-bold
">

No Payments Found

</h2>


<p className="
text-gray-500
mt-2
">

Payments will appear after hiring freelancer.

</p>



</div>



:





<div className="
grid
lg:grid-cols-2
gap-6
">



{

payments.map(payment=>(


<div

key={payment._id}

className="
bg-white
rounded-2xl
shadow-lg
p-6
hover:shadow-xl
transition
"


>




<div className="
flex
justify-between
items-center
">


<h2 className="
text-xl
font-bold
flex
gap-2
items-center
">


<FaProjectDiagram/>


{
payment.project?.title
}


</h2>




<span

className={`
px-4
py-2
rounded-full
font-bold
text-sm

${
payment.status==="Released"

?
"bg-green-100 text-green-700"

:

payment.status==="Escrow"

?

"bg-yellow-100 text-yellow-700"

:

payment.status==="Refunded"

?

"bg-red-100 text-red-700"

:

"bg-gray-100 text-gray-700"

}

`}

>

{payment.status}

</span>



</div>









<div className="
mt-5
space-y-3
">


<p className="
flex
gap-3
items-center
">

<FaUser/>

{payment.freelancer?.fullName}


</p>




<p className="
flex
gap-3
items-center
">

<FaMoneyBillWave/>

Amount:

<b>
₹{payment.amount}
</b>

</p>




<p>

Platform Fee:

<b>
₹{payment.platformFee}
</b>

</p>



<p>

Freelancer Receives:

<b className="text-green-600">

₹{payment.freelancerAmount}

</b>

</p>




<p className="
flex
gap-3
items-center
text-gray-500
">

<FaClock/>

{
new Date(
payment.createdAt
)
.toLocaleDateString()
}

</p>


</div>









{
payment.status==="Escrow" &&


<div className="
flex
gap-4
mt-6
">


<button

disabled={
processing===payment._id
}

onClick={()=>releasePayment(payment._id)}

className="
flex-1
bg-green-600
text-white
py-3
rounded-xl
flex
justify-center
gap-2
"

>

<FaCheckCircle/>

Release

</button>




<button

disabled={
processing===payment._id
}

onClick={()=>refundPayment(payment._id)}

className="
flex-1
bg-red-600
text-white
py-3
rounded-xl
flex
justify-center
gap-2
"

>

<FaUndo/>

Refund

</button>



</div>


}









{
payment.status==="Released" &&

<div className="
mt-5
bg-green-50
text-green-700
p-4
rounded-xl
text-center
font-bold
">

✅ Payment Released Successfully

</div>

}







{
payment.status==="Refunded" &&

<div className="
mt-5
bg-red-50
text-red-700
p-4
rounded-xl
text-center
font-bold
">

Payment Refunded

</div>

}




</div>


))


}



</div>


}




</div>


</ClientLayout>


);


};


export default Payments;