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
import Toggable from '../components/Toggable'
import FloatinNotification from '../components/FloatinNotification'
import Avatar from './Avatar'

export default function TravelCard({ travel, ...restOfProps }) {
   const { floatingNotification } = useContext(NotificationContext)

   const { _id: travelId, title, from, to, price, capacity, date, time, user } = travel
   const { _id: userId, username, cellphone, avatar } = user[0]
   const { url: avatarUrl } = avatar
   

   /* hay que mejorar esto 👇 */
   const [firstSplitDate] = date.split('T')
   const [year, month, day] = firstSplitDate.split('-')
   const dateToShow = `${day}/${month}`

   return (
      <>

         { floatingNotification.message && 
            < FloatinNotification
               message={floatingNotification.message} 
               status={floatingNotification.status} 
               duration={floatingNotification.duration} 
               /> 
         }
         
         <article className='travelCard-container'>

            <header className='travelCard-header'>
               <div className='travelCard-header_userAvatar'>
                  {/* <img src={userIcon} alt={`usuario ${username}`} /> */}
                  < Avatar avatarSrc={avatarUrl} username={username} />
               </div>
               <div className='travelCard-header_userInfo'>
                  <h3 className='travelCard-usernameText'>{username}</h3>
                  <p className='travelCard-titleText'>{title}</p>
               </div>
            </header>

            <Toggable icon={chevronIcon}>
               <div className="travelCard-body">
                  <div className="travelCard-body_destinationContainer">
                     <div className="travelCard-rowGroup">
                        <img src={travelIcon} alt="lugar de salida y de destino" />
                        <div className='travelCard-columnGroup'>
                           <h3 className='travelCard-from'>{from}</h3>
                           <h3 className='travelCard-to'>{to}</h3>
                        </div>
                     </div>
                     <Link to={`/travelDetails/${travelId}`}>ver detalles</Link>
                  </div>

                  <aside className='travelCard-body_aside'>
                     <div className="travelCard-rowGroup">
                        <span>{dateToShow}</span>
                        <img src={calendarIcon} alt="" />
                     </div>
                     <div className="travelCard-rowGroup">
                        <span>{time}</span>
                        <img src={timeIcon} alt="" />
                     </div>
                     <div className="travelCard-rowGroup">
                        <span>{capacity}</span>
                        <img src={capacityIcon} alt="" />
                     </div>
                     <div className="travelCard-rowGroup">
                        <span>${price}</span>
                        <img src={priceIcon} alt="" />
                     </div>
                  </aside>
               </div>
            </Toggable>

         </article>
      </>
   )
}
