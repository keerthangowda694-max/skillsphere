import { FaRobot } from "react-icons/fa";

const CareerSuggestions = ({ suggestions = [] }) => (

<div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white">

<h2 className="text-2xl font-bold flex items-center gap-3">

<FaRobot/>

AI Career Suggestions

</h2>

<div className="mt-6 space-y-4">

{

suggestions.length===0

?

<>

<p>⭐ Learn Docker to unlock more backend jobs.</p>

<p>⭐ Add AWS to increase cloud opportunities.</p>

<p>⭐ Complete more projects to improve ranking.</p>

</>

:

suggestions.map((item,index)=>(

<p key={index}>

⭐ {item}

</p>

))

}

</div>

</div>

);

export default CareerSuggestions;