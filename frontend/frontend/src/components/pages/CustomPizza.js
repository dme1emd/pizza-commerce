import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import DomainContext from '../context/DomainContext'
import TotalContext from '../context/TotalContext'
export const CustomPizza = () => {
  const {domain}=useContext(DomainContext)
  const [ingredients , setIngredients] = useState([])
  const [selected , setSelected] = useState([])
  const [total , setTotal] = useState(0.00)
  const {setNotif}=useContext(TotalContext)
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
      if(cart[pizza]==undefined){
        cart[pizza] = {quantity:1 , custom : true , ingredients : selected.map((sel)=>{return sel.name}),price:total , id:pizza}
        setNotif(true)
      }
      else{
        if(cart[pizza]['quantity']<10){
        cart[pizza]['quantity']+=1
        setNotif(true)
        }
        else{
          return
        }
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
  const createCustomPizzaId=(ingredients)=>{
    var id = ''
    ingredients.map((eng)=>{
      id=`${eng.id}m${id}`
    })
    console.log(id)
    return id
  }
  const handleAdd =()=>{
    addCookieItem(createCustomPizzaId(selected),'add')
  }
  useLayoutEffect(()=>{getIngredients()},[])
  useEffect(()=>{console.log(selected)},[selected])
  return (
    <div>
      <form>
        {ingredients.map((ing)=>{return (
        <div>
          <input type='checkbox' id={`ing-${ing.name}`} onChange={
            (e)=>{
              e.target.checked ? setTotal(Number(total)+Number(ing.price)):setTotal(Number(total)-Number(ing.price))
              e.target.checked ? setSelected([...selected , ing]) : setSelected(selected.filter(elem => elem != ing))
            }
            }/>
          <label>{ing.name}</label>
        </div>
        )
      })}
      </form>
      <div className='total-add'>
        <h2>total : {total} €</h2>
      <button className='add-pizza max-wd' onClick={handleAdd}>add the custom pizza</button>
        </div>    
    </div>
  )
}
