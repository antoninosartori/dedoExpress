import './IconDiv.css'
export default function IconDiv({icon1, icon2, justify}){
   const iconGrupClassName = justify ? `iconGroup justify-${justify}` : "iconGroup"
   return(
      <div className={iconGrupClassName}>
         {icon1 && <img src={icon1} alt="icono separador" />}
         {icon2 && <img src={icon2} alt="icono separador" />}
      </div>
   )
}