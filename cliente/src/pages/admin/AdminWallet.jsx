import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";

import {
    FaWallet,
    FaMoneyBillWave,
    FaArrowDown,
    FaCheckCircle
} from "react-icons/fa";


const AdminWallet = () => {


    const [wallet,setWallet] = useState({
        balance:0,
        totalEarned:0,
        withdrawn:0
    });


    const [amount,setAmount] = useState("");

    const [loading,setLoading] = useState(false);



    useEffect(()=>{

        loadWallet();

    },[]);





    const loadWallet = async()=>{

        try{

            const res = await API.get(
                "/admin/wallet"
            );


            setWallet(
                res.data.wallet
            );


        }
        catch(err){

            console.log(
                err.response?.data || err
            );

        }

    };







    const withdraw = async()=>{


        if(!amount){

            alert(
                "Enter withdrawal amount"
            );

            return;

        }



        try{


            setLoading(true);



            const res = await API.post(
                "/admin/wallet/withdraw",
                {
                    amount:Number(amount)
                }
            );



            alert(
                res.data.message
            );


            setAmount("");

            loadWallet();



        }
        catch(err){

            alert(
                err.response?.data?.message ||
                "Withdrawal failed"
            );

        }
        finally{

            setLoading(false);

        }


    };







return(


<AdminLayout>


<div className="p-8">


<h1 className="
text-4xl
font-bold
mb-8
flex
items-center
gap-3
">

<FaWallet/>

Platform Wallet

</h1>





<div className="
grid
md:grid-cols-3
gap-6
">


<div className="
bg-blue-600
text-white
rounded-2xl
p-6
shadow-lg
">


<div className="
flex
justify-between
items-center
">

<h2 className="font-semibold">

Available Balance

</h2>


<FaWallet className="text-3xl"/>


</div>



<p className="
text-4xl
font-bold
mt-4
">

₹{wallet.balance || 0}

</p>


</div>







<div className="
bg-green-600
text-white
rounded-2xl
p-6
shadow-lg
">


<div className="
flex
justify-between
items-center
">


<h2 className="font-semibold">

Total Earned

</h2>


<FaMoneyBillWave className="text-3xl"/>


</div>



<p className="
text-4xl
font-bold
mt-4
">

₹{wallet.totalEarned || 0}

</p>



</div>








<div className="
bg-purple-600
text-white
rounded-2xl
p-6
shadow-lg
">


<div className="
flex
justify-between
items-center
">


<h2 className="font-semibold">

Withdrawn

</h2>


<FaArrowDown className="text-3xl"/>


</div>



<p className="
text-4xl
font-bold
mt-4
">

₹{wallet.withdrawn || 0}

</p>



</div>


</div>









<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-10
max-w-xl
">


<h2 className="
text-2xl
font-bold
mb-5
">

Withdraw Platform Fee

</h2>




<input

type="number"

placeholder="Enter amount"

className="
w-full
border
rounded-xl
p-4
mb-5
"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>





<button

disabled={loading}

onClick={withdraw}

className="
bg-black
text-white
px-8
py-3
rounded-xl
flex
items-center
gap-3
hover:bg-gray-800
"

>


<FaCheckCircle/>

{
loading
?
"Processing..."
:
"Withdraw"
}


</button>



</div>





</div>


</AdminLayout>


);


};


export default AdminWallet;