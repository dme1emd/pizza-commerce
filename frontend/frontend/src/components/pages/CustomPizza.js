import React, { useContext, useLayoutEffect, useState } from 'react'
import DomainContext from '../context/DomainContext'
export const CustomPizza = () => {
  const {domain}=useContext(DomainContext)
  const [ingredients , setIngredients] = useState([])
  const [total , setTotal] = useState(0.00)
  const getIngredients = async()=>{
    const response = await fetch(`${domain}ingredients/`)
    const data = await response.json()
    setIngredients(data)
  }
  useLayoutEffect(()=>{getIngredients()},[])
  return (
    <div>
      <form>
        {ingredients.map((ing)=>{return (
        <div>
          <input type='checkbox' id={`ing-${ing.name}`} onChange={
            (e)=>{
              e.target.checked ? setTotal(Number(total)+Number(ing.price)):setTotal(Number(total)-Number(ing.price))
            }
            }/>
          <label>{ing.name}</label>
        </div>
        )
      })}


      </form>
      <div className='total-add'>
        <h2>total : {total} €</h2>
      <button className='add-pizza max-wd'>add the custom pizza</button>
        </div>    
    </div>
  )
}
