import './SearchFormHome.css'
import Button from './Button'
import useGetTravels from '../hooks/useGetTravels';
import fromIcon from '../assets/from.svg'
import toIcon from '../assets/to.svg'

export default function SearchFormHome() {
   const { handleChangeFromInput, handleChangeToInput, handleSubmitSearch } = useGetTravels()

   return (
      <form className='searchFormHome-form' onSubmit={handleSubmitSearch}>
         <div className="formGroup">
            <img className='icon' src={fromIcon} alt="¿Donde estas?" />
            <input type="text" placeholder='¿Donde estas?' onChange={handleChangeFromInput} autoComplete='off' />
         </div>
         <div className="formGroup">
            <img className='icon' src={toIcon} alt="¿Donde queres llegar?" />
            <input type="text" placeholder='¿Donde queres llegar?' onChange={handleChangeToInput} autoComplete='off' />
         </div>
         <Button type='submit'>Buscar</Button>
      </form>
   )
}
