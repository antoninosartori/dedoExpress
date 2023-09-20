import './SearchFormHome.css'
import Button from './Button'
import useGetTravels from '../hooks/useGetTravels';
import InputSearchCity from './InputSearchCity';

export default function SearchFormHome() {
   const { handleChangeFromInput, handleChangeToInput, handleSubmitSearch } = useGetTravels()

   return (
      <form className='searchFormHome-form' onSubmit={handleSubmitSearch} >
         {/* <input type="text" placeholder='¿Dónde estas?' onChange={handleChangeFromInput} autoComplete='off' />
         <input type="text" placeholder='¿A dónde quieres ir?' onChange={handleChangeToInput} autoComplete='off' /> */}
         < InputSearchCity placeholder='¿Dónde estas?' inputId='from' onChangeFunction={handleChangeFromInput} />
         < InputSearchCity placeholder='¿A dónde quieres ir?' inputId='to' onChangeFunction={handleChangeToInput} />
         <Button primary type='submit'>Buscar viajes</Button>
      </form>
   )
}
