import './Header.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Toggable from './Toggable'
import NavMenu from './NavMenu';
import backIcon from '../assets/chevron-down.svg'
import defaultIcon from '../assets/account.svg'

function Header() {
   const { user } = useContext(UserContext)
   const navigate = useNavigate()
   const returnToHome = user !== null ? '/' : '/login'
   const avatar = user ? user.avatar.url : defaultIcon

   return (
      <header className='pageHeader'>
         <div className='header-logo_container'>
            <Link className='backArrow' onClick={() => navigate(-1)}>
               <img src={backIcon} alt="volver atras" />
            </Link>
            <Link className='header-logo_link' to={returnToHome}>
               <h1 className='logo-text'>DedoExpress</h1>
               {/* <span className='logo-fingerUp'>👍</span> */}
            </Link>
         </div>
         {
            user &&
            <Toggable shownClassName='header-navMenu' animationClassName='translate(100%)' icon={avatar}>
               < NavMenu />
            </Toggable>
         }
      </header>
   )
}

export default Header