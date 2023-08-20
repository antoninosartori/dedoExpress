import Header from '../components/Header'
import './HelpPage.css'
import Button from '../components/Button'

export default function HelpPage() {
  return (
      <>
         <Header />

         <main className='container helpPage'>
            <p>Si tenes algun error o quieres preguntar al podes hacerlo via Whatsapp</p>
            <Button type='button' primary>
                  <a href={`https://api.whatsapp.com/send/?phone=3446544456&text=Hola, quiero comunicarme para...`} target='_blank' rel='noreferrer'>
                     Comunicarme
                  </a>
               </Button>
         </main>
      </>
  )
}
