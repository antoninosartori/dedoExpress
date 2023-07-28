const ERROR_HANDLERS = {
   CastError: res => res.status(400).send({ error: 'id used is malformed'}),
   ValidationError: (res, err) => res.status(409).res({error: err.message}),
   JsonWebTokenError: (res) => res.status(401).json({ error: 'token missing or invalid'}),
   TokenExpirerError: (res) => res.status(401).json({ error: 'token expired'}),
   defaultError: res => res.status(500).end(),
}

module.exports = ( err, req, res, next ) => {
   console.log(err.name)

   console.log('-----------------')

   console.error(err)

   const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
   handler(res, err)
}