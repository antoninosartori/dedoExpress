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
import fromIcon from '../assets/from.svg'
import toIcon from '../assets/to.svg'
import writeIcon from '../assets/write.svg'
//import timeArriveIcon from '../assets/time_arrive.svg'
import timeTravelIcon from '../assets/time_travel.svg'
import dateIcon from '../assets/calendar.svg'
import priceIcon from '../assets/currency-dollar.svg'
import capacityIcon from '../assets/people-fill.svg'
import deleteIcon from '../assets/trash3.svg'
import editIcon from '../assets/pencil.svg'

export default function TravelDetailsPage() {
   const { user: userLogged } = useContext(UserContext)
   const { travel } = useGetOneTravel()
   const { handleTravelDelete } = useGetTravels()
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const { title, from, to, price, capacity, user, _id: travelId, date, time } = travel

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
      <main className='container travelDetailsPage'>

         {isOwner &&
            <div className='travelDetails-ownerContainer'>
               <Link className='updateTravelContainer-withBorder' to={`/updateTravel/${travelId}`}>
                  <img src={editIcon} alt="Modificar viaje" />
                  <span>modificar</span>
               </Link>
               <div className='deleteTravelContainer-withBorder' onClick={() => handleTravelDelete(travelId)}>
                  <img
                     className='deleteTravel-icon'
                     src={deleteIcon}
                     alt="borrar este viaje"
                  />
                  <span>eliminar viaje</span>
               </div>
            </div>
         }

         <h2 className='title'>Detalles del viaje</h2>

         <section>
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
                  <article className='travelDetails-container'>
                     <header className='travelDetails-header'>
                        <img className='icon' src={writeIcon} alt="titulo del viaje" />
                        <h3 className='travelDetails-travelTitle'>{title && `'${title}'`}</h3>
                     </header>

                     <div className="travelDetails-travelInfo">
                        <div className='travelDetails-row'>
                           <div className='travelDetails_travelInfo-left'>
                              <img className='icon' src={fromIcon} alt="lugar de salida" />
                              <div className='travelInfo-columnGroup'>
                                 <span>desde</span>
                                 <h4 className='travelInfo-text leftText'>{from}</h4>
                              </div>
                           </div>
                           <div className='travelDetails_travelInfo-right'>
                              <div className='travelInfo-columnGroup'>
                                 <span>hasta</span>
                                 <h4 className='travelInfo-text rightText'>{to}</h4>
                              </div>
                              <img className='icon' src={toIcon} alt="lugar de salida" />
                           </div>
                        </div>
                        <div className='travelDetails-row'>
                           <div className='travelDetails_travelInfo-left'>
                              <img className='icon' src={dateIcon} alt="fecha de salida" />
                              <div className='travelInfo-columnGroup'>
                                 <span>fecha</span>
                                 <h4 className='travelInfo-text leftText'>{date}</h4>
                              </div>
                           </div>
                           <div className='travelDetails_travelInfo-right'>
                              <div className='travelInfo-columnGroup'>
                                 <span>hora</span>
                                 <h4 className='travelInfo-text rightText'>{time}</h4>
                              </div>
                              <img className='icon' src={timeTravelIcon} alt="hora de salida" />
                           </div>
                        </div>
                        <div className='travelDetails-row'>
                           <div className='travelDetails_travelInfo-left'>
                              <img className='icon' src={capacityIcon} alt="lugares disponibles" />
                              <div className='travelInfo-columnGroup'>
                                 <span>lugares</span>
                                 <h4 className='travelInfo-text leftText'>{capacity}</h4>
                              </div>
                           </div>
                           <div className='travelDetails_travelInfo-right'>
                              <div className='travelInfo-columnGroup'>
                                 <span>precio por persona</span>
                                 <h4 className='travelInfo-text rightText'>{price}</h4>
                              </div>
                              <img className='icon' src={priceIcon} alt="precio por persona" />
                           </div>
                        </div>

                     </div>

                     {user && !isLoading &&
                        <>
                           <header className='travelDetails-driverInfo_header'>
                              < Avatar avatarSrc={user[0].avatar.url} username={user[0].username} />
                              <h3 className='travelDetails-userTitle'>Detalles del conductor</h3>
                           </header>
                           <div className='travelDetails-driverInfo-container'>
                              <div className='travelDetails-row'>
                                 <span>usuario</span>
                                 <h4>{user[0].username}</h4>
                              </div>
                              <div className='travelDetails-row'>
                                 <span>celular</span>
                                 <a href={`https://api.whatsapp.com/send/?phone=${user[0].cellphone}&text=${defaultText}`} target='_blank' rel='noreferrer'>{user[0].cellphone}</a>
                              </div>
                              <div className="travelDetails-row">
                                 <Button>
                                    <a href={`https://api.whatsapp.com/send/?phone=${user[0].cellphone}&text=${defaultText}`} target='_blank' rel='noreferrer'>Contactalo</a>
                                 </Button>
                              </div>
                           </div>
                        </>
                     }
                  </article>

               </>
            }
         </section>
      </main>
   )
}
