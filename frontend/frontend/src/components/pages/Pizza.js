import React from 'react'

export const Pizza = ({pizza}) => {
    console.log(pizza)
  return (
    <div className='pizza-card'>
        <img src={pizza.pic}/>
        <div className='pizza-scroll'>
            <h2>{pizza.name}</h2>
            <div className='pizza-header'>
                <button className='add-pizza'>add to command</button>
                <div className='price'>{pizza.price} €</div>
            </div>
        </div>
    </div>
  )
}
