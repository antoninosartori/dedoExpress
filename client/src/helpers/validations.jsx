export default function validations({ 
   type, 
   maxLength, 
   minLength, 
   value, 
   handleChangeFunction, 
   required, 
   className 
}) 
{
   const inputMaxLength = maxLength ?? 50
   const inputMinLength = minLength ?? 0
   const inputType = type ?? 'text'
   const inputValue = value ?? ''
   const handleChangeInput = handleChangeFunction ?? ''
   const inputRequired = required ?? ''
   const inputClassName = className ?? ''

   return (
      <input 
      className={inputClassName}
      type={inputType} 
      maxLength={inputMaxLength} 
      minLength={inputMinLength} 
      value={inputValue}
      onChange={handleChangeInput} 
      required={inputRequired ? true : false}
      />
   )
}
