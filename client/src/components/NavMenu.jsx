import { useContext } from 'react'
import './NavMenu.css'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../context/FloatinNotificationContext'

export default function NavMenu() {
   const { setFloatingNotification } = useContext(NotificationContext)
   const { user, setUser } = useContext(UserContext)
   const navigate = useNavigate()
   if(user === null){
      navigate('/login')
   } 

   const handleLogOut = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('userFromDedoUp')
      setUser(null)
      navigate('/login')
      setFloatingNotification({message: 'has cerrado sesion correctamente', status: 'success', duration: 3000})
   }

   const linkToUserDetails = 
      !user 
         ? '' 
         : `/user/${user.userId}` 

   return (
      <nav>
         <ul>
            <li>
               <Link to={linkToUserDetails}>
                  {user.username}
               </Link>
            </li>
            { user && 
               <Link onClick={handleLogOut}>
                  Cerrar sesion
               </Link>
            } 
         </ul>
      </nav>
   )
}
