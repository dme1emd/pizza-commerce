import React, { useContext } from 'react'
import TotalContext from '../context/TotalContext'
export const Pizza = ({pizza}) => {
  const {setNotif} = useContext(TotalContext)
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
      console.log('created')
      cart = {}
      document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
    }
    console.log(cart)
    return cart
  }
  const addCookieItem = (id , action)=>{
    if(action == 'add'){
      var cart = ParseCartOrCreate()
      console.log(cart)
      if(cart[id]==undefined){
        setNotif(true)
        cart[id] = {quantity:1,custom : false , name : pizza.name , price : pizza.price , id :id}
      }
      else{
        if(cart[id]['quantity']<10){
        cart[id]['quantity']+=1
        setNotif(true)
        }
        else{
          return
        }
      }
    }
    if(action=='remove'){
      var cart = ParseCartOrCreate()
      cart[id]['quantity']-=1
      if(cart[id].quantity<=0){
        delete cart[id]
      }
    }
    document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
  }
    const addPizza = ()=>{
      addCookieItem(`${pizza.id}`,'add')
    }
  return (
    <div className='pizza-card'>
        <img src={pizza.pic}/>
        <div className='pizza-scroll'>
            <h2>{pizza.name}</h2>
            <div className='pizza-header'>
                <button className='add-pizza' onClick={addPizza}>add to command</button>
                <div className='price'>{pizza.price} €</div>
            </div>
        </div>
    </div>
  )
}
