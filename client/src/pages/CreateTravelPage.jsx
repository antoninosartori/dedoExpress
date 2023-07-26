import './CreateTravelPage.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateTravelForm from '../hooks/useCreateTravelForm'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import fromIcon from '../assets/from.svg'
import toIcon from '../assets/to.svg'
import capacityIcon from '../assets/people-fill.svg'
import priceIcon from '../assets/currency-dollar.svg'
import titleIcon from '../assets/write.svg'

export default function CreateTravelPage() {
   const { user } = useContext(UserContext)
   const { handleCreateTravel, handleChangeTitle, handleChangeFrom, handleChangeTo, handleChangeCapacity, handleChangePrice, handleChangeDateTime} = useCreateTravelForm()
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const navigate = useNavigate()

   if (user === null) {
      navigate('/login')
   }
   
   return (
      <main className='container createTravel'>
         <form onSubmit={handleCreateTravel}>

            { floatingNotification.message && 
               < FloatinNotification 
                  message={floatingNotification.message} 
                  status={floatingNotification.status} 
                  duration={floatingNotification.duration} 
               />
            }

            {isLoading && < LoadingSpinner text='creando viaje...' />}

            <h2>Crea tu viaje</h2>
            <div className="formGroup">
               <img src={titleIcon} alt="escribe una descripcion" className="icon" />
               <input onChange={handleChangeTitle} name='title' type="text" placeholder='breve descripcion de tu viaje' autoComplete='off' />
            </div>
            <label className='formGroup-label' htmlFor="title">{`"...Voy y vengo a Gualeguaychu..."`}</label>

            <div className="formGroup">
               <img className='icon' src={fromIcon} alt="desde donde" />
               <input onChange={handleChangeFrom} name='from' type="text" placeholder='¿De donde salis?' autoComplete='off' />
            </div>
            <label className='formGroup-label' htmlFor="title">{`"...Larroque..."`}</label>

            <div className="formGroup">
               <img className='icon' src={toIcon} alt="hasta donde" />
               <input onChange={handleChangeTo} name='to' type="text" placeholder='¿Donde vas?' autoComplete='off' />
            </div>
            <label className='formGroup-label' htmlFor="title">{`"...Gualeguaychu..."`}</label>

            <div className="formGroup">
               <div className="formGroup">
                  <img className='icon' src={capacityIcon} alt="cuantos podes llevar" />
                  <input onChange={handleChangeCapacity} name='capacity' type="number" placeholder='¿Lugares?' autoComplete='off' />
               </div>
               <div className="formGroup">
                  <img className='icon' src={priceIcon} alt="precio por persona" />
                  <input onChange={handleChangePrice} name='price' type="number" placeholder='¿Precio?' autoComplete='off' />
               </div>
            </div>
            <div className='formGroup'>
               <input onChange={handleChangeDateTime} name='dateTime'  type="datetime-local" placeholder='¿Que dia?' autoComplete='off' />
            </div>
            
            <Button type='submit'>Crear viaje</Button>
            
         </form>
      </main>
   )
}
