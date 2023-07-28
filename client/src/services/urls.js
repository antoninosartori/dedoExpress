const NODE_ENV  = process.env.NODE_ENV
const PRODUCTION_URL = 'https://dedo-express.vercel.app'
const DEVELOPMENT_URL = 'http://localhost:3000'
const baseURL = NODE_ENV === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL 
export const url = {
   loginPost: `${baseURL}/api/login`,
   createNewUser: `${baseURL}/api/users`,
   getOneUser: `${baseURL}/api/users/`,
   putUser: `${baseURL}/api/users/`,
   getAllTravels: `${baseURL}/api/travels`,
   getOneTravel: `${baseURL}/api/travels/`,
   deleteOneTravel: `${baseURL}/api/travels/`,
   createNewTravel: `${baseURL}/api/travels`,
   updateTravel: `${baseURL}/api/travels/`,
}