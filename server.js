// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

let products = [
  { id: 1, name: 'Product 1', quantity: 50, price: 10 },
  { id: 2, name: 'Product 2', quantity: 30, price: 15 }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, quantity, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    quantity,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;

  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).send('Product not found');
  }

  product.name = name || product.name;
  product.quantity = quantity || product.quantity;
  product.price = price || product.price;

  res.json(product);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
