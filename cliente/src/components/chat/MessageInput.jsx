import {useState} from "react";

import socket from "../../services/socket";


const MessageInput=({
chat
})=>{


const [text,setText]=useState("");



const sendMessage=()=>{


if(!text.trim())
return;


socket.emit(
"sendMessage",
{

conversationId:chat._id,

message:text

}

);


setText("");

};



return(

<div className="p-4 border-t flex gap-3">


<input

value={text}

onChange={
e=>setText(e.target.value)
}

className="flex-1 border rounded-xl px-4"

placeholder="Type message..."



/>


<button

onClick={sendMessage}

className="bg-blue-600 text-white px-6 rounded-xl"

>

Send

</button>


</div>


)


}


export default MessageInput;