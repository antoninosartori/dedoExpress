import './SearchFormHome.css'
import Button from './Button'
/* import IconDiv from './IconDiv' */
import useGetTravels from '../hooks/useGetTravels';
import fromIcon from '../assets/from.svg'
import toIcon from '../assets/to.svg'
/* import chevronDown from '../assets/chevron-down.svg' */

export default function SearchFormHome() {
   const { handleChangeFromInput, handleChangeToInput, handleSubmitSearch } = useGetTravels()

   return (
      <form className='searchFormHome-form' onSubmit={handleSubmitSearch}>
        {/*  <div className="formGroup">
            <img className='icon' src={fromIcon} alt="¿Donde estas?" />
            <input type="text" placeholder='¿Donde estas?' onChange={handleChangeFromInput} autoComplete='off' />
         </div> */}
         <input type="text" placeholder='¿Dónde estas?' onChange={handleChangeFromInput} autoComplete='off' />
         <input type="text" placeholder='¿A dónde quieres ir?' onChange={handleChangeToInput} autoComplete='off' />

         {/* <div className="formGroup">
            <img className='icon' src={toIcon} alt="¿Donde queres llegar?" />
            <input type="text" placeholder='¿Donde queres llegar?' onChange={handleChangeToInput} autoComplete='off' />
         </div> */}
         <Button primary type='submit'>Buscar viajes</Button>
      </form>
   )
}
