import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

const UserContextState = ({ children }) => {
   const [user, setUser] = useState(null)
   useEffect(() => {
      const isUserInLocalStorage = window.localStorage.getItem('userFromDedoUp')
      isUserInLocalStorage !== null && setUser(JSON.parse(isUserInLocalStorage))
   }, [])

   return (
      <UserContext.Provider value={{
         user, setUser,
      }}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextState
