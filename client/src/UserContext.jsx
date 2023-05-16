import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [username,setUsername] = useState(null)
    const [id,setId] = useState(null)
    const [isAdmin,setIsAdmin] = useState(false)
    useEffect(()=>{
        axios.get('/api/auth/profile').then(response=>{
             
            setId(response.data.id)
            setIsAdmin(response.data.isAdmin)
        })
    },[])
    return (
        <UserContext.Provider value={{username,setUsername,id,setId,isAdmin}}>{children}</UserContext.Provider>
    )
}