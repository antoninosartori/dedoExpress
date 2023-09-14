const loginRouter = require('express').Router()
const User = require('../models/User.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require('../connection/nodemailer.js')
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://dedoexpress.vercel.app/' : process.env.DEVELOPMENT_URL

console.log(BASE_URL)
loginRouter.post('/', async (req, res, next) => {
   const { body } = req
   const { username, password } = body

   if (!username || !password) {
      res.status(400).json({ error: 'username or password have to be provider' })
   }

   try {
      const user = await User.findOne({ username })
      const correctPassword = user === null
         ? false
         : await bcrypt.compare(password, user.passwordHash)

      if (!correctPassword || !user) {
         return res.status(401).json({
            error: 'invalid user or password'
         })
      }

      const userToToken = {
         _id: user._id,
         username: user.username
      }

      // expira en 90 dias
      const tokenDuration = 60 * 60 * 24 * 30 * 3

      const token = jwt.sign(
         userToToken,
         process.env.SECRET_WORD,
         { expiresIn: tokenDuration }
      )

      res.send({
         userId: user._id,
         name: user.name,
         username: user.username,
         avatar: user.avatar,
         token
      })
   } catch (err) {
      next(err)
   }
})

loginRouter.post('/forgotten-password', async (req, res, next) => {
   const { email } = req.body

   if (email === null || email === undefined) {
      return res.status(401).json({ error: 'No se ha detectado ningun email' })
   }


   // if(!user){
   //    return res.status(404).json({ message: 'Usuario no encontrado' });
   // }

   try {
      const user = await User.findOne({ email })

      const userToToken = {
         _id: user._id,
         username: user.username
      }
      const tokenToResetPassword = jwt.sign(userToToken, process.env.SECRET_WORD, { expiresIn: '1h' })
      user.resetToken = tokenToResetPassword;
      await user.save();

      const result = await transporter.sendMail({
         from: `DedoExpress ${process.env.KUMPEL_EMAIL}`,
         to: email,
         subject: "Vamos a recuperar tu contraseña de DedoExpress",
         html: `
            <main style="display:flex; flex-direction: column; gap: 20px;">
               <h1>Vamos a restablecer tu contraseña</h1>
               <p style="font-size: 20px;" >👇 Necesitamos que hagas click en este enlace </p>
               <a style="font-size: 16px;" href=${BASE_URL}/#/reset-password/${tokenToResetPassword}>Link para ingresar una nueva contraseña</a>
               <p style="font-size: 20px;">También podés copiar y pegar este enlace </p>
               ${BASE_URL}/#/reset-password/${tokenToResetPassword}
            </main>
         `,
      })
      res.status(200).json({ result })
   } catch (err) {
      next(err)
   }
})

loginRouter.post('/reset-password', async (req, res, next) => {
   const { token, password } = req.body

   try {
      const decodedToken = jwt.verify(token, process.env.SECRET_WORD)

      if (!token || !decodedToken._id) {
         return res.status(401).json({ error: 'Sin autorización' })
      }

      const userIdFromToken = decodedToken._id
      const user = await User.findById(userIdFromToken)

      if (!user || user.resetToken !== token) {
         return res.status(401).json({ error: 'Token inválido para este usuario.' });
      }

      const saltsOrRounds = 10
      const passwordHash = await bcrypt.hash(password,saltsOrRounds)

      user.passwordHash = passwordHash
      user.resetToken = null
      const updateUser = await user.save()

      res.status(201).json(updateUser)
   } catch (error) {
      next(error)
   }
})

module.exports = loginRouter