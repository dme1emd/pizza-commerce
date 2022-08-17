import React, { useState } from 'react'
import {BiUpArrow , BiDownArrow} from 'react-icons/bi'
export const Command = ({command}) => {
    const [quantity,setQuantity] = useState(command.quantity)
    const getCookie=(name)=>{
        const cookieArr = document.cookie.split(';')
        for (const i = 0 ; i<cookieArr.length ; i++){
          const cookie = cookieArr[i]
          const cookiePair = cookie.split('=')
          if(name == cookiePair[0].trim()){
            return decodeURIComponent(cookiePair[1])
          }
          return null;
        }
      }
      const ParseCartOrCreate=()=>{
        var cart = JSON.parse(getCookie('cart'))
        if(cart == undefined){
          cart = {}
          document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
        }
        return cart
      }
      const addCookieItem = (pizza , action)=>{
        if(action == 'add'){
          var cart = ParseCartOrCreate()
            cart[pizza]['quantity']+=1
        }
        if(action=='remove'){
          var cart = ParseCartOrCreate()
          cart.pizza.quantity-=1
          if(cart.pizza.quantity<=0){
            delete cart[pizza]
          }
        }
        document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
      }
      const add = ()=>{
          setQuantity(quantity+1)
          addCookieItem(command.id , 'add')
      }
    return(
        command.custom ? 
        <div className='command'>
          <div className='commanded-header'>
            <h2>custom pizza</h2>
            <div className='quantity-container'>
                <div>{quantity}</div>
                <div className='arrows'><BiUpArrow onClick={add}/><BiDownArrow/> </div>
            </div>
            <div>price :{command.price} €</div>
          </div>
          <ul>
            ingredients :
            {command.ingredients.map((ing)=>{
              return<li>{ing}</li>
            })}
          </ul>
        </div>
        :
      <div className='command commanded-header'>
        <h2>{command.name}</h2>
        <div className='quantity-container'>
            <div>{quantity}</div>
            <div className='arrows'><BiUpArrow onClick={add}/><BiDownArrow/> </div>
        </div>
        <div>{command.price}</div>
      </div>)
}
