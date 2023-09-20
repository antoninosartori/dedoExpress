import { useEffect } from "react"

export default function useSearchCityInput (inputId){
   useEffect(() => {
      window.placeSearch({
         key: 'trFQGlIY9qETWHpgN4YbLjFCaOY9OHQU',
         container: document.querySelector(`#${inputId}`),
       });
   }, [])
}
