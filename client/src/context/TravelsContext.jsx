import { createContext, useState } from "react";


export const TravelContext = createContext()

export default function TravelContextState ({children}){
   const [ allTravels, setAllTravels] = useState([])
   return(
      <TravelContext.Provider value={{
         allTravels, setAllTravels
      }}
      >
         {children}
      </TravelContext.Provider>
   )
}