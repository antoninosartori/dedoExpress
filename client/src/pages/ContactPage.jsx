import './ContactPage.css'
import { useContext } from 'react'
import { sendMessage } from '../services/message'
import { REGEX_EMAIL } from '../helpers/consts'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import Button from '../components/Button'
import TextWithTitle from '../components/TextWithTitle'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import AtIcon from '../assets/AtIcon'

export default function ContactPage() {
   const { register, handleSubmit, formState: { errors } } = useForm()
   const { floatingNotification, setFloatingNotification, isLoading, setIsLoading } = useContext(NotificationContext)

   const handleSubmitMessage = async ({ name, email, message }) => {
      if (!name || !email || !message) { return }

      try {
         setIsLoading(true)
         const bodyMessage = {
            name, email, message
         }
         const results = await sendMessage(bodyMessage)
         console.log(results)
         setFloatingNotification({
            message: 'mensaje enviado correctamente.',
            status: 'success',
            duration: 3000
         })
      } catch (error) {
         console.log(error)
         setFloatingNotification({
            message: 'Lo siento, no hemos podido enviar tu mensaje.',
            status: 'error',
            duration: 3000
         })
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <>
         <Header />

         <main className='container contactPage'>

            <TextWithTitle title='¡Ayudanos a mejorar!'>
               <p>Estamos abiertos para recibir sugerencias y comentarios.</p>
               <p>Si tenés algún error o querés preguntarnos algo podés hacerlo via Whatsapp</p>
            </TextWithTitle>
            <TextWithTitle title='Te facilitamos nuestro email'>
               <div className='icon-email-kumpel'>
                  < AtIcon color='#1d0100' width={22} height={22} />
                  <a className='hover' href='mailto:contacto@kumpel.com.ar'>contacto@kumpel.com.ar</a>
               </div>
            </TextWithTitle>

            <form onSubmit={handleSubmit(handleSubmitMessage)}>
               
               <div className='formGroup'>
                  <input
                     {...register('name', {
                        required: 'Por favor, escribe tu nombre',
                        minLength: { value: 3, message: 'El nombre debe contener al menos 3 letras' },
                        maxLength: { value: 20, message: 'El nombre puede contener hasta 20 letras' }
                     })}
                     type="text"
                     placeholder='Tu nombre'
                  />
                  
                  <input
                     {...register('email', {
                        required: 'Completá con tu email',
                        pattern: {
                           value: REGEX_EMAIL,
                           message: 'Debes introducir un email válido'
                        }
                     })}
                     type="email" placeholder='Tu email'
                  />
               </div>
               <textarea {...register('message', {
                  required: 'Por favor, escribe tu mensaje',
                  minLength: { value: 5, message: 'Por favor, escribe un mensaje un poco mas largo' },
                  maxLength: { value: 200, message: 'El mensaje es muy largo, escribe hasta 200 caracteres' }
               })}
                  cols="30" rows="5" placeholder='Escribe tu mensaje...'>
               </textarea>
               <Button disabledButton={isLoading ?? false} type='submit' primary>{isLoading ? < LoadingSpinner withoutText /> : 'Enviar mensaje'}</Button>
               {errors.name?.message && < ErrorMessage errorMessage={errors.name?.message} />}
               {errors.email?.message && < ErrorMessage errorMessage={errors.email?.message} />}
               {errors.message?.message && < ErrorMessage errorMessage={errors.message?.message} />}
            </form>

            <Button type='button' secondary>
               <a href={`https://api.whatsapp.com/send/?phone=3446608751&text=Hola, quiero comunicarme para...`} target='_blank' rel='noreferrer'>
                  Contacto por WhatsApp
               </a>
            </Button>
            {floatingNotification.message &&
               < FloatinNotification message={floatingNotification.message}
                  status={floatingNotification.status}
                  duration={floatingNotification.duration}
               />}
         </main>
      </>
   )
}
