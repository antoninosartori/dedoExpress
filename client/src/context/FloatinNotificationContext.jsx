import { createContext, useState } from "react";

export const NotificationContext = createContext()

export default function FloatinNotificationContext({ children }) {
   const [ floatingNotification, setFloatingNotification] = useState({})
   const [ isLoading, setIsLoading ] = useState(false)
   return (
      <NotificationContext.Provider value={{
         floatingNotification, setFloatingNotification, isLoading, setIsLoading
      }}
      >
         {children}
      </NotificationContext.Provider>

   )
}
