import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import Product from './Schemas/products.js'
import cors from 'cors';
import uploader from './cloudinary.js';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
  //OPTIONS
  methods:"GET, POST, PUT, PATCH, DELETE, HEAD, TRACE, LINK, UNLINK"
}));

const database = ('mongodb://127.0.0.1:27017/kalmorDB');


// Wait for database to connect
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(database);
  console.log('Connected');
}

app.get('/', async (req, res) => {
  res.send('Not valid endpoint');
});

//GET
app.get('/products', async (req, res) => {
  
  try {
    const result = await Product.find(); 
    res.json(result);  
} catch (error) {
    console.log(error.message);
}
});

app.get('/product/:productId', async (req, res) => {
  const productId = req.params.productId;
  
  try {
    const result = await Product.findById(productId); 
    res.json(result);  
} catch (error) {
    console.log(error.message);
}
});


//POST
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product({
          name: req.body['name'],
          description: req.body['description'],
          price: parseFloat(req.body['price']),
          picture: req.body['picture'],
          rating: parseInt(req.body['rating']),
        });

        await newProduct.save();
        console.log('Inserted successfully');
        res.json(newProduct);
    } catch (error) {
        console.log(error.message);
        res.json(error.data);
    }
});


//PUT
app.put('/updateproduct/:id', async (req, res) => {
  const productId = req.params.id;
  const updateBody = req.body;

  try {
      const result = await Product.findByIdAndUpdate(productId, updateBody, { new: true });
      if (!result) {
        return res.status(404).send('Product not found');
      }

      console.log('Updated successfully');
      res.json(result);
      console.log('PUT');
  } catch (error) {
      console.log(error.message);
      res.json(error.data);
  }
});

//PATCH
app.patch('/patchproduct/:id', async (req, res) => {
  const productId = req.params.id;
  const updateBody = req.body;
  console.log(updateBody);

  try {
      const result = await Product.findByIdAndUpdate(productId, updateBody, { new: true });
      if (!result) {
        return res.status(404).send('Product not found');
      }

      console.log('Updated successfully');
      res.json(result);
      console.log('PATCH');
  } catch (error) {
      console.log(error.message);
      res.json(error.data);
  }
});


//DELETE
app.delete('/delete/:id', async (req, res) => {
  const productId = req.params.id;

  if (productId){
  try {
      const result = await Product.findByIdAndRemove(productId);
      console.log('Deleted Product');
      
      res.json(result);
  } catch (error) {
      console.log(error.message);
  }
  }
});


//HEAD
app.head('/product/:id', async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-store');
    res.end();
    console.log('Response Headers:', res.getHeaders());
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

// TRACE request handler
app.trace('/products', (req, res) => {
  const headers = { ...req.headers };
  console.log(headers);
  res.status(200).json({ method: req.method, headers });
});


app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });