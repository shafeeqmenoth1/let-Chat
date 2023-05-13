import React from 'react'

export default  function Avatar({username,userId}) {
    const colors = ["bg-red-200","bg-blue-200","bg-teal-200","bg-green-200","bg-purple-200"]
    const userIdBase10 = parseInt(userId,16)
    const colorIndex = userIdBase10 % colors.length
    const color = colors[colorIndex]
    
  return (
    <div className={'w-8 h-8 uppercase rounded-full flex justify-center items-center text-gray-800  font-bold '+color}>{username[0]}</div>
  )
}

