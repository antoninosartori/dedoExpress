import Header from '../components/Header'
import './HelpPage.css'
import Button from '../components/Button'
import TextWithTitle from '../components/TextWithTitle'

export default function HelpPage() {
   return (
      <>
         <Header />

         <main className='container helpPage'>
            

            <TextWithTitle title='¡Ayudanos a mejorar!'>
               <p>Estamos abiertos para recibir sugerencias y comentarios.</p>
               <p>Si tenés algún error o querés preguntarnos algo podés hacerlo via Whatsapp</p>
            </TextWithTitle>
            <Button type='button' primary>
               <a href={`https://api.whatsapp.com/send/?phone=3446544456&text=Hola, quiero comunicarme para...`} target='_blank' rel='noreferrer'>
                  Comunicarme
               </a>
            </Button>
         </main>
      </>
   )
}
