import './TravelFilters.css'
import { ONE_DAY_IN_MS } from '../helpers/consts'
import useFilters from '../hooks/useFilters'

export default function TravelFilters({setFilters}) {
   //const { setFilters } = useFilters()
   
   const handleChangeFilters = (event) => {
      const min = event.target.min
      const max = event.target.max
      setFilters({
         min, 
         max
      })
   }

   return (
      <div className='filterTravel-container shadow' onChange={handleChangeFilters}>
         <div className='formGroup'>
            <input type='radio' name="filter" min={0} max={ONE_DAY_IN_MS * 30} />
            <label htmlFor="filter">Todos</label>
         </div>
         <div className='formGroup'>
            <input type='radio' name="filter" min={0} max={ONE_DAY_IN_MS} />
            <label htmlFor="filter">Hoy</label>
         </div>
         <div className='formGroup'>
            <input type='radio' name="filter" min={ONE_DAY_IN_MS + 1} max={ONE_DAY_IN_MS * 2} />
            <label htmlFor="filter">Mañana</label>
         </div>
         <div className='formGroup'>
            <input type='radio' name="filter" min={0} max={ONE_DAY_IN_MS * 7} />
            <label htmlFor="filter">Esta semana</label>
         </div>
      </div>
   )
}
