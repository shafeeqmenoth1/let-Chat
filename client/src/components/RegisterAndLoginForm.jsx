import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContxt'

function RegisterAndLoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isRegisterOrLogin, setIsRegisterOrLogin] = useState("register")

const {setUsername:setLoggedUser,setId} = useContext(UserContext)
    async function handleSubmit(e){
      e.preventDefault()
      const url = isRegisterOrLogin === 'register' ? "/register" : "/login"
     const {data} = await axios.post(url,{username,password});
      setLoggedUser(username)
      setId(data.id)
    }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
        <form onSubmit={handleSubmit} className='w-64 mx-auto'>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder='username' className='block w-full rounded-sm p-2 mb-2 border' />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' className='block w-full rounded-sm p-2 mb-2 border' />
            <button className='bg-blue-500 block w-full text-white rounded-sm p-2'>{isRegisterOrLogin === "register" ? "Register" : "Login"}</button>
            {
              isRegisterOrLogin === "register" && (
                <div className='text-center mt-2 mr-2'>Already a memeber ? <button onClick={()=>setIsRegisterOrLogin('login')} >Login here</button></div>

              )
            
            }
            {
                isRegisterOrLogin === "login" && (
                  <div className='text-center mt-2 mr-2'>Don't have an account ? <button onClick={()=>setIsRegisterOrLogin('register')} >Register</button></div>
  
                )
            }

        </form>
    </div>

  )
}

export default RegisterAndLoginForm