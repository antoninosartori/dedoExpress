import './AddTravelFixed.css'
import { Link } from 'react-router-dom'

export default function AddTravelFixed() {
   return (
      <button className='createTravel-button'>
         <Link className='createTravel-buttonLink' to='/createTravel'>+</Link>
      </button>
   )
}
