import { createContext, useContext, useEffect, useState } from "react";
import DomainContext from "./DomainContext";
import jwt_decode from "jwt-decode";
const AuthContext = createContext()
export default AuthContext
export const AuthProvider = ({children}) => {
    const [token , setToken] = useState(localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : null)
    const [pizzeriaId , setPizzeriaId] = useState(token ? jwt_decode(token.access).user_id : null)
    const {domain} = useContext(DomainContext)
  return (
    <AuthContext.Provider value={{pizzeriaId , setPizzeriaId , token , setToken}}>
        {children}
    </AuthContext.Provider>
  )
}
