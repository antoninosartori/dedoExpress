const { connect, connection } = require('mongoose');
const connectionString = process.env.MONGO_DB_URI

connect(connectionString)
   .then(() => console.log('database connected'))
   .catch(err => console.error(err))

process.on('uncaughtException', () => {
   connection.close()
})