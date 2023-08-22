import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_NAME, SAFARI_VERSION_SPLIT } from "../helpers/consts";
import Bowser from "bowser"

export const UserContext = createContext()

const UserContextState = ({ children }) => {
   const [user, setUser] = useState(null)
   useEffect(() => {
      const isUserInLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_NAME)
      isUserInLocalStorage !== null && setUser(JSON.parse(isUserInLocalStorage))
   }, [])

   const browser = Bowser.getParser(window.navigator.userAgent);
   const userBrowser = browser.getBrowser()
   const browserVersion = Number(userBrowser.version.split('.')[0])
   const browserName = userBrowser.name
   
   const hasToSplitUI = browserName.toLowerCase() === 'safari' && browserVersion >= SAFARI_VERSION_SPLIT

   return (
      <UserContext.Provider value={{
         user, setUser, hasToSplitUI,
      }}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextState
