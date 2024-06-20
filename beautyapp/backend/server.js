const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let products = [
  {
    id: 1,
    name: 'Moisturizer',
    price: 29.99,
    favorite: true,
    rating: 4.5,
    tags: ['skincare', 'organic'],
    imageUrl: 'C:\Users\siree\Desktop\Angular\beautyapp\public\Product1.jpg'
  },
  {
    id: 2,
    name: 'Sunscreen',
    price: 49.99,
    favorite: false,
    rating: 4.0,
    tags: ['skincare', 'sun protection'],
    imageUrl: '../assets/Product2.jpg'
  },
  // Add more products as needed
  {
    id: 3,
    name: 'Toner',
    price: 19.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular'],
    imageUrl: '../assets/Product3.jpg'
  },
  {
    id: 4,
    name: 'Serum',
    price: 23.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular'],
    imageUrl: '../assets/Product4.jpg'
  },
  {
    id: 5,
    name: 'Lip Glossy',
    price: 29.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular','Beauty'],
    imageUrl: '../assets/Product5.jpg'
  },
  {
    id: 6,
    name: 'Lip Balm',
    price: 13.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular','Beauty'],
    imageUrl: '../assets/Product6.jpg'
  },
  {
    id: 7,
    name: 'Eye Liner',
    price: 9.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'Beauty'],
    imageUrl: '../assets/Product7.jpg'
  }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
