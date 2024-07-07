const express = require('express')
const app = express()
const Product = require('./models/productModel')
const mongoose = require('mongoose')

const mongodbUrl = 'mongodb+srv://bintangsetiawan900:DEh66wbsaGeWhSoI@nodeapi.ceq4qmv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPI';

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// routes
app.get('/', (req, res) =>{
  res.send('Hello from Node API')
})

// Add Product to Database
app.post('/product', async(req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})

// Get All Products
app.get('/products', async function(req, res) {
  try {
    const products = await Product.find({});

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message : error.message});
  }
});


// Get Specific Product
app.get('/products/:id', async function(req, res) {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({message : error.message});
  }
});

// Edit & Update Product
app.put('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);

      if(!product) {
        return res.status(404).json({message : `Cannot find any product with ID: ${id}`})
      }

      const updatedProduct = await Product.findById(id)
      res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({message : error.message});
  }
})

//Delete a product
app.delete('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({
        message : `Cannot find any product with ID ${id}`
      })
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message : error.message
    });
  }
})

// app.delete('/products/:id', async(req, res) =>{
//   try {
//       const {id} = req.params;
//       const product = await Product.findByIdAndDelete(id);
//       if(!product){
//           return res.status(404).json({message: `cannot find any product with ID ${id}`})
//       }
//       res.status(200).json(product);
      
//   } catch (error) {
//       res.status(500).json({message: error.message})
//   }
// })


mongoose.connect(mongodbUrl)
.then( () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  })
}).catch((err) => {
  console.log(err + "Error connecting to MongoDB")
})


