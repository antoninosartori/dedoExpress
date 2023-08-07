import './DesktopNav.css'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

export default function DesktopNav({ handleLogOut, user }) {
   const linkToUserDetails =
      !user
         ? ''
         : `/user/${user.userId}`

   return (
      <ul className='desktop-navMenu'>
         <li>
            <Link className='createTravel-navLink' to='/createTravel'>Crear viaje</Link>
         </li>
         <li>
            <Link onClick={handleLogOut}>
               Cerrar sesion
            </Link>
         </li>
         <li>
            <Link to={linkToUserDetails}>
               < Avatar avatarSrc={user?.avatar?.url} username={user.username} />
            </Link>
         </li>
      </ul>
   )
}
