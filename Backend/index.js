const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const Products = require("./Models/Products")
const app = express()

dotenv.config();
const PORT = process.env.PORT || 3001;

//Middleware 

app.use(cors());
app.use(express.json());

//MongoDb Connect 
const url = process.env.URL ;
mongoose.connect(url, {})
        .then(()=>console.log("Connected to MongoDB"))
        .catch((err)=>console.log("Failed to Connect ",err));



//Routes 
//Inserting(Creating) Data:
app.post("/insertproduct", async (req, res) => {
  const { ProductName, ProductPrice, ProductQuantity } = req.body;

  try {
      const pre = await Products.findOne({ ProductQuantity: ProductQuantity })
      console.log(pre);

      if (pre) {
          res.status(422).json("Product is already added.")
      }
      else {
          const addProduct = new Products({ ProductName, ProductPrice, ProductQuantity })

          await addProduct.save();
          res.status(201).json(addProduct)
          console.log(addProduct)
      }
  }
  catch (err) {
      console.log(err)
  }
})

//Getting(Reading) Data:
app.get('/products', async (req, res) => {

  try {
      const getProducts = await Products.find({})
      console.log(getProducts);
      res.status(201).json(getProducts);
  }
  catch (err) {
      console.log(err);
  }
})

//Getting(Reading) individual Data:
app.get('/products/:id', async (req, res) => {

  try {
      const getProduct = await Products.findById(req.params.id);
      console.log(getProduct);
      res.status(201).json(getProduct);
  }
  catch (err) {
      console.log(err);
  }
})

//Editing(Updating) Data:
app.put('/updateproduct/:id', async (req, res) => {
  const { ProductName, ProductPrice, ProductQuantity } = req.body;

  try {
      const updateProducts = await Products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductQuantity }, { new: true });
      console.log("Data Updated");
      res.status(201).json(updateProducts);
  }
  catch (err) {
      console.log(err);
  }
})

//Deleting Data:
app.delete('/deleteproduct/:id', async (req, res) => {

  try {
      const deleteProduct = await Products.findByIdAndDelete(req.params.id);
      console.log("Data Deleted");
      res.status(201).json(deleteProduct);
  }
  catch (err) {
      console.log(err);
  }
})

app.listen(PORT, () => {
  console.log(`App Listening Port ${PORT}`)
})


