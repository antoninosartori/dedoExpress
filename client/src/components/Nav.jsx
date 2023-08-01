import { NavLink } from 'react-router-dom'
import './Nav.css'
export default function Nav () {
   return(
      <nav className='navigation-container'>
         <ul >
            <li>
               <NavLink to='/'>Viajes</NavLink>
            </li>
            <li>
               <NavLink to='/personas'>Personas</NavLink>
            </li>
         </ul>
      </nav>
   )
}