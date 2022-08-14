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
      const cart = {}
      document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
    }
  }
  const addCookieItem = (pizza , action)=>{
    if(action == 'add'){
      var cart = ParseCartOrCreate()
      if(cart[pizza]==undefined){
        cart.pizza = {quantity:1 , custom : pizza.includes(';')}
        return
      }
      cart[pizza]+=1
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
  const createCustomPizzaId=(pizza)=>{
    const id = ''
    pizza.ingredients.map((eng)=>{
      id=`${eng.id};${id}`
    })
    return id
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
