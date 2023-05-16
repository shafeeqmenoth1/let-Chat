import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AdminHome() {
  const [users,setUsers] = useState([])
 const path = "/api/users"


  useEffect(()=>{
    axios.get('/api/users').then(response=>{
      setUsers(response.data)
      console.log(response.data);
    })
},[users])

const handleDelete=async(id)=>{
  await axios.delete(`/api/users/${id}`)
  setUsers(users.filter((item) => item._id !== id));
}
  return (
    <div className='relative overflow-x-auto'>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
    <tr>
      <th className='px-6 py-3'>Image</th>
      <th className='px-6 py-3'>Username</th>
      <th className='px-6 py-3'>Address</th>
    </tr>
  </thead>
  <tbody>
    {
        users.map((user)=>
          
(  <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
   <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.image}</td>
   <td className="px-6 py-4">{user.username}</td>
   <td className="px-6 py-4">{user.address}</td>
   <Link to={`${path}/${user._id}`} className='m-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>View</Link>
   <button className='m-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'
   onClick={()=>handleDelete(user._id)}>Delete</button>
    <Link to={`/api/users/edit/${user._id}`} className='m-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>Edit</Link>
 </tr>)
  )
    }
 

  </tbody>
</table>
   
  
 </div>
  )
}

export default AdminHome