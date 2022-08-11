import React, { useContext, useEffect, useState } from 'react'
import DomainContext from '../context/DomainContext'
export const SearchPizzeria = () => {
  const [search,setSearch]=useState('')
  const {domain}=useContext(DomainContext)
  const handleChange=async (e)=>{
    setSearch(e.target.value)
  }
  const getPizzerias=async()=>{
    const response = await fetch(`${domain}pizzeria/${search}`)
    const data = await response.json()
    console.log(data)}
  useEffect(()=>{getPizzerias()},[search])
  return (
    <div>
      <form>
        <input type='search' onChange={handleChange} value={search}/>
      </form>
    </div>
  )
}
