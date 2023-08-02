import './SearchFormHome.css'
import Button from './Button'
import useGetTravels from '../hooks/useGetTravels';

export default function SearchFormHome() {
   const { handleChangeFromInput, handleChangeToInput, handleSubmitSearch } = useGetTravels()

   return (
      <form className='searchFormHome-form' onSubmit={handleSubmitSearch}>
         <input type="text" placeholder='¿Dónde estas?' onChange={handleChangeFromInput} autoComplete='off' />
         <input type="text" placeholder='¿A dónde quieres ir?' onChange={handleChangeToInput} autoComplete='off' />
         <Button primary type='submit'>Buscar viajes</Button>
      </form>
   )
}
