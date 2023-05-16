import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../components/Form';

export default function EditPage() {

    const location = useLocation()
    const id = location.pathname.split("/")[4];
  
    const [data,setData] = useState({})
    const [values,setValues] = useState({
        username: "",
        img: "",
        address:"",
        password: "",
        confirmPassword: "",
      })

      useEffect(()=>{
        axios.get(`api/users/find/${id}`).then((res)=>{
            setData(res.data)
        })
    })
    const inputs = [
        {
          id:1,
          name:"username",
          type:"text",
          placeholder: "Username",
          errorMessage:"Username Should be 6 -16 characters and shouidn't include special character! ",
          label : "Username",
          pattern: "^[a-zA-Z0-9]{6,16}$",
          required:true,
          defaultValue:data.username
        },
        {
          id:2,
          name:"address",
          type:"text",
          placeholder: "Address",
          label : "Address",
          errorMessage : "this field is required!",
          required:true,
          defaultValue:data.address
        },
        {
            id:5,
            name:"image",
            type:"file",
            placeholder: "upload image",
            errorMessage : "this field is required!",
            label : "upload image",
            required:true,
            defaultValue:data.image
      
          }
      ]
console.log(data);
      const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        
        const fnData = Object.fromEntries(data)
        console.log(fnData);
        const image = fnData.image.name
        console.log(fnData.image.name);
      
        // const user = await axios.put(`/api/users/${id}`,{...fnData,image})
        // setIsUser(user)
        // setValues({})
      }
      
      const onChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      }  
   
  return (
    <div>
          <form className='form flex flex-col w-1/3' onSubmit={handleSubmit}>
      {inputs.map((input)=>(

        <Form key={input.id} {...input}  onChange={onChange}/>
      ))
        
      }
  
      <button className='bg-green-500 p-3'>Submit</button>
    
     </form>
    </div>
  )
}

