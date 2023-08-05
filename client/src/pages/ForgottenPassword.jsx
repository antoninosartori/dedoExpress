import './ForgottenPassword.css'
import Header from '../components/Header'
import TextWithTitle from '../components/TextWithTitle'
import Button from '../components/Button'
export default function ForgottenPassword() {
   return (
      <>
         <Header />
         <main className='container forgottenPassword'>
            <h2 className='subtitle'>Reestablecer contraseña</h2>
            <form>
               <TextWithTitle title='Vamos a recuperar tu cuenta'>
                  <p>Te enviaremos los pasos a seguir por correo electrónico</p>
               </TextWithTitle>
               <input type="email" placeholder='Escribe tu email'/>
               <Button primary >Recuperar</Button>
            </form>
         </main>
      </>
   )
}
