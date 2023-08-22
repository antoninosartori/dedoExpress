const loginRouter = require('express').Router()
const User = require('../models/User.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res, next) => {
   const { body } = req
   const { username, password } = body

   if(!username || !password ) {
      res.status(400).json({error: 'username or password have to be provider'})
   }

   try {
      const user = await User.findOne({ username })
      const correctPassword = user === null 
         ? false
         : await bcrypt.compare(password, user.passwordHash)
   
      if(!correctPassword || !user) {
         res.status(401).json({
            error: 'invalid user or password'
         })
      }
   
      const userToToken = {
         _id: user._id,
         username: user.username
      }
   
      // expira en 30 dias
      const tokenDuration = 60 * 60 * 24 * 30
      
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

module.exports = loginRouter