const express = require('express');
const router = express.Router();
const fs = require('fs');

const app = express();
const port = 8080;

const productsFile = './products.json';
const cartsFile = './carts.json';

let products = [];
let carts = [];



// Carga la información de los productos y carritos del archivo
try {
  const productsData = fs.readFileSync(productsFile);
  products = JSON.parse(productsData);
} catch (err) {
  console.error(err);
}

try {
  const cartsData = fs.readFileSync(cartsFile);
  carts = JSON.parse(cartsData);
} catch (err) {
  console.error(err);
}

// Genera un id único para los productos y carritos
const generateUniqueId = () => {
  return Date.now();
};

// Agrega un producto a la lista de productos y guarda la información en el archivo
const addProduct = (product) => {
  products.push(product);
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products));
  } catch (err) {
    console.error(err);
  }
  return product;
};

// Actualiza un producto en la lista de productos y guarda la información en el archivo
const updateProduct = (id, updatedProduct) => {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return { error: 'Product not found' };
  }
  products[productIndex] = { ...products[productIndex], ...updatedProduct };
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products));
  } catch (err) {
    console.error(err);
  }
  return products[productIndex];
};

// Elimina un producto de la lista de productos y guarda la información en el archivo
const deleteProduct = (id) => {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return { error: 'Product not found' };
  }
  const deletedProduct = products[productIndex];
  products = products.filter((p) => p.id !== id);
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products));
  } catch (err) {
    console.error(err);
  }
  return deletedProduct;
};

// Crea un carrito nuevo y lo agrega a la lista de carritos y guarda la información en el archivo
const createCart = (cart) => {
  carts.push(cart);
  try {
    fs.writeFileSync(cartsFile, JSON.stringify(carts));
  } catch (err) {
  console.error(err);
  }
  return cart;
  };
  
  // Obtiene los productos de un carrito dado su id
  const getCartProducts = (id) => {
  const cart = carts.find((c) => c.id === id);
  if (!cart) {
  return { error: 'Cart not found' };
  }
  return cart.products;
  };
  
  // Agrega un producto a un carrito dado su id
  const addProductToCart = (cartId, productId, quantity) => {
  const cart = carts.find((c) => c.id === cartId);
  if (!cart) {
  return { error: 'Cart not found' };
  }
  const productIndex = cart.products.findIndex((p) => p.product === productId);
  if (productIndex === -1) {
  cart.products.push({ product: productId, quantity });
  } else {
  cart.products[productIndex].quantity += quantity;
  }
  try {
  fs.writeFileSync(cartsFile, JSON.stringify(carts));
  } catch (err) {
  console.error(err);
  }
  return cart;
  };
  
  // Crea el router de productos y configura las rutas
  const productsRouter = express.Router();

  router.get('/', (req, res) => {
    res.send(products);
  });
  
  // Otras rutas del router
  
  app.use('/api/products', router);
  
  
  productsRouter.get('/:pid', (req, res) => {
  const product = products.find((p) => p.id === req.params.pid);
  if (!product) {
  res.send({ error: 'Product not found' });
  }
  res.send(product);
  });
  
  productsRouter.post('/', (req, res) => {
    const newProduct = {
    id: generateUniqueId(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status || true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [],
    };
    res.send(addProduct(newProduct));
    });
    
    productsRouter.put('/:pid', (req, res) => {
    res.send(updateProduct(req.params.pid, req.body));
    });
    
    productsRouter.delete('/:pid', (req, res) => {
    res.send(deleteProduct(req.params.pid));
    });
    
    // Crea el router de carritos y configura las rutas
    const cartsRouter = express.Router();
    
    cartsRouter.post('/', (req, res) => {
    const newCart = {
    id: generateUniqueId(),
    products: [],
    };
    res.send(createCart(newCart));
    });
    
    cartsRouter.get('/:cid', (req, res) => {
    res.send(getCartProducts(req.params.cid));
    });
    
    cartsRouter.post('/:cid/product/:pid', (req, res) => {
    res.send(addProductToCart(req.params.cid, req.params.pid, req.body.quantity));
    });
    
    // Utiliza los routers de productos y carritos en las rutas /api/products y /api/carts
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    
    app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    });







/* const express = require('express');
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
}); */