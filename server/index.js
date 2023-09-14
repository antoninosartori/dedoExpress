require('dotenv').config()
const PORT = process.env.PORT || 3001
const Sentry = require('@sentry/node');
const express = require('express')
/* const path = require('path') */
const app = express()
require('./connection/mongo.js')
const cors = require('cors')


Sentry.init({
   dsn: "https://630bc1dc36897bd619acd05d5765efa1@o4505749248475136.ingest.sentry.io/4505749250703360",
   integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({
         tracing: true
      }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({
         app
      }),
   ],
   // Performance Monitoring
   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

app.use(cors(`*`))
/* const allowedOrigins = [
   'http://localhost:5173/',
   'http://localhost:3000/',
   'https://dedo-express.vercel.app', 
   'https://dedo-express.vercel.app/',
   'https://dedo-express.vercel.app/api/',
   'https://dedo-express.vercel.app/api/login/forgotten-password',
   'https://dedo-express.vercel.app/#',
   'https://dedo-express.vercel.app/#/',
   'https://dedoexpress.vercel.app/#/login'
];
app.use(cors({
   origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         callback(new Error('Acceso no permitido por CORS'));
      }
   },
})); */



app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));

const handleError = require('./middlewares/handleError.js')
const notFound = require('./middlewares/notFound.js')
const travelsRouter = require('./controllers/travels.route.js')
const loginRouter = require('./controllers/login.route')
const usersRouter = require('./controllers/users.route.js')

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/travels', travelsRouter)
app.use(notFound)
app.use(Sentry.Handlers.errorHandler());
app.use(handleError)

app.listen(PORT, () => {
   console.log(`aplicacion corriendo en puerto ${PORT}`)
})
