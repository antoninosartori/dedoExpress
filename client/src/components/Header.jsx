import { Link } from 'react-router-dom'
import './Header.css'
import Toggable from './Toggable'
import { useContext } from 'react'
import './Header.css'
import NavMenu from './NavMenu';
import account from '../assets/account.svg'
import { UserContext } from '../context/UserContext'
function Header() {
   const { user } = useContext(UserContext)
   const returnToHome = user !== null ? '/' : '/login'
   return (
      <header className='pageHeader'>
         <div className='header-logo_container'>
            <Link className='header-logo_link' to={returnToHome}>
               <h1 className='logo-text'>DedoExpress</h1>
               <span className='logo-fingerUp'>👍</span>
            </Link>
         </div>
         {
            user &&
            <Toggable shownClassName='header-navMenu' animationClassName='translate(100%)' icon={account}>
               < NavMenu />
            </Toggable>
         }
      </header>
   )
}

export default Header