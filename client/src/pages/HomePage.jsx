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

export default function HomePage() {
   const { allTravels } = useContext(TravelContext)
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { getInitialAllTravel } = useGetTravels()
   const [travels, setTravels] = useState(allTravels)
   const navigate = useNavigate()

   useEffect(() => {
      const initialTravels = getInitialAllTravel()
      setTravels(initialTravels)
   }, [])

   useEffect(() => {
      setTravels(allTravels)
   }, [allTravels])

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])


   return (
      <>
         < Header />
         <main className='container homePage'>
            {floatingNotification.message && < FloatinNotification message={floatingNotification.message} status={floatingNotification.status} duration={floatingNotification.duration} />}

            {/* <section>
            <Nav />

            < SearchFormHome />
         </section> */}

            < SearchFormHome />

            <h2 className='subtitle'>Viajes disponibles</h2>

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
