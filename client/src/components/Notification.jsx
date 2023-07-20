import { useEffect, useState } from 'react'
import './Notification.css'

export default function Notification({message, warning, error, success, delay}) {
   const [visible, setVisible] = useState(true)
   const warningClassName = warning ? 'notification-warning' : ''
   const errorClassName = error ? 'notification-error' : ''
   const successClassName = success ? 'notification-success' : ''

   const textMessage = message ?? ''
   const delayTime = delay ?? 5000
   const visibility = visible ? '' : 'inactive'
   const notificationClassName = successClassName || errorClassName || warningClassName

   useEffect(() => {
      setTimeout(() => {
         setVisible(false)
      }, delayTime)
   }, [])

   return (
      <div className={`notification-container ${notificationClassName} ${visibility}`} >
         <p className='notification-text'>{textMessage}</p>
      </div>
   )
}
