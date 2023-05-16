

import {
    createBrowserRouter,
    RouterProvider,
  
   
  } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import ViewPage from "./pages/ViewPage";
import EditPage from "./pages/EditPage";



function Router() {

  const {username,id,isAdmin} = useContext(UserContext)



    const router = createBrowserRouter([
        {
          path: "/",
          element:    <Registration/>,
        },
        {
          path: "/login",
          element:    <Login/>,
        },
        {
          path: "/home",
          element:    <Home/>,
        },
        {
          path: "/admin",
          element:    <AdminHome/>,
        },
        {
          path: "/api/users/:id",
          element:    <ViewPage/>,
        },
        {
          path: "/api/users/edit/:id",
          element:    <EditPage/>,
        },
      ])



  return (
  

<RouterProvider router={router} />
  
  )
}

export default Router