
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { UserContext } from '../UserContext';


function Login() {
    const {setUsername,setId} = useContext(UserContext)
  const [values,setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })
    
  const LoginIputs = [
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
      name:"password",
      type:"password",
      placeholder: "Password",
      errorMessage : "Password should be 6-16 characters and include at leat 1 letter, 1 number and 1 special character! ",
      label : "Password",
      pattern : `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,16}`,
      required:true

    },
    {
      id:3,
      name:"confirmPassword",
      type:"password",
      placeholder: "Confirm Password",
      errorMessage : "Password dont't match!",
      label : "Confirm Password",
      pattern:values.password,
      required:true

    },

  ]
  const navigate = useNavigate()

const handleSubmit = async(e)=>{
  e.preventDefault()
  const data = new FormData(e.target)
  
  const fnData = Object.fromEntries(data)
  


 const user =  await axios.post("/api/auth/login",{...fnData})
console.log(user);
setUsername(user.data.details.username)
 setId(user.data.details._id)
 
}

const onChange = (e)=>{
  setValues({...values,[e.target.name]:e.target.value})
}   



  return (
 
    
     <form className='form flex flex-col w-1/3' onSubmit={handleSubmit}>
      {LoginIputs.map((input)=>(

        <Form key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
      ))
        
      }
  
      <button className='bg-green-500 p-3'>Login</button>
      <Link className='bg-blue-200 p-2 mt-2' to='/'>register</Link>
     </form>
  
  

  );
}

export default Login;
