import { useState } from "react"

export default function Toggable({ children, icon, text, shownClassName, animationClassName }) {
   const [visible, setVisible] = useState(false)
   const [toggleAnimation, setToggleAnimation] = useState(false)

   const handleClick = () => {
      animationClassName ? setToggleAnimation(!toggleAnimation) : setVisible(!visible)
   }

   const showWhenIsVisible =
      animationClassName
         ? { transform: toggleAnimation ? animationClassName : '' }
         : { display: !visible ? 'none' : '' }

   return (
      <>
         <div className="toggable-iconContainer" onClick={handleClick}>
            {icon ? <img className="toggable-iconImg" src={icon} alt="toggle" /> : text}
         </div>
         <div style={showWhenIsVisible} className={shownClassName}>
            {children}
         </div>
      </>
   )
}
