import { Route, Routes } from 'react-router-dom'
import TravelContextState from './context/TravelsContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CreateTravelPage from './pages/CreateTravelPage'
import TravelDetailsPage from './pages/TravelDetailsPage'
import SingUpPage from './pages/SingUpPage'
import UserDetailsPage from './pages/UserDetailsPage'
import UpdateTravelPage from './pages/UpdateTravelPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import ForgottenPassword from './pages/ForgottenPassword'
import NotFound from './pages/NotFound'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer'
import ResetPassword from './pages/ResetPassword'

function App() {

   return (
      <>
         <TravelContextState>
            <Routes>
               <Route path='/' element={< HomePage />} />
               <Route path='/login' element={< LoginPage />} />
               <Route path='/singUp' element={< SingUpPage />} />
               <Route path='/forgotten-password' element={< ForgottenPassword />} />
               <Route path='/reset-password/:token' element={< ResetPassword />} />
               <Route path='/createTravel' element={< CreateTravelPage />} />
               <Route path='/contact' element={< ContactPage />} />
               <Route path='/travelDetails/:travelId' element={< TravelDetailsPage />} />
               <Route path='/updateTravel/:travelId' element={< UpdateTravelPage />} />
               <Route path='/user/:userId/changePassword' element={< ChangePasswordPage />} />
               <Route path='/user/:userId' element={< UserDetailsPage />} />
               <Route path='*' element={< NotFound />} />
            </Routes>
         </TravelContextState>

         < Footer />
      </>
   )
}

export default App
