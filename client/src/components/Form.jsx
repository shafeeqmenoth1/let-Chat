import React, { useState } from 'react'
import  "./form.css"
function Form({label,errorMessage,onChange,...others}) {

  const [focused, setFocused] = useState(false)
  const handlFocus = ()=>{
    setFocused(true)
  }
  return (
   
        <div className='form flex flex-col'>
            <label >{label}</label>
            <input className='border p-2 my-2' {...others} onChange={onChange} onBlur={handlFocus}
             onFocus={()=>others.name === "confirmPassword" && setFocused(true)}
            focused={focused.toString()}
           />
  
          
            <span className='errorMsg text-xs text-red-500 p-2 hidden '>{errorMessage}</span>

        </div>
   
  )
}

export default Form