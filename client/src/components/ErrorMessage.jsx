import './ErrorMessage.css'

export default function ErrorMessage({ errorMessage }) {
   return (
      <div className='error-message-container'>
         <p className='error-message'>{errorMessage}</p>
      </div>
   )
}
