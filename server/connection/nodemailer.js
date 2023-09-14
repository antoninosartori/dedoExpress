const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 465,
   secure: false,
   auth: {
      user: process.env.KUMPEL_EMAIL,
      pass: process.env.KUMPEL_EMAIL_PASSWORD,
   },
});

module.exports = transporter