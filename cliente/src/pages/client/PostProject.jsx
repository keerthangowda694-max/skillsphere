import {useState} from "react";

import API from "../../services/api";

import ClientLayout from "../../components/client/ClientLayout";

import {
    FaPlusCircle
} from "react-icons/fa";



const PostProject = ()=>{


const [form,setForm]=useState({

    title:"",
    description:"",
    category:"",
    requiredSkills:"",
    budgetMin:"",
    budgetMax:"",
    experienceRequired:"",
    deadline:""

});


const [loading,setLoading]=useState(false);





const handleChange=(e)=>{


setForm({

    ...form,

    [e.target.name]:e.target.value

});


};








const createProject=async(e)=>{


e.preventDefault();


try{


setLoading(true);



const res = await API.post(

"/projects/create",

{


title:form.title,


description:form.description,


category:form.category,


requiredSkills:

form.requiredSkills
.split(",")
.map(skill=>skill.trim()),



budgetMin:Number(form.budgetMin),



budgetMax:Number(form.budgetMax),



experienceRequired:
form.experienceRequired,



deadline:form.deadline



}

);




console.log(
res.data
);



alert(
"Project Created Successfully"
);



setForm({

title:"",
description:"",
category:"",
requiredSkills:"",
budgetMin:"",
budgetMax:"",
experienceRequired:"",
deadline:""

});



}
catch(err){


console.log(
err.response?.data || err
);



alert(

err.response?.data?.message ||

"Project creation failed"

);


}

finally{


setLoading(false);


}


};








return(


<ClientLayout>


<div className="p-8">


<h1 className="
text-3xl
font-bold
mb-8
">

Post New Project

</h1>





<form

onSubmit={createProject}

className="
bg-white
rounded-3xl
shadow-xl
p-8
max-w-4xl
"

>


<div className="
grid
md:grid-cols-2
gap-6
">





{/* Title */}

<div>

<label className="font-semibold">

Project Title

</label>


<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Website Development"

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>

</div>







{/* Category */}

<div>

<label className="font-semibold">

Category

</label>


<input

name="category"

value={form.category}

onChange={handleChange}

placeholder="Web Development"

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>







{/* Skills */}

<div>

<label className="font-semibold">

Required Skills

</label>


<input

name="requiredSkills"

value={form.requiredSkills}

onChange={handleChange}

placeholder="React, Node.js, MongoDB"

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>









{/* Experience */}

<div>


<label className="font-semibold">

Experience Required

</label>


<select


name="experienceRequired"


value={form.experienceRequired}


onChange={handleChange}


className="
w-full
border
rounded-xl
p-3
mt-2
"


>


<option value="">

Select Experience

</option>


<option value="Beginner">

Beginner

</option>


<option value="Intermediate">

Intermediate

</option>


<option value="Expert">

Expert

</option>



</select>


</div>









{/* Minimum Budget */}

<div>


<label className="font-semibold">

Minimum Budget ₹

</label>


<input

type="number"

name="budgetMin"

value={form.budgetMin}

onChange={handleChange}

placeholder="5000"

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>









{/* Maximum Budget */}

<div>


<label className="font-semibold">

Maximum Budget ₹

</label>


<input

type="number"

name="budgetMax"

value={form.budgetMax}

onChange={handleChange}

placeholder="10000"

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>









{/* Deadline */}

<div>


<label className="font-semibold">

Deadline

</label>


<input

type="date"

name="deadline"

value={form.deadline}

onChange={handleChange}

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>






</div>









{/* Description */}

<div className="mt-6">


<label className="font-semibold">

Project Description

</label>



<textarea


rows="5"


name="description"


value={form.description}


onChange={handleChange}


placeholder="Explain your project requirements..."


className="
w-full
border
rounded-xl
p-3
mt-2
"


/>



</div>









<button


disabled={loading}


className="
mt-8
bg-blue-600
hover:bg-blue-700
text-white
px-8
py-3
rounded-xl
flex
items-center
gap-3
font-semibold
"


>


<FaPlusCircle/>


{

loading

?

"Creating..."

:

"Create Project"

}



</button>





</form>


</div>


</ClientLayout>


);


};


export default PostProject;