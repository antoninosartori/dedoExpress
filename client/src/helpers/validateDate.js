export const validateDate = timestamp => {
   const now = new Date().getTime()
   if(timestamp < now){ 
      return false 
   } else {
      return true
   }
}