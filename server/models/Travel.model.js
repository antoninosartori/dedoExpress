const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const travelSchema = new Schema({
   from: { type: String, require: true },
   to: { type: String, require: true },
   capacity: Number,
   price: Number,
   date: Number,
   features: {
      pet: Boolean,
      luggage: Boolean,
      music: Boolean,
      food: Boolean,
      talk: Boolean
   },
   user: [{
         type: Schema.Types.ObjectId,
         ref: 'User'
      }],
   /* 
   💡 Seria similar a lo del user. Se haria un PUT y se actualizaria la key 'joined' con el _id y se popula con los otros datos.
   joined: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }] */
})

travelSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      delete returnedObject.__v
   }
})

travelSchema.plugin(uniqueValidator)

const Travel = model('Travel', travelSchema)

module.exports = Travel