import React, { useContext } from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import TotalContext from '../context/TotalContext'
export const Nav = () => {
    const {notif} = useContext(TotalContext)
  return (
    <div className='nav'>
        <Link to='/shipping/'>
            <FiShoppingCart className='shoping-icon'/>
        </Link>
        {notif ? <div className='notif'></div>:''}
    </div>
  )
}
