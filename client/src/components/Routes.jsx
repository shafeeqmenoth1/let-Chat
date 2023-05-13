import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContxt'

import RegisterAndLoginForm from './RegisterAndLoginForm'
import Chat from './Chat'


export default function Routes() {

    const {username,id} = useContext(UserContext)

    if(username) return (<Chat/>)
  return (
    <RegisterAndLoginForm/>
  )
}

