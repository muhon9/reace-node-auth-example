const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config/config')

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('Databse connected successfully')
  app.listen(config.port, () => {
    console.log(`Server started at localhost:${config.port}`)
  })
})
