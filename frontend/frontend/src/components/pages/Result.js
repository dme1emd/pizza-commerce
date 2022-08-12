import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Result = ({res}) => {
  const navigate = useNavigate()
    const navigateHandler=()=>{
        navigate(`/${res.city}`)
    }
  return (
    <div onClick={navigateHandler}>
        {res.city}
    </div>
  )
}
