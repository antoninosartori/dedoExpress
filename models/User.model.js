const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
   name: String,
   username: { type: String, unique: true, require: true },
   email: { type: String, unique: true, require: true },
   passwordHash: { type: String, require: true },
   cellphone: { type: Number, require: true, unique: true},
   avatar: {
      public_id: String,
      url: String
   },
   travels: [{
      type: Schema.Types.ObjectId,
      ref: 'Travel'
   }]
})

userSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      delete returnedObject.__v,
      delete returnedObject.passwordHash
   }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User