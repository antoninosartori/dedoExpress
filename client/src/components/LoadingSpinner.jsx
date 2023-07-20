import './LoadingSpinner.css'

const LoadingSpinner = ({withoutText, text}) => {
   return(
       <>
           <div className='spinner-container'>
               <div className="spinner"></div>
               {!withoutText && <p className='spinner-text'>{text}</p>}
           </div>
       </>
   )
}

export default LoadingSpinner