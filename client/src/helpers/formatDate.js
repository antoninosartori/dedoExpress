export const formatDate = date => {
   const newDate = new Date(date).toLocaleDateString('es-AR', {
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric'
   })

   const [ weekday, month, time] = newDate.split(', ')

   return {
      weekday, 
      month, 
      time
   }
}