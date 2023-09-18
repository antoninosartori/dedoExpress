import './CreateTravelPage.css'
import { useContext, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useCreateTravelForm from '../hooks/useCreateTravelForm'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import RowItemWithIcon from '../components/RowItemWithIcon'
import FloatinNotification from '../components/FloatinNotification'
import ErrorMessage from '../components/ErrorMessage'
import TextWithTitle from '../components/TextWithTitle'
import petIcon from '../assets/pet_supplies.svg'
import luggageIcon from '../assets/luggage.svg'
import musicIcon from '../assets/music_note.svg'
import fastfoodIcon from '../assets/fastfood.svg'
import voiceIcon from '../assets/voice_selection.svg'
// import { CITIES } from '../helpers/consts'



export default function CreateTravelPage() {
   const { user } = useContext(UserContext)
   const { handleCreateTravel } = useCreateTravelForm()
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const { register, handleSubmit, formState: { errors } } = useForm()

   useEffect(() => {
      window.scrollTo(0, 0)
      if (user === null) {
         navigate('/login')
      }
   }, [user])

   return (
      <>
         < Header />
         <main className='container createTravel'>
            {isLoading && < LoadingSpinner text='cargando...' />}

            {floatingNotification.message &&
               < FloatinNotification
                  message={floatingNotification.message}
                  duration={floatingNotification.duration}
               />
            }

            <header>
               <h2 className='subtitle'>Publicar un viaje</h2>
               <article>
                  <TextWithTitle noTitle>
                     <p>Publica un viaje para que otras personas puedan sumarse y dividir gastos.</p>
                  </TextWithTitle>
                  <TextWithTitle noTitle>
                     <p>Recuerda tener un número de teléfono cargado para que se puedan contactar.</p>
                  </TextWithTitle>
               </article>
            </header>

            <form onSubmit={handleSubmit(handleCreateTravel)}>

               <div className='form-separator'>
                  <input
                     {...register('from', {
                        required: 'Completa el lugar de salida con una ciudad',
                        maxLength: { value: 30, message: 'La ciudad de salida debe ser menor a 30 caracteres' },
                        minLength: { value: 3, message: 'El nombre de la ciudad de salida debe ser mayor a 3 caracteres' }
                     })} type='text' placeholder='¿Desde dónde salís?' autoComplete='off' />
                  {errors.from?.message && < ErrorMessage errorMessage={errors.from?.message} />}
                     {/* <input {...register('from', {
                        required: 'Completa el lugar de salida con una ciudad',
                        maxLength: { value: 30, message: 'La ciudad de salida debe ser menor a 30 caracteres' },
                        minLength: { value: 3, message: 'El nombre de la ciudad de salida debe ser mayor a 3 caracteres' }
                     })} list='cities' type="text" placeholder='¿Desde dónde salís?' />
                     <datalist id='cities'>
                        {CITIES.map(city => (
                           <option key={city} value={city}>{city}</option>
                        ))}
                     </datalist> */}

                  <input
                     {...register('to', {
                        required: 'Completa la ciudad de destino',
                        minLength: { value: 3, message: 'La ciudad de destino debe ser mayor a 3 caracteres' },
                        maxLength: { value: 30, message: 'La ciudad de destino debe ser menor a 30 caracteres' }
                     })} type="text" placeholder='¿Hacia dónde vas?' autoComplete='off'
                  />
                  {errors.to?.message && < ErrorMessage errorMessage={errors.to?.message} />}

                  {/* <input {...register('to', {
                        required: 'Completa el lugar de salida con una ciudad',
                        maxLength: { value: 30, message: 'La ciudad de salida debe ser menor a 30 caracteres' },
                        minLength: { value: 3, message: 'El nombre de la ciudad de salida debe ser mayor a 3 caracteres' }
                     })} list='cities' type="text" placeholder='¿Hacia dónde vas?' />
                     <datalist id='cities'>
                        {CITIES.map(city => (
                           <option key={city} value={city}>{city}</option>
                        ))}
                     </datalist> */}

                  <input
                     {...register('capacity', {
                        required: 'Completa el campo de lugares disponibles',
                        min: { value: 1, message: 'El minimo de lugares disponibles es 1' },
                        max: { value: 9, message: 'El maximo de lugares disponibles es de 9' }
                     })} type="number" placeholder='¿Cuántas personas quieres llevar?' autoComplete='off' min={1}
                  />
                  {errors.capacity?.message && < ErrorMessage errorMessage={errors.capacity?.message} />}

                  <input
                     {...register('price', {
                        required: 'Completa el campo del precio por persona',
                        max: { value: 50000, message: 'El precio maximo es de 50.000' },
                        min: 0
                     })}
                     type="number" placeholder='¿Precio por persona?' autoComplete='off' min={0} />
                  {errors.price?.message && < ErrorMessage errorMessage={errors.price?.message} />}

                  <div className="formGroup">
                     <div className='input-group'>
                        <span>Elegí la fecha de salida</span>
                        <input
                           {...register('Date', {
                              required: 'Completá la fecha de salida'
                           })}
                           type='date'
                        />
                     </div>
                     {errors.Date?.message && < ErrorMessage errorMessage={errors.Date?.message} />}

                     <div className='input-group'>
                        <span>Indicá la hora de salida</span>
                        <input
                           {...register('time', {
                              required: 'Completá la hora de salida'
                           })}
                           type='time'
                        />
                     </div>
                     {errors.time?.message && < ErrorMessage errorMessage={errors.time?.message} />}
                  </div>

               </div>
               <div className="form-separator">
                  <TextWithTitle title='Adicionales (opcionales)' >
                     <p>Marca aquellas características que podrían ser interesantes para las personas que quieran viajar con vos</p>
                  </TextWithTitle>

                  <div className="ceckbox-inputContainer">
                     <input {...register('pet')}
                        type="checkbox" />
                     <RowItemWithIcon icon={petIcon} text='Mascotas permitidas' />
                  </div>
                  <div className="ceckbox-inputContainer">
                     <input {...register('luggage')}
                        type="checkbox" />
                     <RowItemWithIcon icon={luggageIcon} text='Baúl para equipaje' />
                  </div>
                  <div className="ceckbox-inputContainer">
                     <input {...register('music')}
                        type="checkbox" />
                     <RowItemWithIcon icon={musicIcon} text='Buena música' />
                  </div>
                  <div className="ceckbox-inputContainer">
                     <input {...register('food')}
                        type="checkbox" />
                     <RowItemWithIcon icon={fastfoodIcon} text='Permitido comer' />
                  </div>
                  <div className="ceckbox-inputContainer">
                     <input {...register('talk')}
                        type="checkbox" />
                     <RowItemWithIcon icon={voiceIcon} text='Charlatán' />
                  </div>
               </div>

               <div className="column-separation">
                  <Button primary type='submit' disabledButton={isLoading ?? false}>{isLoading ? 'Creando viaje...' : 'Publicar viaje'}</Button>
                  <Button onClickFunction={() => navigate(-1)} secondary type='button'>Volver atrás</Button>
               </div>

            </form>
         </main>
      </>
   )
}
