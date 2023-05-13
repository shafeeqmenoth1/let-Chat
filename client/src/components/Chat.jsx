import { set } from 'mongoose'
import React, {useRef, useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContxt'
import Avatar from './Avatar'
import {uniqBy} from "lodash"
import axios from 'axios'
export default function Chat() {
 const [ws,setWs] = useState(null)
 const [onlinePeople,setOnlinePeople] = useState({})
const [selectedUserId, setSelectedUserId] = useState("")
const [newMessage, setNewMessage] = useState("")
const [messages, setMessages] = useState([])
const {username,id} = useContext(UserContext)
const divUnderMsgRef = useRef()

    useEffect(()=>{
        connectToWs()
    },[])

    function connectToWs(){
        const ws = new WebSocket("ws://localhost:4000")
        setWs(ws)
         ws.addEventListener("message",messageHandler)
         ws.addEventListener('close',()=>{
           setTimeout(() => {
            connectToWs()
           }, 1000);
         })
    }

    function showOnlinePeople(peopleArray){
        const people = {}
        peopleArray.forEach(({userId,username})=>{
            people[userId] = username
        })
        setOnlinePeople(people)
    }


    function messageHandler(e){
        const messageData = JSON.parse(e.data);
        console.log({e,messageData});
        if("online" in messageData){
            showOnlinePeople(messageData.online)
        }else if("text" in messageData){
            setMessages(prev=>([...prev,{...messageData}]))
        }
        
    }

    useEffect(()=>{
        const div = divUnderMsgRef.current
        if(div){
            div.scrollIntoView({behavior:"smooth",block:'end'})
        }
       
    },[messages])

    useEffect(()=>{
   
        if(selectedUserId){
          axios.get('/messages/'+selectedUserId).then(res=>{
          console.log(res.data);
            setMessages(res.data)
          })
        
        }
       
    },[selectedUserId])
   const onlineUserExcludeOurUser = {...onlinePeople}
   delete onlineUserExcludeOurUser[id]

   function sendMessage(e){
    e.preventDefault()
    ws.send(JSON.stringify(
       {
            recipient:selectedUserId,
            text:newMessage
        }
    ))
    setNewMessage("")
    setMessages(prev=>([...prev,{text:newMessage,sender:id,recipient:selectedUserId,_id:new Date()}]))
   }

   const messagesWithoutDupes = uniqBy(messages,'_id')
  return (
    <div className='flex h-screen'>
        <div className='bg-white w-1/3'>
            <div className='text-green-600 text-xl font-bold flex gap-1 p-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>

                let'Chat</div>
            {
            Object.keys(onlineUserExcludeOurUser).map(userId=>(
                <div onClick={()=>setSelectedUserId(userId)} key={userId} className={'border-b border-gray-100 py-2 pl-4 flex cursor-pointer items-center gap-2 '+(userId === selectedUserId ? "bg-green-100":"")}>
                    <Avatar username={onlinePeople[userId]} userId={userId}/>
                    <span>{onlinePeople[userId]}</span>
                    </div>
            ))
        }</div>
        <div className='flex flex-col bg-green-100 w-2/3 p-2'>
            <div className='flex-grow'>
                {
                    !selectedUserId && (
                        <div className='h-full flex justify-center items-center text-gray-400'>No Selected Person</div>
                    )
                }
                  {
                selectedUserId && (
                    <div className='relative h-full'>
                    <div className='overflow-y-scroll absolute top-0 left-0 right-0 bottom-2'>{messagesWithoutDupes.map((message,i)=>(
                        <div key={i} className={(message.sender === id ? "text-left": "text-right")}>
                        <div className={"inline-block text-left p-2 my-2 rounded-md text-sm shadow-md "+(message.sender === id ? "bg-white": "bg-green-200")} key={i}>{message.text}</div>
                        </div>
                    ))}
                     <div ref={divUnderMsgRef}></div>
                    </div>
                   
                    </div>
                   
                )
            }
            </div>
          
          {selectedUserId && (
              <form className='flex gap-2' onSubmit={sendMessage}>
              <input value={newMessage} onChange={e=>setNewMessage(e.target.value)} type="text" placeholder='Type your message here...' className='bg-white flex-grow border
              rounded-sm p-2' />
              <button type='submit' className="p-2 bg-blue-500 text-white rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>

              </button>
          </form>
          )}
        </div>
    </div>
    
  )
}

 