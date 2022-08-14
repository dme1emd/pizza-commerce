import React from 'react'

export const Pizza = ({pizza}) => {
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
    const addPizza = ()=>{
      addCookieItem(pizza.id,'add')
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
