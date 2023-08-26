import { ONE_MONTH_IN_MS } from "./consts"

export const validateDate = timestamp => {
   
   const now = new Date().getTime()
   if(timestamp < now){ 
      return false 
   }
   else if((timestamp - now) > ONE_MONTH_IN_MS ){
      return false 
   } 
   else {
      return true
   }
}