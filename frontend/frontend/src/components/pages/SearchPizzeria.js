import React, { useContext, useEffect, useState } from 'react'
import DomainContext from '../context/DomainContext'
import { Result } from './Result'
export const SearchPizzeria = () => {
  const [search,setSearch]=useState('')
  const [results,setResults]=useState([])
  const {domain}=useContext(DomainContext)
  const handleChange=async (e)=>{
    e.preventDefault()
    setSearch(e.target.value)
  }
  const getPizzerias=async()=>{
    const response = await fetch(`${domain}pizzeria/${search}`)
    const data = await response.json()
    setResults(data)}
  useEffect(()=>{search? getPizzerias():console.log('')},[search])
  return (
    <div>
      <form>
        <input type='search' onChange={handleChange} value={search}/>
      </form>
      {results && search? results.map((res)=><Result res={res}/>):''}
    </div>
  )
}
