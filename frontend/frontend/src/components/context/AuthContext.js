import { createContext, useContext, useEffect, useState } from "react";
import DomainContext from "./DomainContext";

const AuthContext = createContext()
export default AuthContext
export const AuthProvider = ({children}) => {
    const [pizzeriaId , setPizzeriaId] = useState(null)
    const {domain} = useContext(DomainContext)
    const getPizzeriaId = async()=>{
        const response = await fetch(`${domain}token/`)
        const data = await response.json()
        console.log(data)
    }
    useEffect(()=>{getPizzeriaId()},[])
  return (
    <AuthContext.Provider value={{pizzeriaId , setPizzeriaId}}>
        {children}
    </AuthContext.Provider>
  )
}
