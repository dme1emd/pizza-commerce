import { createContext } from "react";

const DomainContext = createContext()
export default DomainContext
export const DomainProvider = ({children}) => {
  return (
    <DomainContext.Provider value={{domain:"http://127.0.0.1:8000/api/"}}>
        {children}
    </DomainContext.Provider>
  )
}
