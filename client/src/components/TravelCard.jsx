import './TravelCard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import useTimeAgo from '../hooks/useTimeAgo'
import { NotificationContext } from '../context/FloatinNotificationContext'
import FloatinNotification from '../components/FloatinNotification'
import Avatar from './Avatar'
import Toggable from '../components/Toggable'
import Button from '../components/Button'
import priceIcon from '../assets/attach_money.svg'
import capacityIcon from '../assets/capacity.svg'
import chevronIcon from '../assets/chevron-down.svg'
import rigthArrow from '../assets/arrow_right_alt.svg'
import calendarTodayIcon from '../assets/calendar_today.svg'
import schedule from '../assets/schedule.svg'
import RowItemWithIcon from './RowItemWithIcon'
import { formatDay } from '../helpers/formatDate'




export default function TravelCard({ travel, ...restOfProps }) {
   const { floatingNotification } = useContext(NotificationContext)

   const { _id: travelId, title, from, to, price, capacity, date, user } = travel
   const { _id: userId, username, cellphone, avatar } = user[0]
   const { url: avatarUrl } = avatar

   const { formattedDate, timeAgo } = useTimeAgo(date)
   const [weekday, month, time] = formattedDate.split(', ')
   const dayInNumber = Number(month.split(' ')[0])
   const dayInfo = formatDay(dayInNumber)

   const defaultText = user ? `Hola ${user[0].username}, me gustaria viajar con vos a ${to}.` : ''

   return (
      <>

         {floatingNotification.message &&
            < FloatinNotification
               message={floatingNotification.message}
               status={floatingNotification.status}
               duration={floatingNotification.duration}
            />
         }

         <article className='travelCard-container shadow'>

            <header className='travelCard-header'>
               <div className='travelCard-header_userAvatar'>
                  < Avatar avatarSrc={avatarUrl} username={username} />
               </div>
               <div className='travelCard-header_userInfo'>
                  <p className='travelCard-locations'>
                     {from}
                     <img src={rigthArrow} alt="hacia donde" />
                     {to}
                  </p>
                  <h3 className='travelCard-usernameText'>{username}</h3>
               </div>
               {/* {dayInfo &&
                  <div className='travelCard-dayInfo'>
                     <span>{dayInfo}</span>
                  </div>
               } */}
            </header>

            <Toggable icon={chevronIcon} initialState>
               <div className="travelCard-body">
                  <RowItemWithIcon icon={calendarTodayIcon} text={`Sale el ${month}`} />
                  <RowItemWithIcon icon={schedule} text={`Hora de salida: ${time} hs`} />
                  <RowItemWithIcon icon={capacityIcon} text={`Lugares disponibles: ${capacity}`} />
                  <RowItemWithIcon icon={priceIcon} text={`Precio: $${price} por persona`} />
               </div>

            </Toggable>
            <footer className='travelCard-footer'>
               <Button type='button' primary>
                  <Link to={`/travelDetails/${travelId}`}>Ver detalles</Link>
               </Button>
               <Button type='button' secondary>
                  <a href={`https://api.whatsapp.com/send/?phone=${user[0].cellphone}&text=${defaultText}`} target='_blank' rel='noreferrer'>¡Me sumo!</a>
               </Button>
            </footer>
         </article>
      </>
   )
}
