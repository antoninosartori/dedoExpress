const DATE_UNITS = {
   day: 86400,
   hour: 3600,
   minute: 60,
   second: 1
}

const getSeccondsDiff = timestamp => (Date.now() - timestamp) / 1000

const getUnitAndValueDate = (secondsElapsed) => {
   for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
      if(secondsElapsed >= secondsInUnit || unit === 'second') {
         const value = Math.floor(secondsElapsed / secondsInUnit) * -1
         return { value, unit }
      }
   }
}

const getTimeAgo = (timestamp, locale) => {
   const rtf = new Intl.RelativeTimeFormat(locale)
   const secondsElapsed = getSeccondsDiff(timestamp)
   const { value, unit } = getUnitAndValueDate(secondsElapsed)
   return rtf.format(value, unit)
}

export default function useTimeAgo(timestamp) {
   
   const locale = 'es'
   const timeAgo = getTimeAgo(timestamp, locale)

   const date = new Date(timestamp)
   const formattedDate = new Intl.DateTimeFormat(locale, {
      weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
   }).format(date)
   return {
      formattedDate,
      timeAgo
   }
}

