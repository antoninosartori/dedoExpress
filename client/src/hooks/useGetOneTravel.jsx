import { useContext, useEffect, useState } from 'react'
import { getOneTravelById } from '../services/travels'
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationContext } from '../context/FloatinNotificationContext';

export default function useGetOneTravel() {
   const [travel, setTravel] = useState([])
   const { setFloatinNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const params = useParams();
   const { travelId } = params

   useEffect(() => {
      setIsLoading(true)
      getOneTravelById(travelId)
         .then(data => {
            setTravel(data)})
         .catch(err =>{
            console.error(err)
            setFloatinNotification({message: err.response.data.error, status: 'error', duration: 3000})
         })
         .finally(() => setIsLoading(false))
   }, [travelId])

   return {
      travel
   }
}
