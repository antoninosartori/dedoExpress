import './UpdateTravelPage.css'
import { useContext, useEffect } from 'react'
import useUpdateTravel from '../hooks/useUpdateTravel'
import useGetOneTravel from '../hooks/useGetOneTravel'
import { useForm } from 'react-hook-form'
import { validateDate } from '../helpers/validateDate'
import Header from '../components/Header'
import Button from '../components/Button'
import TextWithTitle from '../components/TextWithTitle'
import ErrorMessage from '../components/ErrorMessage'
import FloatinNotification from '../components/FloatinNotification'
import LoadingSpinner from '../components/LoadingSpinner'
import RowItemWithIcon from '../components/RowItemWithIcon'
import petIcon from '../assets/pet_supplies.svg'
import luggageIcon from '../assets/luggage.svg'
import musicIcon from '../assets/music_note.svg'
import fastfoodIcon from '../assets/fastfood.svg'
import voiceIcon from '../assets/voice_selection.svg'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from '../context/FloatinNotificationContext'

export default function UpdateTravelPage() {
   const { isLoading, floatingNotification } = useContext(NotificationContext)
   const { register, handleSubmit, formState: { errors }, setValue } = useForm()
   const { travel } = useGetOneTravel()
   const { handleSumbitUpdateTravel } = useUpdateTravel()
   const navigate = useNavigate()
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      setValue('from', travel.from)
      setValue('to', travel.to)
      setValue('capacity', travel.capacity)
      setValue('price', travel.price)
      setValue('pet', travel.features?.pet)
      setValue('food', travel.features?.food)
      setValue('luggage', travel.features?.luggage)
      setValue('talk', travel.features?.talk)
      setValue('music', travel.features?.music)
   }, [travel._id])

   return (
      <>
         <Header />
         <main className='container updateTravelPage'>

            {floatingNotification.message &&
               < FloatinNotification
                  message={floatingNotification.message}
                  duration={floatingNotification.duration}
               />
            }
            {isLoading && <LoadingSpinner text='cargando...' />}

            {!isLoading &&
               <>
                  <header>
                     <h2 className='subtitle'>Modificar viaje</h2>
                     <article>
                        <TextWithTitle noTitle>
                           <p>Podés cambiar cualquier aspecto de tu viaje.</p>
                        </TextWithTitle>
                     </article>
                  </header>

                  <form onSubmit={handleSubmit(handleSumbitUpdateTravel)}>

                     <div className="form-separator">
                        <div className="formGroup">
                           <label htmlFor="from">¿Desde dónde salís?</label>
                           <input
                              {...register('from', {
                                 required: 'Completa el lugar de salida con una ciudad',
                                 maxLength: { value: 30, message: 'La ciudad de salida debe ser menor a 30 caracteres' },
                                 minLength: { value: 3, message: 'El nombre de la ciudad de salida debe ser mayor a 3 caracteres' }
                              })}
                              type="text" autoComplete='off' placeholder='Lugar de salida' />
                        </div>
                        {errors.from?.message && < ErrorMessage errorMessage={errors.from?.message} />}

                        <div className="formGroup">
                           <label htmlFor="to">¿Hacia dónde vas?</label>
                           <input
                              {...register('to', {
                                 required: 'Completa la ciudad de destino',
                                 minLength: { value: 3, message: 'La ciudad de destino debe ser mayor a 3 caracteres' },
                                 maxLength: { value: 30, message: 'La ciudad de destino debe ser menor a 30 caracteres' }
                              })}
                              type="text" autoComplete='off' placeholder='Lugar de destino' />
                        </div>
                        {errors.to?.message && < ErrorMessage errorMessage={errors.to?.message} />}

                        <div className="formGroup">
                           <label htmlFor="capacity">¿Cuántas personas quieres llevar?</label>
                           <input
                              {...register('capacity', {
                                 required: 'Completa el campo de lugares disponibles',
                                 min: { value: 1, message: 'El minimo de lugares disponibles es 1' },
                                 max: { value: 9, message: 'El maximo de lugares disponibles es de 9' }
                              })}
                              type="number" autoComplete='off' min={1} placeholder='Lugares disponibles' />
                        </div>
                        {errors.capacity?.message && < ErrorMessage errorMessage={errors.capacity?.message} />}

                        <div className="formGroup">
                           <label htmlFor="price">¿Precio por persona?</label>
                           <input
                              {...register('price', {
                                 required: 'Completa el campo del precio por persona',
                                 max: { value: 50000, message: 'El precio maximo es de 50.000' },
                                 min: 0
                              })}
                              type="number" autoComplete='off' min={0} placeholder='Precio por persona' />
                        </div>
                        {errors.price?.message && < ErrorMessage errorMessage={errors.price?.message} />}

                        {/* <div className="formGroup">
                     <label htmlFor="dateTime">¿Fecha y hora de salida?</label>
                     <input
                        {...register('dateTime', {
                           required: 'Por favor, confirma la fecha y hora de salida',
                           validate: value => validateDate(value) || 'Ingresa una fecha futura'
                        })}
                        type="datetime-local" placeholder='Fecha y hora de salida' />
                  </div> */}
                        <div className="formGroup">
                           <input
                              {...register('Date', {
                                 required: 'Completá la fecha de salida'
                              })}
                              type="date" />
                           {errors.Date?.message && < ErrorMessage errorMessage={errors.Date?.message} />}

                           <input
                              {...register('time', {
                                 required: 'Completá la hora de salida'
                              })}
                              type="time" />
                           {errors.time?.message && < ErrorMessage errorMessage={errors.time?.message} />}
                        </div>
                     </div>
                     {errors.dateTime?.message && < ErrorMessage errorMessage={errors.dateTime?.message} />}

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

                     <div className='column-separation'>
                        <Button type='submit' primary >Modificar viaje</Button>
                        <Button type='button' onClickFunction={() => navigate(-1)} secondary >Cancelar</Button>
                     </div>

                  </form>
               </>
            }
         </main>
      </>
   )
}
