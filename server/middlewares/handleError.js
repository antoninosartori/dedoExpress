const ERROR_HANDLERS = {
   CastError: res => res.status(400).send({ error: 'Id usado esta mal formado'}),
   ValidationError: (res, err) => res.status(409).json({error: `Los campos del email, username y teléfono deben ser único.`}),
   JsonWebTokenError: (res) => res.status(401).json({ error: 'sin token o es inválido'}),
   TokenExpirerError: (res) => res.status(401).json({ error: 'token expirado'}),
   defaultError: res => res.status(500).res({error: 'Default error :('}),
}

module.exports = ( err, req, res, next ) => {
   console.log(err.name)

   console.log('-----------------')

   console.error(err)

   const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
   handler(res, err)
}

