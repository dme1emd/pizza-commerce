import React, { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
export const ConnectedRoutes = () => {
    const {token} = useContext(AuthContext)
    console.log(token)
  return (
    token ? <Navigate to='/admin/'/> : <Outlet/>
  )
}