const travelsRouter = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor.js')
const Travel = require('../models/Travel.model.js')
const User = require('../models/User.model.js')

travelsRouter.get('/', async (req, res, next) => {
   const { from, to } = req.query;
   const query = {};
   if (from) {
      query.from = from.toLowerCase();
   }
   if (to) {
      query.to = to.toLowerCase();
   }

   try {
      const travels = await Travel
         .find(query).populate('user', {
            username: 1,
            cellphone: 1,
            avatar: 1
         })
      res.status(200).json(travels)
   } catch (err) {
      next(err)
   }
})

travelsRouter.post('/', tokenExtractor, async (req, res, next) => {
   const { body, userId } = req
   const { from, to, capacity, price, date, features } = body

   const user = await User.findById(userId)

   if (!user) {
      res.status(401).json({ error: 'without authorization' })
   }

   const newTravel = new Travel({
      from: from.toLowerCase().trim().replace('%',' '),
      to: to.toLowerCase().trim().replace('%',' '),
      capacity,
      price,
      date,
      features,
      user: userId
   })

   try {
      const savedTravel = await newTravel.save()
      user.travels = user.travels.concat(savedTravel._id)
      await user.save()
      res.status(201).json(savedTravel)
   } catch (err) {
      next(err)
   }
})

travelsRouter.put('/:travelId', tokenExtractor, async (req, res, next) => {
   const { body, userId } = req
   const { travelId } = req.params
   const { from, to, capacity, price, date, features } = body

   const user = await User.findById(userId)
   if (!user) {
      res.status(401).json({ error: 'without authorization' })
   }

   const newTravelInfo = { from, to, capacity, price, date, features }

   try {
      const updateTravel = await Travel.findByIdAndUpdate(travelId, newTravelInfo, { new: true })
      res.status(201).json(updateTravel)
   } catch (err) {
      next(err)
   }
})

travelsRouter.delete('/:travelId', tokenExtractor, async (req, res, next) => {
   const { userId } = req
   const { travelId } = req.params

   const user = await User.findById(userId)
   if (!user) {
      res.status(401).json({ error: 'without authorization' })
   }

   try {
      await Travel.findByIdAndDelete(travelId)

      user.travels = await user.travels.filter(id => id.toString() !== travelId)
      await user.save()

      res.status(204).json({ result: 'travel deleted' })
   } catch (err) {
      next(err)
   }
})

travelsRouter.get('/:travelId', async (req, res, next) => {
   const { travelId } = req.params

   try {
      const travel = await Travel.findById(travelId).populate('user', {
         username: 1,
         cellphone: 1,
         avatar: 1
      })
      res.status(200).json(travel)
   } catch (err) {
      next(err)
   }
})

module.exports = travelsRouter