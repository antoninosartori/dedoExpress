import useSearchCityInput from "../hooks/useSearchCityInput"

export default function InputSearchCity({ placeholder = "Start Searching...", inputId = 'from', register = null, onChangeFunction = null, }) {
   useSearchCityInput(inputId)
   return (
      <>
         <input {...register} onClick={onChangeFunction} onKeyDown={onChangeFunction} type="search" id={inputId} placeholder={placeholder} />
      </>
   )
}
