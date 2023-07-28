import './AddTravelFixed.css'
import { Link } from 'react-router-dom'
import Toggable from './Toggable'
export default function AddTravelFixed() {
   return (
      <>
         <button className='createTravel-button'>
         <Link className='createTravel-buttonLink' to='/createTravel'>
            <span className='createTravel-buttonText'>+</span>
         </Link>
      </button>
         {/* <div className='addTravelFixed-container'>
            <div className='addTravelFixed-relativeContainer'>
               <Toggable text='+' animationClassName='translateY(-150%) scale(1.5);'>
                  <Link className='addTravelFixed-container_circleLink' to='/createTravel'>Crear viaje</Link>
               </Toggable>
            </div>
         </div> */}
      </>
   )
}
