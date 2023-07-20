import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextState from './context/UserContext.jsx'
import FloatinNotificationContext from './context/FloatinNotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <UserContextState>
            <FloatinNotificationContext>
               <App />
            </FloatinNotificationContext>
         </UserContextState>
      </BrowserRouter>

   </React.StrictMode>,
)
