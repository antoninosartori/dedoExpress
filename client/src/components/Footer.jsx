import './Footer.css'
export default function Footer() {
   return (
      <footer className='footer-component'>
         <div className='footer-flex'>
            <p>
               <div className='DedoExpress-footer'>
                  <span className='bold'>Dedo</span>
                  <span>Express</span>
               </div>
               es un producto de
               <a className='hover bold' target='_blank' rel='noreferrer' href="https://kumpel.com.ar/">Kumpel</a>
            </p>
         </div>
      </footer>
   )
}
