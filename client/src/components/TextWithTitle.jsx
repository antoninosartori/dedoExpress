import './TextWithTitle.css'

export default function TextWithTitle ({title, children, noTitle}) {
   const withTitle = noTitle ? false : true  
   return(
      <div className='textWithTitle-container'>
         {withTitle && <h3 className='subtitle-small'>{title}</h3>}
         {children}
      </div>
   )
}