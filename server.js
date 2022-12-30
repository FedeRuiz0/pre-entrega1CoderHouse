const express = require('express');
const app = express();
const products = require('./products');

app.get('/products', (req, res) => {
  let result = products;
  if (req.query.limit) {
    result = products.slice(0, req.query.limit);
  }
  res.send(result);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send({ error: 'Producto no encontrado' });
  } else {
    res.send(product);
  }
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});