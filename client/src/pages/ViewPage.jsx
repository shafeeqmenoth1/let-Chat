import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function ViewPage() {
    const [data,setData] = useState({})
    const location = useLocation()
  const id = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[1];

    useEffect(()=>{
        axios.get(`api/users/find/${id}`).then((res)=>{
            setData(res.data)
        })
    })
  return (
    <div>
        <li>{data.username}</li>
        <li>{data.address}</li>
        <li>{data.image}</li>
     
    </div>
  )
}

export default ViewPage