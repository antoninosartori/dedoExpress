const NODE_ENV  = process.env.NODE_ENV
const baseURL = NODE_ENV === 'production' ? 'https://dedo-express.vercel.app/' : 'http://localhost:3000'
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