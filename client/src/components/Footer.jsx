import './Footer.css'
import {Link} from 'react-router-dom'
import InstagramIcon from '../assets/InstagramIcon'
import LinkedInIcon from '../assets/LinkedIn'
import SiteIcon from '../assets/SiteIcon'
export default function Footer() {
   return (
      <footer className='footer-component'>
         <div className='footer-flex'>
            <div className='footer-textContainer'>
               <p>
                  <span className='bold'>Dedo</span>
                  Express es un producto de <a href="https://kumpel.com.ar/" target='_blank' rel='noreferrer' className='hover bold'>Kumpel</a>
               </p>
            </div>
            <div className='footer-iconsContainer'>
               <a href="https://kumpel.com.ar/" target='_blank' rel='noreferrer' className='hover'>
                  < SiteIcon />
               </a>
               <a href="https://www.linkedin.com/company/kumpel/" target='_blank' rel='noreferrer' className='hover'>
                  < LinkedInIcon />
               </a>
               <a href="https://www.instagram.com/kumpelweb/?igshid=MzRlODBiNWFlZA%3D%3D" target='_blank' rel='noreferrer' className='hover'>
                  < InstagramIcon />
               </a>

            </div>
            <Link to='/help'>Necesito ayuda</Link>
         </div>
      </footer>
   )
}
