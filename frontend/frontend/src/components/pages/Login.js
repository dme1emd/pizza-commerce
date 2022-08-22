import React , {useContext}from 'react'
import AuthContext from '../context/AuthContext'
import jwt_decode from 'jwt-decode'
import { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'
import DomainContext from '../context/DomainContext'
export const Login = () => {
    const {token , setToken ,setPizzeriaId}= useContext(AuthContext)
    const {domain} = useContext(DomainContext)
    const login =async (e)=>{
        e.preventDefault()
        const response = await fetch(`${domain}token/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'city': e.target.username.value,
                'password':e.target.password.value
            })
                 
        })
        const tok = await response.json()
        if(response.status ===200){
            localStorage.setItem('jwt',JSON.stringify(tok))
            setToken(tok)
            setPizzeriaId(jwt_decode(tok.access).user_id)
        }
    }
  return (
    <form onSubmit={login}>
        <input name="username" type="text" placeholder='enter your username'/>
        <input name="password" type="password" placeholder='enter password'/>
        <button>login</button>
    </form>
  )
}