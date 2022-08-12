import React, { useContext, useLayoutEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import DomainContext from '../context/DomainContext'
import { Pizza } from './Pizza'
export const Pizzeria = () => {
  const [Pizzeria,setPizzeria]=useState()
  const {domain}= useContext(DomainContext)
  const {pizzeria} = useParams()
  const getPizzeria=async()=>{
    const response = await fetch(`${domain}pizzeria/${pizzeria}`)
    const data = await response.json()
    setPizzeria(data[0])
  }
  useLayoutEffect(()=>{getPizzeria()},[])
  return (
    <div>
        <button className='custom-pizza-button'>add a Custom Pizza</button>
        <h2 className='available-pizzas'>available pizzas</h2>
        <div className='pizzas-container'>
          {Pizzeria ? Pizzeria.pizzas.map((pi)=>{return <Pizza pizza={pi}/>}):''}
        </div>
    </div>
  )
}
