import { createContext, useState } from "react";

const TotalContext = createContext()
export default TotalContext
export const TotalProvider = ({children}) => {
    const [total , setTotal]=useState(0)
    const [notif , setNotif]=useState(false)
  return (
    <TotalContext.Provider value={{total , setTotal , notif , setNotif}}>
        {children}
    </TotalContext.Provider>
  )
}
