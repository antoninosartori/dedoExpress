const usersRouter = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const tokenExtractor = require('../middlewares/tokenExtractor')

usersRouter.post('/', async (req, res, next) => {
   const { name, username, email, password, cellphone } = req.body

   const saltsOrRounds = 10
   const passwordHash = await bcrypt.hash(password, saltsOrRounds)
   const newUser = new User({
      name, username, email, passwordHash, cellphone
   })

   try {
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
   } catch (err) {
      next(err)
   }
})



usersRouter.get('/', async (req, res, next) => {
   try {
      const users = await User.find({}).populate('travels', {
         title: 1,
         from: 1,
         to: 1,
         capacity: 1,
         price: 1
      })
      res.status(200).json(users)
   } catch (err) {
      next(err)
   }
})

usersRouter.get('/:userId', tokenExtractor , async (req, res, next) => {
   const { userId } = req.params
   try {
      const user = await User.findById(userId)
      res.status(200).json(user)
   } catch (err) {
      next(err)
   }
})

usersRouter.put('/:userId', tokenExtractor, async ( req, res, next) => {
   const { name, username, email, cellphone } = req.body
   const { userId } = req
   
   const user = await User.findById(userId)
   if (!user) {
      res.status(401).json({ error: 'without authorization' })
   }
   
   /* const saltsOrRounds = 10
   const passwordHash = await bcrypt.hash(password,saltsOrRounds) */

   const newUserInfo = {
      name, username, email, cellphone 
   }

   try {
      const updatedUser = await User.findByIdAndUpdate(userId, newUserInfo, { new: true})
      res.status(201).json({updatedUser})
   } catch (err) {
      next(err)
   }
})

module.exports = usersRouter