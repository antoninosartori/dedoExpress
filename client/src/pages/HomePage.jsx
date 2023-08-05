import './HomePage.css'
import { useCallback, useContext, useEffect, useState } from 'react'
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
import Header from '../components/Header'
import TravelFilters from '../components/TravelFilters'
import useFilters from '../hooks/useFilters'
import { ONE_DAY_IN_MS } from '../helpers/consts'

export default function HomePage() {
   const { allTravels } = useContext(TravelContext)
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { getInitialAllTravel } = useGetTravels()
   /* const { filters } = useFilters() */
   const [travelsToShow, setTravelsToShow] = useState([])
   const [filters, setFilters] = useState({
      min: 0,
      max: ONE_DAY_IN_MS
   })
   const navigate = useNavigate()

   /* sirve??? 👇 */
   useEffect(() => {
      getInitialAllTravel().then(setTravelsToShow)
      window.scrollTo(0,0)
   }, [])

/*    useEffect(() => {
      setTravelsToShow(allTravels)
      window.scrollTo(0,0)
   }, [filters]) */

   useEffect(() => {
      const filteredTravel = allTravels.filter(travel => (travel.date - new Date().getTime() < filters.max) && (travel.date - new Date().getTime() > filters.min))
      setTravelsToShow(filteredTravel)
   }, [filters, allTravels])

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])

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

            < TravelFilters setFilters={setFilters} />

            {isLoading && < LoadingSpinner text='cargando viajes' />}

            {travelsToShow.length !== 0 && !isLoading &&
               <section className='travels-container'>
                  {
                     travelsToShow
                        .map(travel => (
                           < TravelCard key={travel._id} travel={travel} />
                        ))
                  }
               </section>
            }
            {travelsToShow.length === 0 && !isLoading &&
               < EmptyComponent />
            }

            < AddTravelFixed />
         </main>
      </>
   )
}
