import './NavMenu.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

export default function NavMenu({ handleLogOut }) {
   const { user, } = useContext(UserContext)
   const navigate = useNavigate()
   if (user === null) {
      navigate('/login')
   }

   /*    const handleLogOut = (event) => {
         event.preventDefault()
         window.localStorage.removeItem(LOCAL_STORAGE_NAME)
         setUser(null)
         navigate('/login')
         setFloatingNotification({message: 'has cerrado sesion correctamente', status: 'success', duration: 3000})
      } */

   const linkToUserDetails =
      !user
         ? ''
         : `/user/${user.userId}`

   return (
      <nav>
         <ul>
            <li>
               <Link to={linkToUserDetails}>
                  Mi cuenta
               </Link>
            </li>
            {user &&
               <li>
                  <Link onClick={handleLogOut}>
                     Cerrar sesion
                  </Link>
               </li>
            }
            <li>
               <Link to='/contact'>
                  Contacto
               </Link>
            </li>
         </ul>
      </nav>
   )
}
