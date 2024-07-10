const express = require('express')
const app = express()
const productRoutes = require('./routes/productRoutes')
const mongoose = require('mongoose')
require('dotenv').config();
const errorMiddleware = require("./middleware/errorMiddleware")
const cors = require('cors')


const port = process.env.PORT || 3000
const mongodbUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));


// routes
app.use('/api/product', productRoutes);
app.get('/', (req, res) =>{
  res.send('Hello from Node API')
});
app.use(errorMiddleware);


// connect to mongodb
mongoose.connect(mongodbUrl)
.then( () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log('Server is running on port 3000');
  })
}).catch((err) => {
  console.log(err + "Error connecting to MongoDB")
})


