import './TravelDetailsPage.css'
import { useContext, useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import useGetTravels from '../hooks/useGetTravels'
import useGetOneTravel from '../hooks/useGetOneTravel'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import FloatinNotification from '../components/FloatinNotification'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import Header from '../components/Header'
import RowItemWithIcon from '../components/RowItemWithIcon'
import fromIcon from '../assets/location_on.svg'
import toIcon from '../assets/sports_score.svg'
//import timeArriveIcon from '../assets/time_arrive.svg'
import calendarTodayIcon from '../assets/calendar_today.svg'
import priceIcon from '../assets/attach_money.svg'
import capacityIcon from '../assets/capacity.svg'
import callIcon from '../assets/call.svg'
import schedule from '../assets/schedule.svg'
import writeIcon from '../assets/write.svg'
import petIcon from '../assets/pet_supplies.svg'
import luggageIcon from '../assets/luggage.svg'
import musicIcon from '../assets/music_note.svg'
import fastfoodIcon from '../assets/fastfood.svg'
import voiceIcon from '../assets/voice_selection.svg'
import { formatDate } from '../helpers/formatDate'

export default function TravelDetailsPage() {
   const { user: userLogged } = useContext(UserContext)
   const { travel } = useGetOneTravel()
   const { handleTravelDelete } = useGetTravels()
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const { title, from, to, price, capacity, user, _id: travelId, date, features } = travel
   
   const { weekday, month, time } = formatDate(date)
  
   useEffect(() => {
      window.scrollTo(0,0)
   },[])

   useEffect(() => {
      if (userLogged === null) {
         navigate('/login')
      }
   }, [userLogged])

   const defaultText = user ? `Hola ${user[0].username}, me gustaria viajar con vos a ${to}.` : ''

   const isOwner =
      !user
         ? false
         : userLogged.userId === user[0]._id
   return (
      <>
         < Header />

         <main className='container travelDetailsPage'>



            {floatingNotification.message &&
               <FloatinNotification
                  message={floatingNotification.message}
                  status={floatingNotification.status}
                  duration={floatingNotification.duration}
               />
            }
            {isLoading &&
               < LoadingSpinner text='cargando viaje' />
            }

            {travel && !isLoading &&
               <>
                  <h2 className='subtitle'>Detalles del viaje</h2>
                  <section className='travelDetails-container shadow'>
                     <div className='travelDetails-separator'>
                        <div className='travelDetails-travelInfo'>
                           <RowItemWithIcon icon={fromIcon} text={from} />
                           <RowItemWithIcon icon={toIcon} text={to} />
                           <RowItemWithIcon icon={calendarTodayIcon} text={`Sale el ${month}`} />
                           <RowItemWithIcon icon={schedule} text={`Hora de salida: ${time} hs`} />
                           <RowItemWithIcon icon={capacityIcon} text={`Lugares disponibles: ${capacity}`} />
                           <RowItemWithIcon icon={priceIcon} text={`Precio: $${price} por persona`} />
                        </div>
                     </div>
                     <div className='travelDetails-separator travelDetails-features'>
                        <h3>Características</h3>
                        <div className='features-gridContainer'>
                           <RowItemWithIcon text='Mascotas permitidas' icon={petIcon} toggleTextClassName={!features?.pet ? `feature-false` : ''} toggleIconClassName={!features?.pet ? `feature-false` : ''}  />
                           <RowItemWithIcon icon={luggageIcon} text='Baúl para equipaje' toggleTextClassName={!features?.luggage ? `feature-false` : ''} toggleIconClassName={!features?.luggage ? `feature-false` : ''} />
                           <RowItemWithIcon icon={musicIcon} text='Buena música' toggleTextClassName={!features?.music ? `feature-false` : ''} toggleIconClassName={!features?.music ? `feature-false` : ''} />
                           <RowItemWithIcon icon={fastfoodIcon} text='Permitido comer' toggleTextClassName={!features?.food ? `feature-false` : ''} toggleIconClassName={!features?.food ? `feature-false` : ''} />
                           <RowItemWithIcon icon={voiceIcon} text='Charlatán' toggleTextClassName={!features?.talk ? `feature-false` : ''} toggleIconClassName={!features?.talk ? `feature-false` : ''}/>

                        </div>
                     </div>
                     {isOwner &&
                        <div className='travelDetails-ownerContainer'>
                           <Button type='button' secondary>
                              Ocultar
                           </Button>
                           <Button type='button' secondary>
                              <Link to={`/updateTravel/${travelId}`}>
                                 Modificar
                              </Link>
                           </Button>
                           <Button type='button' secondary onClickFunction={() => handleTravelDelete(travelId)}>Eliminar</Button>
                        </div>
                     }
                  </section>

                  {user && !isLoading &&
                     <>
                        <h2 className='subtitle'>Datos del conductor</h2>
                        <section className='travelDetails-driverInfo'>
                           <div className='travelDetails-driverInfo-flex shadow'>
                              <div className='travelDetails-driverInfo_avatarContainer'>
                                 < Avatar avatarSrc={user[0].avatar.url} username={user[0].username} />
                              </div>
                              <div className='travelDetails-driverInfo-content'>
                                 <h4>{user[0].username}</h4>
                                 <RowItemWithIcon icon={callIcon} text={`+${user[0].cellphone}`} />
                              </div>
                           </div>

                           <Button type='button' primary>
                              <a className='linkToMessage' href={`https://api.whatsapp.com/send/?phone=${user[0].cellphone}&text=${defaultText}`} target='_blank' rel='noreferrer'>
                                 ¡Me sumo!
                                 <img src={writeIcon} alt="contacta al conductor" />
                              </a>
                           </Button>

                        </section>

                     </>
                  }
               </>
            }
         </main >
      </>
   )
}
