import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_NAME } from "../helpers/consts";

export const UserContext = createContext()

const UserContextState = ({ children }) => {
   const [user, setUser] = useState(null)
   useEffect(() => {
      const isUserInLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_NAME)
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
