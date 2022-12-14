import React, { useContext, useLayoutEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import DomainContext from '../context/DomainContext'
import TotalContext from '../context/TotalContext'
import { CustomPizza } from './CustomPizza'
import { Nav } from './Nav'
import { Pizza } from './Pizza'
export const Pizzeria = () => {
  const [Pizzeria,setPizzeria]=useState()
  const {domain}= useContext(DomainContext)
  const [showCustom,setShowCustom ]=useState(false)
  const {pizzeria} = useParams()
  const {setNotif} = useContext(TotalContext)
  const getPizzeria=async()=>{
    const response = await fetch(`${domain}pizzeria/${pizzeria}`)
    const data = await response.json()
    setPizzeria(data[0])
  }
  useLayoutEffect(()=>{getPizzeria()},[])
  return (
    <div>
      <Nav/>
        {
        showCustom ?<CustomPizza/>
         : 
        <button className='custom-pizza-button' onClick={()=>{setShowCustom(!showCustom)}}>add a Custom Pizza</button>
         }
        <h2 className='available-pizzas'>available pizzas</h2>
        <div className='pizzas-container'>
          {Pizzeria ? Pizzeria.pizzas.map((pi)=>{return <Pizza pizza={pi}/>}):''}
        </div>
    </div>
  )
}
