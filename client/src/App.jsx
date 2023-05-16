import axios from 'axios';
import { useContext } from 'react';
import Router from './Router';

import {UserContextProvider } from './UserContext';





function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true



  return (
    <UserContextProvider>
    <div className='flex h-screen items-center justify-center'>
        <Router/>
    </div>
    </UserContextProvider>
  )
}

export default App
