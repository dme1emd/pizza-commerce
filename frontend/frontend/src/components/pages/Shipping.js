import React, { useContext, useState } from 'react'
import TotalContext from '../context/TotalContext'
import { Command } from './Command'
import { Nav } from './Nav'
export const Shipping = () => {
  const {total , setTotal} = useContext(TotalContext)
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
    const cart = JSON.parse(getCookie('cart'))
    if(cart == undefined){
      console.log('created')
      const cart = {}
      document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
    }
    return cart
  }
  const [pizzas , setPizzas] = useState(Object.keys(ParseCartOrCreate()).map((key)=>{return ParseCartOrCreate()[key]}))
  console.log(pizzas)
  const addCookieItem = (pizza , action)=>{
    console.log(pizza)
    if(action == 'add'){
      var cart = ParseCartOrCreate()
      if(cart[pizza]==undefined){
        cart[pizza] = {quantity:1 , custom : pizza.includes(';')}
      }
      else{
        cart[pizza]['quantity']+=1
      }
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
  return (
    <div>
      <Nav/>
      {
      pizzas.length > 0 ?
      <div className='command commanded-header ind'>
        <h2>pizza</h2>
        <div>
          quantity:
        </div>
        <div className='quantity'>total :</div>
      </div>:<h1>YOU HAVE NOT COMMANDED YET</h1>
      }
      {pizzas.map((pizza)=>{return <Command command={pizza} key={pizza.id}/>}
      )}
      {total}
    </div>
  )
}
