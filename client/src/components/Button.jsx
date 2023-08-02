import './Button.css'
export default function Button ({children, type, primary, secondary, onClickFunction}){
   const buttonType = type ?? 'button'
   const colors = secondary ? 'mainBtn btn-secondary' : 'mainBtn btn-primary'
   const handleClick = onClickFunction ?? null
   return(
      <button onClick={handleClick} className={colors} type={buttonType} >{children}</button>
   )
}