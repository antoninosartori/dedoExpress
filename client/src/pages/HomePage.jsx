import './HomePage.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetTravels from '../hooks/useGetTravels'
import { UserContext } from '../context/UserContext'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { TravelContext } from '../context/TravelsContext'
import AddTravelFixed from '../components/AddTravelFixed'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchFormHome from '../components/SearchFormHome'
import FloatinNotification from '../components/FloatinNotification'
import TravelCard from '../components/TravelCard'
import EmptyComponent from '../components/EmptyComponent'
/* import Nav from '../components/Nav' */
import Header from '../components/Header'
import { formatDate } from '../helpers/formatDate'
import { ONE_WEEK_IN_MS } from '../helpers/consts'

export default function HomePage() {
   const { allTravels } = useContext(TravelContext)
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { getInitialAllTravel } = useGetTravels()
   const [travels, setTravels] = useState(allTravels)
   const navigate = useNavigate()

   /* sirve??? 👇 */
   useEffect(() => {
      const initialTravels = getInitialAllTravel()
      setTravels(initialTravels)
   }, [])

   useEffect(() => {
      setTravels(allTravels)
      window.scrollTo(0,0)
   }, [allTravels])

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])


   const handleChangeFilters = (event) => {
      const value = event.target.value
      
      let filter = ''
      if(value === 'all'){
         return setTravels(allTravels)
      }
      if(value === 'thisWeek'){
         const today = new Date().getTime()
         const filteredTravels = allTravels.filter(travel => travel.date - today <= ONE_WEEK_IN_MS  )
         return setTravels(filteredTravels)
      }
      if(value === 'today'){
         filter = Number(formatDate(new Date()).month.split(' ')[0])
      }
      if(value === 'tomorrow'){
         filter = Number(formatDate(new Date()).month.split(' ')[0]) + 1
         // problemas con los 30 o 31
      }
      const filteredTravels = allTravels.filter(travel => Number(formatDate(travel.date).month.split(' ')[0]) === filter )
      setTravels(filteredTravels)
   }

   return (
      <>
         < Header />
         <main className='container homePage'>
            {floatingNotification.message && 
               < FloatinNotification 
                  message={floatingNotification.message} 
                  status={floatingNotification.status} 
                  duration={floatingNotification.duration} 
                  />
            }

            < SearchFormHome />

            <h2 className='subtitle'>Viajes disponibles</h2>

            <div className='filterTravel-container shadow' onChange={handleChangeFilters}>
               <div className='formGroup'>
                  <input type='radio' name="filter" value='all' />
                  <label htmlFor="filter">Todos</label>
               </div>
               <div className='formGroup'>
                  <input  type='radio' name="filter" value='today' />
                  <label htmlFor="filter">Hoy</label>
               </div>
               <div className='formGroup'>
                  <input  type='radio' name="filter" value='tomorrow' />
                  <label htmlFor="filter">Mañana</label>
               </div>
               <div className='formGroup'>
                  <input  type='radio' name="filter" value='thisWeek' />
                  <label htmlFor="filter">Esta semana</label>
               </div>
            </div>

            {isLoading && < LoadingSpinner text='cargando viajes' />}

            {travels.length !== 0 && !isLoading &&
               <section className='travels-container'>
                  {
                     travels.map(travel => (
                        < TravelCard key={travel._id} travel={travel} />
                     ))
                  }
               </section>
            }
            {travels.length === 0 && !isLoading &&
               < EmptyComponent />
            }

            < AddTravelFixed />
         </main>
      </>
   )
}
