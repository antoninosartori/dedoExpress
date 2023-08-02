const usersRouter = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const tokenExtractor = require('../middlewares/tokenExtractor')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY,
   secure: true
});

usersRouter.post('/', async (req, res, next) => {
   const { name, username, email, password, cellphone, avatarBase64 } = req.body

   const saltsOrRounds = 10
   const passwordHash = await bcrypt.hash(password, saltsOrRounds)
   const savedAvatar = await cloudinary.uploader.upload(avatarBase64, {
      folder: `DedoExpressApp/user/${username}/avatar`,
      transformation: [
         { aspect_ratio: "1.0", width: 150, crop: "fill" },
         { quality: 60 }
      ]
   })

   const newUser = new User({
      name,
      username,
      email,
      passwordHash,
      cellphone,
      avatar: {
         public_id: savedAvatar.public_id,
         url: savedAvatar.secure_url
      }
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

usersRouter.get('/:userId', tokenExtractor, async (req, res, next) => {
   const { userId } = req.params
   try {
      const user = await User.findById(userId)
      res.status(200).json(user)
   } catch (err) {
      next(err)
   }
})

usersRouter.put('/password/:userId', tokenExtractor, async (req, res, next) => {
   const { actualPassword, newPassword } = req.body
   const { userId } = req.params

   const user = await User.findById(userId)
   const correctPassword = user === null
      ? false
      : await bcrypt.compare(actualPassword, user.passwordHash)

   if (!correctPassword || !user) {
      res.status(401).json({
         error: 'usuario o contraseña inválida'
      })
   }

   if (correctPassword) {
      try {
         const saltsOrRounds = 10
         const passwordHash = await bcrypt.hash(newPassword, saltsOrRounds)

         const newPasswordInfo = { passwordHash }

         const updatedUser = await User.findByIdAndUpdate(userId, newPasswordInfo, { new: true })
         res.status(201).json(updatedUser)
      } catch (err) {
         next(err)
      }
   }
})

usersRouter.put('/:userId', tokenExtractor, async (req, res, next) => {
   const { name, username, email, cellphone, avatarBase64 } = req.body
   const { userId } = req

   const user = await User.findById(userId)
   if (!user) {
      res.status(401).json({ error: 'without authorization' })
   }

   await cloudinary.uploader.destroy(user.avatar.public_id)
   const savedAvatar = await cloudinary.uploader.upload(avatarBase64, {
      folder: `DedoExpressApp/user/${username}/avatar`,
      transformation: [
         { aspect_ratio: "1.0", width: 150, crop: "fill" },
         { quality: 60 }
      ]
   })

   /* const saltsOrRounds = 10
   const passwordHash = await bcrypt.hash(password,saltsOrRounds) */

   const newUserInfo = {
      name,
      username,
      email,
      cellphone,
      avatar: {
         public_id: savedAvatar.public_id,
         url: savedAvatar.secure_url
      }
   }

   try {
      const updatedUser = await User.findByIdAndUpdate(userId, newUserInfo, { new: true })
      res.status(201).json(updatedUser)
   } catch (err) {
      next(err)
   }
})

module.exports = usersRouter