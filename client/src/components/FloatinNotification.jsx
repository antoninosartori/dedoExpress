import './FloatinNotification.css'
import { useContext, useEffect, useState } from 'react'
import {NotificationContext} from '../context/FloatinNotificationContext'

export default function FloatinNotification({ message, duration, status }) {
   const [visible, setVisible] = useState(true)
   const { setFloatingNotification } = useContext(NotificationContext)
   
   const textMessage = message ?? ''
   const durationTime = duration ?? 3000
   const visibility = visible ? '' : 'inactive'
   const notificationClassName = status ? `fl-notification-${status}` : `fl-notification-error`

   useEffect(() => {
      setTimeout(() => {
         setFloatingNotification({})
         setVisible(false)
      }, durationTime)
   }, [])

   return (
      <div className={`floatinNotification-container ${notificationClassName} ${visibility}`} >
         <p className='floatinNotification-text'>{textMessage}</p>
      </div>
   )
}
