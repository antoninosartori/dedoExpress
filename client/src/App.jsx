import { Route, Routes } from 'react-router-dom'
import TravelContextState from './context/TravelsContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CreateTravelPage from './pages/CreateTravelPage'
import TravelDetailsPage from './pages/TravelDetailsPage'
import SingUpPage from './pages/SingUpPage'
import UserDetailsPage from './pages/UserDetailsPage'

function App() {

   return (
      <>

         < Header />
         
         <TravelContextState>
            <Routes>
               <Route path='/' element={ < HomePage /> } />
               <Route path='/login' element={ < LoginPage /> } />
               <Route path='/singUp' element={ < SingUpPage /> } />
               <Route path='/createTravel' element={< CreateTravelPage /> } />
               <Route path='/travelDetails/:travelId' element={ < TravelDetailsPage /> } />
               <Route path='/user/:userId' element={ < UserDetailsPage /> } />
            </Routes>
         </TravelContextState>

         
      </>
   )
}

export default App
