const mongooose = require('mongoose');

const DB = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;



mongooose.connect(DB)
.then(() => {
    console.log('Connected to Mongo Server')
})
.catch((err) => {
   console.log('connection Failed')
})

module.exports