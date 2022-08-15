import React from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import { Link } from 'react-router-dom'
export const Nav = () => {
  return (
    <div className='nav'>
        <Link to='/shipping/'>
            <FiShoppingCart className='shoping-icon'/>
        </Link>
    </div>
  )
}
