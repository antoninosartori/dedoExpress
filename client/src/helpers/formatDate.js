import { SAFARI_VERSION_SPLIT, THREE_HOURS_IN_MS } from "./consts"
import Bowser from "bowser";
const browser = Bowser.getParser(window.navigator.userAgent);
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
   const userBrowser = browser.getBrowser()
   const { name, version } = userBrowser
   const browserVersion = Number(version.split('.')[0])

   if (name.toLowerCase() === 'safari' && browserVersion >= SAFARI_VERSION_SPLIT) {
      const dateEdited = date.replace(/-/g, "/")
      return new Date(`${dateEdited}T${time}:00.000Z`).getTime()
   } else {
      const datetime = `${date}T${time}:00.000Z`
      return new Date(datetime).getTime() + THREE_HOURS_IN_MS
   }
}