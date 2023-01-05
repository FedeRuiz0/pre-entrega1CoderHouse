import express from "express";
import productsRouter from "./routes/productRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const PORT = 8080;
const app = express();


app.use(bodyParser.json());
app.use(cors());


// Array para almacenar la información de los productos
let products = [];

// Array para almacenar la información de los carritos de compras
let carts = [];

// Abrir y cargar la información de los archivos al inicio del servidor
fs.readFile('./src/products.json', (err, data) => {
    if (err) throw err;
    products = JSON.parse(data);
  });
  
  fs.readFile('./src/carts.json', (err, data) => {
    if (err) throw err;
    carts = JSON.parse(data);
  });

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
  

  app.get('/', (req, res) => {
    let result = products;
    res.send(result);
    });

// Ruta para obtener un producto por su ID
productsRouter.get('/:pid', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send({ error: 'Producto no encontrado' });
  } else {
    res.send(product);
  }
});

// Ruta para añadir un nuevo producto
productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    newProduct.id = Date.now();
    products.push(newProduct);
    fs.writeFile('productos.json', JSON.stringify(products), err => {
      if (err) {
        res.status(500).send('Error al añadir el producto');
      } else {
        res.send('Producto añadido con éxito');
      }
    });
  });

// Ruta para actualizar un producto
productsRouter.put('/:pid', (req, res) => {
  // Código para actualizar un producto
});

// Ruta para eliminar un producto
app.delete('/:id', async (req, res) => {
  const id = req.params;
  products = products.filter((product) => product.id !== id);
  fs.writeFile('./src/products.json', JSON.stringify(products), err => {
    if (err) {
      res.status(500).send('Error deleting product');
    } else {
      res.send('Product deleted successfully');
    }
  });
});


//Router para el carrito de compras
const cartsRouter = express.Router();

// Ruta para crear un nuevo carrito
  cartsRouter.post('/', (req, res) => {
    const newCart = req.body;
    const cartID = generateUniqueID(); 
    cartDB[cartID] = newCart;
  
    // Finalmente, enviamos una respuesta con el ID del nuevo carrito y un mensaje de éxito
    res.send({ message: 'Carrito creado con éxito', cartID });
  });
  
  // Ruta para obtener los productos de un carrito por su ID
  cartsRouter.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    const cart = cart[cid];
    // Si no encontramos un carrito con ese ID, enviamos un mensaje de error
  if (!cart) {
    res.status(404).send({ message: 'No se encontró un carrito con ese ID' });
    return;
  }

  // Si encontramos el carrito, enviamos la lista de productos como respuesta
  res.send({ products: cart.products });
});
  
  // Ruta para añadir un producto a un carrito
  cartsRouter.post('/:cid/product/:pid', (req, res) => {
    // Código para añadir un producto a un carrito
  });



  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
  