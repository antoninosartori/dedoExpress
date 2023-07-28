import axios from 'axios'
import { url } from './urls'

const getAllTravels = async (config) => {
   const { data } = await axios.get(url.getAllTravels, config)
   return data
}

const getAllTravelsWithParams = async (params) => {
   const { data } = await axios.get(`${url.getAllTravels}${params}`)
   return data
}

const getOneTravelById = async (travelid) => {
   const { data } = await axios.get(`${url.getOneTravel}${travelid}`)
   return data
}

const postNewTravel = async (travel, config) => {
   const { data } = await axios.post(url.createNewTravel, travel, config)
   return data
}

const putUpdateTravel = async (travelId, travelInfo, config) => {
   const { data } = await axios.put(`${url.updateTravel}${travelId}`, travelInfo, config) 
   return data
}

const deleteOneTravelById = async (travelId, config) => {
   const { data } = await axios.delete(`${url.deleteOneTravel}${travelId}`, config)
   return data
}

export { getAllTravels, postNewTravel, getAllTravelsWithParams, getOneTravelById, deleteOneTravelById, putUpdateTravel }