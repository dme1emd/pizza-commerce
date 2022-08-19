import React, { useContext, useEffect, useState } from 'react'
import {BiUpArrow , BiDownArrow} from 'react-icons/bi'
import TotalContext from '../context/TotalContext'
export const Command = ({command}) => {
    const [quantity,setQuantity] = useState(command.quantity)
    const [max , setMax]=useState('')
    const {total ,setTotal} = useContext(TotalContext)
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
          console.log(cart[pizza])
          cart[pizza]['quantity']-=1
          console.log(cart[pizza]['quantity'])
          if(cart[pizza]["quantity"]<=0){
            delete cart[pizza]
          }
        }
        document.cookie = 'cart='+JSON.stringify(cart)+';domain=;path=/'
      }
      const add = ()=>{
        if(quantity <10){
            setQuantity(quantity+1)
            addCookieItem(command.id , 'add')
            setTotal(total+Number(command.price))
        }
        else{
            setMax('max')
        }
      }
      const remove = ()=>{
        quantity != 0 ? setQuantity(quantity-1) : setMax('max')
        addCookieItem(command.id , 'remove')
        setTotal(total-Number(command.price))
    }
    useEffect(()=>{setTotal(total+Number(command.price)*command['quantity'])},[])
    return(
        <div>
            
{            command.custom ? 
            <div className='command'>
            <div className='commanded-header'>
                <h2>custom pizza</h2>
                <div className='quantity-container'>
                    <div className='quantity'>{quantity}</div>
                    <div className={`arrows ${max}`}><BiUpArrow onClick={add}/><BiDownArrow onClick={remove}/> </div>
                </div>
                <div className='quantity'>{`${command.price * quantity}`.slice(0,5)} €</div>
            </div>
            <ul>
                ingredients :
                {command.ingredients.map((ing)=>{
                return<li key={ing}>{ing}</li>
                })}
            </ul>
            </div>
            :
        <div className='command commanded-header'>
            <h2>{command.name}</h2>
            <div className='quantity-container'>
                <div className='quantity'>{quantity}</div>
                <div className={`arrows ${max}`}><BiUpArrow onClick={add}/><BiDownArrow onClick={remove}/> </div>
            </div>
            <div className='quantity'>{`${command.price * quantity}`.slice(0,5)} €</div>
        </div>}
      </div>)
}
