import { THREE_HOURS_IN_MS } from "./consts"
export const formatDate = date => {
   const newDate = new Date(date).toLocaleDateString('es-AR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
   })

   const [weekday, month, time] = newDate.split(', ')

   return {
      weekday,
      month,
      time
   }
}

export const formatDay = dateInNumber => {
   const { weekday, month, time } = formatDate(new Date())
   const dayInNumber = Number(month.split(' ')[0])
   const results = dateInNumber - dayInNumber
   if (results === 0) {
      return 'hoy'
   }
   if (results === 1) {
      return 'mañana'
   }
   if (results === -1) {
      return 'ayer'
   } else {
      return null
   }

}

export const formatDateTime = (date, time) => {
      const datetime = `${date}T${time}:00.000Z`
      return new Date(datetime).getTime() + THREE_HOURS_IN_MS
}