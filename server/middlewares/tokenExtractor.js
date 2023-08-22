const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
   let token = ''
   const authorization = req.get('authorization')
   if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
   }

   try {
      const decodedToken = jwt.verify(token, process.env.SECRET_WORD)
      if (!token || !decodedToken._id) {
         return res.status(401).json({ error: 'invalid token or invalid authorization' })
      }
      const { _id: userId } = decodedToken
      req.userId = userId
      next()
   } catch (error) {
      res.status(401).json({error: error.message})
   }
}

module.exports = tokenExtractor