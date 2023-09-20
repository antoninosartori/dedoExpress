import useSearchCityInput from "../hooks/useSearchCityInput"



export default function InputSearchCity({ placeholder = "Start Searching...", inputId = 'from', register = null, onChangeFunction = null, }) {
   useSearchCityInput(inputId)
   return (
      <>
         <input {...register} onClick={onChangeFunction ?? null} onKeyDown={onChangeFunction ?? null} type="search" id={inputId} placeholder={placeholder} />
      </>
   )
}
