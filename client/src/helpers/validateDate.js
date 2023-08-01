export const validateDate = date => {
   const selectedDate = new Date(date).getTime()
   const now = new Date().getTime()
   if(selectedDate < now){ 
      return false 
   } else {
      return true
   }
}