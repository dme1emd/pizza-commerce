import { createContext, useState } from "react";

const TotalContext = createContext()
export default TotalContext
export const TotalProvider = ({children}) => {
    const [total , setTotal]=useState(0)
  return (
    <TotalContext.Provider value={{total , setTotal}}>
        {children}
    </TotalContext.Provider>
  )
}
