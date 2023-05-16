
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import Login from './Login';


function Registration() {
const [isUser,setIsUser] = useState({})
  const [values,setValues] = useState({
    username: "",
    img: "",
    address:"",
    password: "",
    confirmPassword: "",
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
      required:true
    },
    {
      id:2,
      name:"address",
      type:"text",
      placeholder: "Address",
      label : "Address",
      errorMessage : "this field is required!",
      required:true

    },
    {
      id:3,
      name:"password",
      type:"password",
      placeholder: "Password",
      errorMessage : "Password should be 6-16 characters and include at leat 1 letter, 1 number and 1 special character! ",
      label : "Password",
      pattern : `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,16}`,
      required:true

    },
    {
      id:4,
      name:"confirmPassword",
      type:"password",
      placeholder: "Confirm Password",
      errorMessage : "Password dont't match!",
      label : "Confirm Password",
      pattern:values.password,
      required:true

    },
    {
        id:5,
        name:"image",
        type:"file",
        placeholder: "upload image",
        errorMessage : "this field is required!",
        label : "upload image",
        required:true
  
      }
  ]


const handleSubmit = async(e)=>{
  e.preventDefault()
  const data = new FormData(e.target)
  
  const fnData = Object.fromEntries(data)
  console.log(fnData);
  const image = fnData.image.name
  console.log(fnData.image.name);

  const user = await axios.post("/api/auth/register",{...fnData,image})
  setIsUser(user)
  setValues({})
}

const onChange = (e)=>{
  setValues({...values,[e.target.name]:e.target.value})
}   



  return (
 
    
     <form className='form flex flex-col w-1/3' onSubmit={handleSubmit}>
      {inputs.map((input)=>(

        <Form key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
      ))
        
      }
  
      <button className='bg-green-500 p-3'>Submit</button>
      <Link className='bg-blue-200 p-2 mt-2' to='/login'>Login</Link>
     </form>
  

  );
}

export default Registration;
