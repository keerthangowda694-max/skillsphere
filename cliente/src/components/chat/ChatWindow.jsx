import { 
    useEffect, 
    useRef, 
    useState 
} from "react";

import {
    FaPaperPlane,
    FaPaperclip,
    FaTrash,
    FaEdit,
    FaCheckDouble
} from "react-icons/fa";

import API from "../../services/api";



const ChatWindow = ({
    chat,
    messages,
    setMessages,
    socket,
    currentUser
}) => {


const [text,setText]=useState("");

const [editingId,setEditingId]=useState(null);

const [uploading,setUploading]=useState(false);

const [typing,setTyping]=useState(false);


const fileRef=useRef(null);

const bottomRef=useRef(null);

const [readMessages,setReadMessages] = useState([]);



useEffect(()=>{

    bottomRef.current?.scrollIntoView({
        behavior:"smooth"
    });

},[messages]);




// SOCKET TYPING

useEffect(()=>{

if(!socket)
return;


socket.on(
"typing",
()=>setTyping(true)
);


socket.on(
"stopTyping",
()=>setTyping(false)
);



return()=>{

socket.off("typing");
socket.off("stopTyping");

}


},[socket]);






if(!chat){

return(

<div className="
flex-1
flex
justify-center
items-center
bg-gray-100
">

<div className="text-center">

<h2 className="
text-3xl
font-bold
text-gray-700
">

Select a Conversation

</h2>

<p className="
text-gray-500
mt-2
">

Choose chat to start messaging

</p>

</div>

</div>

)

}





// SEND MESSAGE

const sendMessage=async()=>{


if(!text.trim())
return;



try{


let res;



if(editingId){


res=await API.put(

`/chat/message/${editingId}`,

{
message:text
}

);



setMessages(prev=>

prev.map(msg=>

msg._id===editingId

?
res.data.message

:

msg

)

);



setEditingId(null);


}

else{


res=await API.post(

"/chat/message",

{
conversationId:chat._id,
message:text
}

);



setMessages(prev=>[
...prev,
res.data.message
]);



socket?.emit(
"sendMessage",
res.data.message
);



}


setText("");



}

catch(err){

console.log(
err.response?.data || err
);

}



};









// DELETE MESSAGE
const deleteMessage = async (id) => {

    try {
    
    const msg = messages.find(
        item => item._id === id
    );
    
    
    // second delete = remove permanently from UI
    
    if(msg?.isDeleted){
    
    
    setMessages(prev =>
        prev.filter(
            item => item._id !== id
        )
    );
    
    
    return;
    
    }
    
    
    
    // first delete = mark deleted
    
    await API.delete(
        `/chat/message/${id}`
    );
    
    
    
    setMessages(prev =>
    
    prev.map(item =>
    
    item._id === id
    
    ?
    {
        ...item,
        isDeleted:true,
        message:""
    }
    
    :
    
    item
    
    )
    
    );
    
    
    }
    
    catch(err){
    
    console.log(
    err.response?.data || err
    );
    
    }
    
    };

    const markAsRead = async (id)=>{

        try{
        
        
        await API.put(
            `/chat/message/read/${id}`
        );
        
        
        
        setReadMessages(prev=>[
            ...prev,
            id
        ]);
        
        
        
        }
        
        catch(err){
        
        console.log(
        err.response?.data || err
        );
        
        }
        
        };








// MARK READ

const markRead=async(id)=>{


try{


await API.put(

`/chat/message/read/${id}`

);



}

catch(err){

console.log(err);

}


};








// UPLOAD FILE

const uploadFile=async(e)=>{


const file=e.target.files[0];


if(!file)
return;



try{


setUploading(true);



const data=new FormData();


data.append(
"file",
file
);


data.append(
"conversationId",
chat._id
);




const res=await API.post(

"/chat/upload",

data,

{
headers:{
"Content-Type":
"multipart/form-data"
}
}

);



setMessages(prev=>[
...prev,
res.data.data
]);



socket?.emit(
"sendMessage",
res.data.data
);



}

catch(err){

console.log(err);

}

finally{

setUploading(false);

}


};










return(


<div className="
flex
flex-col
flex-1
bg-[#efeae2]
">





{/* HEADER */}

<div className="
bg-white
border-b
p-4
flex
gap-3
items-center
">


<div className="
w-12
h-12
rounded-full
bg-green-500
text-white
flex
items-center
justify-center
font-bold
">

{
chat.project?.title?.charAt(0)
||
"P"
}

</div>


<div>

<h2 className="
font-bold
text-lg
">

{
chat.project?.title ||
"Project Chat"
}

</h2>


<p className="
text-green-600
text-sm
">

● Online

</p>


</div>


</div>







{/* CHAT AREA */}


<div className="
flex-1
overflow-y-auto
p-6
space-y-3
">



{
typing &&

<p className="
text-gray-500
text-sm
italic
">

Typing...

</p>

}



{

messages.map(msg=>{


const mine =
String(msg.sender?._id || msg.sender)
===
String(currentUser);



return(


<div
key={msg._id}

onMouseEnter={()=>{

if(!mine && !msg.readBy?.includes(currentUser)){

markAsRead(msg._id);

}

}}

className={`
flex
${mine?
"justify-end":
"justify-start"}
`}
>



<div className={`
group
relative
max-w-[70%]
px-4
py-3
rounded-xl
shadow

transition
hover:scale-[1.02]

${
mine
?
"bg-[#d9fdd3] rounded-tr-none"
:
"bg-white rounded-tl-none"
}

`}>




{
msg.isDeleted

?

<p className="
italic
text-gray-500
">

🚫 This message was deleted

</p>


:

<>

<p>

{msg.message}

</p>




{
msg.attachment?.url &&

<a

href={msg.attachment.url}

target="_blank"

rel="noreferrer"

className="
block
text-blue-600
underline
mt-2
"

>

📎
{
msg.attachment.fileName
||
"File"
}

</a>


}



</>


}







{/* MESSAGE ACTION BUTTONS */}

{
mine &&

<div
className="
hidden
group-hover:flex
absolute
-right-3
-top-3
gap-2
z-10
"
>


{/* EDIT BUTTON - only active messages */}

{
!msg.isDeleted &&

<button

onClick={()=>{

setEditingId(msg._id);

setText(msg.message);

}}

className="
bg-white
text-blue-600
p-2
rounded-full
shadow-md
hover:scale-110
transition
"

title="Edit message"

>

<FaEdit size={12}/>

</button>

}





{/* DELETE BUTTON - available always */}

<button

onClick={()=>deleteMessage(msg._id)}

className="
bg-white
text-red-600
p-2
rounded-full
shadow-md
hover:scale-110
transition
"

title="Delete message"

>

<FaTrash size={12}/>

</button>



</div>

}






<div className="
flex
justify-end
items-center
gap-2
text-xs
text-gray-500
mt-2
">


{
new Date(msg.createdAt)
.toLocaleTimeString([],{

hour:"2-digit",
minute:"2-digit"

})
}



{
mine &&

<FaCheckDouble

className={

msg.readBy?.length > 0 ||
readMessages.includes(msg._id)

?

"text-blue-500"

:

"text-gray-400"

}

/>

}



</div>




</div>


</div>


)


})

}



<div ref={bottomRef}/>


</div>









{/* INPUT */}



<div className="
bg-white
p-4
flex
gap-3
border-t
">



<button

disabled={uploading}

onClick={()=>fileRef.current.click()}

className="
bg-gray-200
p-3
rounded-full
hover:bg-gray-300
"

>

{
uploading
?
"..."
:
<FaPaperclip/>
}

</button>


<input

hidden

type="file"

ref={fileRef}

onChange={uploadFile}

/>




<input

value={text}

onChange={(e)=>{


setText(e.target.value);


socket?.emit(
"typing",
chat._id
);


}}

placeholder={
editingId
?
"Edit message..."
:
"Type message..."
}

className="
flex-1
border
rounded-full
px-5
outline-none
"

/>




<button

onClick={sendMessage}

className="
bg-green-500
text-white
p-3
rounded-full
hover:bg-green-600
transition
"

>

<FaPaperPlane/>

</button>



</div>




</div>


);


};


export default ChatWindow;