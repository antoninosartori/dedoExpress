import { useState } from "react"
import { ONE_DAY_IN_MS } from "../helpers/consts"

export default function useFilters() {
   const [filters, setFilters] = useState({
      min: 0,
      max: ONE_DAY_IN_MS
   })
   return { filters, setFilters }
}
