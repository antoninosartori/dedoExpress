const messageRoute = require('express').Router()
const transporter = require('../connection/nodemailer.js')

messageRoute.post('/', async (req, res, next) => {
   const {name, email, message} = req.body

   if(!name, !email, !message) {
      return res.status(404).json('Falta algún campo, nombre, email o mensaje')
   }

   try {
      const messageSended = await transporter.sendMail({
         from: `Contacto desde DedoExpress ${process.env.KUMPEL_EMAIL}`,
         to: process.env.KUMPEL_EMAIL,
         subject: `${name} se ha comunicado desde el formulario de DedoExpress`,
         html: `
            <main style="display:flex; flex-direction: column; gap: 20px; font-size: 20px">
               <h1>Un nuevo contacto desde DedoExpress</h1>
                  <p>Datos del usuario:</p>
                  <h3>Nombre: ${name}</h3>
                  <h3>Email: ${email}</h3>
               <span>Ha escrito el siguiente mensaje</span>
               <p style="font-weight: bold; font-size: 30px;">${message}</p>
            </main>
         `,
      })
      res.status(200).json({ messageSended })
   } catch (error) {
     next(error)
   }
})

module.exports = messageRoute