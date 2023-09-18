import './Button.css'
export default function Button ({children, type, primary, secondary, onClickFunction, disabledButton = false}){
   const buttonType = type ?? 'button'
   const colors = secondary ? 'mainBtn hover btn-secondary' : 'mainBtn hover btn-primary'
   const handleClick = onClickFunction ?? null
   
   return(
      <button disabled={disabledButton ? true : false} onClick={handleClick} className={colors} type={buttonType} >{children}</button>
   )
}