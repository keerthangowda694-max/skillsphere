import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

import {
FaUser,
FaMoneyBillWave,
FaCalendar,
FaUpload,
FaCheckCircle,
FaClock,
FaFile
} from "react-icons/fa";


const ProjectWorkspace =()=>{


const {id}=useParams();


const [project,setProject]=useState(null);

const [progress,setProgress]=useState(null);

const [files,setFiles]=useState([]);

const [workTitle,setWorkTitle]=useState("");

const [workDescription,setWorkDescription]=useState("");

const [submission,setSubmission]=useState(null);

const [submitting,setSubmitting]=useState(false);

const [loading,setLoading]=useState(true);





useEffect(()=>{

loadProject();
loadProgress();
loadSubmission();

},[id]);





// ==========================
// GET PROJECT
// ==========================

const loadProject=async()=>{

try{

const res =
await API.get(`/projects/${id}`);

setProject(res.data.project);


}
catch(error){

console.log(error);

}

};







// ==========================
// GET PROGRESS
// ==========================

const loadProgress=async()=>{

try{

const res =
await API.get(
`/projects/${id}/progress`
);


setProgress(res.data);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};







// ==========================
// GET MY SUBMISSION
// ==========================

const loadSubmission=async()=>{


try{


const res =
await API.get(
"/work/my"
);



if(res.data.success){


const data =
res.data.submissions.find(

(item)=>

item.project?._id?.toString()
===
id.toString()

);



setSubmission(data || null);


}


}
catch(error){

console.log(error);

}


};









// ==========================
// SUBMIT WORK
// ==========================

const submitWork=async()=>{


if(!workTitle || !workDescription){

alert(
"Please fill work details"
);

return;

}



try{


setSubmitting(true);



const formData =
new FormData();



formData.append(
"title",
workTitle
);



formData.append(
"description",
workDescription
);



files.forEach(file=>{

formData.append(
"files",
file
);

});





await API.post(

`/work/submit/${id}`,

formData,

{

headers:{

"Content-Type":
"multipart/form-data"

}

}

);




alert(
"Work submitted successfully"
);



setWorkTitle("");

setWorkDescription("");

setFiles([]);



loadSubmission();


}
catch(error){

console.log(error);

alert(
"Submission failed"
);


}
finally{

setSubmitting(false);

}


};






if(loading){

return(

<DashboardLayout>

<div className="p-10 text-center">

Loading Workspace...

</div>

</DashboardLayout>

);

}








return(


<DashboardLayout>


<div className="p-8 space-y-8">






{/* PROJECT HEADER */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<div className="
flex
justify-between
">


<div>


<h1 className="
text-4xl
font-bold
">

{project?.title}

</h1>


<p className="
text-gray-500
mt-3
">

{project?.description}

</p>


</div>



<span
className={`

px-5
py-2
rounded-full
font-semibold


${
project?.status==="Completed"

?

"bg-green-100 text-green-700"

:

"bg-blue-100 text-blue-700"

}

`}
>

{project?.status}

</span>


</div>


</div>








{/* DETAILS */}


<div className="
grid
md:grid-cols-4
gap-6
">


<Card

icon={<FaUser/>}

title="Client"

value={
project?.client?.fullName
}

/>



<Card

icon={<FaMoneyBillWave/>}

title="Budget"

value={

`₹${project?.budget?.min}
-
₹${project?.budget?.max}`

}

/>



<Card

icon={<FaCalendar/>}

title="Deadline"

value={

new Date(
project?.deadline
)
.toLocaleDateString()

}

/>



<Card

icon={<FaClock/>}

title="Experience"

value={
project?.experienceRequired
}

/>


</div>









{/* PROGRESS */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Project Progress

</h2>



<div className="
bg-gray-200
h-5
rounded-full
">


<div

className="
bg-blue-600
h-5
rounded-full
"

style={{

width:
`${progress?.progress || 0}%`

}}

/>


</div>


<p className="mt-3 font-semibold">

{progress?.progress || 0}% Completed

</p>


</div>








{/* SUBMISSION STATUS */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Submission Status

</h2>



{

submission ?


<div className="
border
rounded-xl
p-5
">


<h3 className="
text-xl
font-bold
">

{submission.title}

</h3>


<p className="mt-2 text-gray-600">

{submission.description}

</p>



<div className="
mt-4
flex
items-center
gap-3
">


<FaClock/>


Status:


<span
className={`font-bold

${
submission.status==="Approved"

?
"text-green-600"

:

submission.status==="Changes Requested"

?
"text-red-600"

:
"text-yellow-600"

}

`}
>

{submission.status || "Pending Review"}

</span>


</div>





{
submission.feedback &&

<p className="
mt-4
text-red-600
font-semibold
">

Feedback:
{submission.feedback}

</p>

}






<h3 className="
font-bold
mt-5
">

Files

</h3>


{

submission.files?.map(

(file,index)=>(


<div

key={index}

className="
flex
gap-3
items-center
bg-gray-100
p-3
rounded-lg
mt-2
"

>

<FaFile/>


<a

href={`http://localhost:5000${file.url}`}

target="_blank"

rel="noreferrer"

className="text-blue-600"

>

{file.filename}

</a>


</div>


)

)

}



</div>


:


<p className="text-gray-500">

No work submitted yet

</p>


}


</div>









{/* SUBMIT */}


{

submission?.status !== "Approved"
&&
project?.status !== "Completed"

&&


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Submit Work

</h2>




<input

className="
w-full
border
p-3
rounded-xl
mb-4
"

placeholder="Work title"

value={workTitle}

onChange={
e=>setWorkTitle(e.target.value)
}

/>





<textarea

className="
w-full
border
p-3
rounded-xl
mb-4
"

rows="4"

placeholder="Describe completed work"

value={workDescription}

onChange={
e=>setWorkDescription(e.target.value)
}

/>





<input

type="file"

multiple

onChange={

e=>

setFiles(
Array.from(e.target.files)
)

}

/>



<button

onClick={submitWork}

disabled={submitting}

className="
mt-5
bg-blue-600
text-white
px-8
py-3
rounded-xl
flex
gap-3
items-center
"

>


<FaUpload/>

{

submitting

?

"Submitting..."

:

"Submit Work"

}


</button>


</div>


}








{/* COMPLETED MESSAGE */}


{

project?.status==="Completed"

&&


<div className="
bg-green-100
text-green-700
p-6
rounded-2xl
font-bold
flex
gap-3
items-center
">


<FaCheckCircle/>

Project Completed Successfully


</div>


}





</div>


</DashboardLayout>


);

};








const Card=({icon,title,value})=>(

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<div className="
text-blue-600
text-3xl
">

{icon}

</div>


<p className="
text-gray-500
mt-3
">

{title}

</p>


<h3 className="
font-bold
text-lg
">

{value || "N/A"}

</h3>


</div>


);



export default ProjectWorkspace;