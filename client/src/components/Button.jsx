import './Button.css'
export default function Button ({children, btnType}){
   const buttonType = btnType ?? ''
   return(
      <button className="btn-primary" type={buttonType} >{children}</button>
   )
}