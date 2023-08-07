import './TravelFilters.css'
import { ONE_DAY_IN_MS } from '../helpers/consts'

export default function TravelFilters({handleChange}) {

   return (
      <div className='filterTravel-container shadow' onChange={handleChange}>
         <div className='formGroup hover'>
            <input type='radio' name="filter" min={0} max={ONE_DAY_IN_MS * 30} />
            <label htmlFor="filter">Todos</label>
         </div>
         <div className='formGroup hover'>
            <input type='radio' name="filter" min={0} max={ONE_DAY_IN_MS} />
            <label htmlFor="filter">En 24hs</label>
         </div>
         <div className='formGroup hover'>
            <input type='radio' name="filter" min={ONE_DAY_IN_MS + 1} max={ONE_DAY_IN_MS * 2} />
            <label htmlFor="filter">Próximos</label>
         </div>
         <div className='formGroup hover'>
            <input type='radio' name="filter" min={0} max={ONE_DAY_IN_MS * 7} />
            <label htmlFor="filter">Esta semana</label>
         </div>
      </div>
   )
}
