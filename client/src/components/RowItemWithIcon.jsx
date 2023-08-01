import './RowItemWithIcon.css'

export default function RowItemWithIcon({icon, text, toggleTextClassName, toggleIconClassName}) {
   const iconClassName = toggleIconClassName ? `rowItemWithIcon-container ${toggleIconClassName}` : 'rowItemWithIcon-container'
   return (
      <div className={iconClassName}>
         <div className='rowItemWithIcon-iconGroup'>
            <img src={icon} alt="icono" />
         </div>
         <p className={toggleTextClassName}>{text}</p>
      </div>
   )
}
