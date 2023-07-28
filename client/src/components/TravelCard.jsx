import './TravelCard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { NotificationContext } from '../context/FloatinNotificationContext'
import travelIcon from '../assets/travel.svg'
import userIcon from '../assets/account_.svg'
import calendarIcon from '../assets/calendar.svg'
import timeIcon from '../assets/alarm.svg'
import priceIcon from '../assets/currency-dollar.svg'
import capacityIcon from '../assets/people-fill.svg'
import chevronIcon from '../assets/chevron-down.svg'
import rightChevronIcon from '../assets/chevron-double-right.svg'
import Toggable from '../components/Toggable'
import FloatinNotification from '../components/FloatinNotification'
import Avatar from './Avatar'

export default function TravelCard({ travel, ...restOfProps }) {
   const { floatingNotification } = useContext(NotificationContext)

   const { _id: travelId, title, from, to, price, capacity, date, user } = travel
   const { _id: userId, username, cellphone, avatar } = user[0]
   const { url: avatarUrl } = avatar

   const dateTime = 
      date 
         ? new Date(date).toLocaleDateString('es-AR', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'
         })
         : null
      
   const [ day, dayNumberAndMonth, time] = dateTime.split(', ')
   
   return (
      <>

         {floatingNotification.message &&
            < FloatinNotification
               message={floatingNotification.message}
               status={floatingNotification.status}
               duration={floatingNotification.duration}
            />
         }

         <article className='travelCard-container'>

            <header className='travelCard-header'>
               <div className='travelCard-header_userAvatar'>
                  < Avatar avatarSrc={avatarUrl} username={username} />
               </div>
               <div className='travelCard-header_userInfo'>
                  <h3 className='travelCard-usernameText'>{username}</h3>
                  <p className='travelCard-locations'>
                     {from}
                     <img src={rightChevronIcon} alt="hacia donde" />
                     {to}
                  </p>
               </div>
            </header>

            <Toggable icon={chevronIcon} initialState>
               <div className="travelCard-body">
                     <div className="travelCard-rowGroup">
                        <img src={calendarIcon} alt="" />
                        <span>sale:</span>
                        <span className='bold'>{`${day}, ${dayNumberAndMonth}`}</span>
                     </div>
                     <div className="travelCard-rowGroup">
                        <img src={timeIcon} alt="" />
                        <span>hora:</span>
                        <span className='bold'>{time}hs</span>
                     </div>
                     <div className="travelCard-rowGroup">
                        <img src={capacityIcon} alt="" />
                        <span>lugares disponibles:</span>
                        <span className='bold'>{capacity}</span>
                     </div>
                     <div className="travelCard-rowGroup">
                        <img src={priceIcon} alt="" />
                        <span>precio por persona:</span>
                        <span className='bold'>${price}</span>
                     </div>
                     <Link className='travelCard-linkToDetails bold' to={`/travelDetails/${travelId}`}>ver detalles</Link>
               </div>
            </Toggable>

         </article>
      </>
   )
}
