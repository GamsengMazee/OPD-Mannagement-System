const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()



app.use(express.json())
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   next();
// })

app.use(
  cors({
   origin: 'http://10.0.0.103:3000',
   credentials: true
}))

app.use(cookieParser())
dotenv.config({path: './.env'})
const Router = require('./server/router')
app.use('/', Router)

const PORT = process.env.PORT || 5000



app.listen(PORT, () => console.log(`Your Server is Running at port ${PORT}`))