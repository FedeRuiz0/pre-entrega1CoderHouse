import express from "express";
import ProductManager from "../managers/ProductManager.js";

const router = express.Router();
const app = express();

  router.get('/products', (req, res) => {
    let result = products;
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

app.get('/:pid', (req, res) => {
    const product = ProductManager.getProduct(req.params.pid);
    if (!product) {
      res.status(404).send({ error: 'Producto no encontrado' });
    } else {
      res.send(product);
    }
  });

    // Ruta para añadir un nuevo producto

  router.post('/', (req, res) => {
    const newProduct = req.body;
    newProduct.id = Date.now();
    ProductManager.addProduct(newProduct);
    res.send('Producto añadido con éxito');
  });
  
  // Ruta para añadir un nuevo producto
  router.post('/', (req, res) => {
      const newProduct = req.body;
      newProduct.id = Date.now();
      products.push(newProduct);
      fs.writeFile('./src/productos.json', JSON.stringify(products), err => {
        if (err) {
          res.status(500).send('Error al añadir el producto');
        } else {
          res.send('Producto añadido con éxito');
        }
      });
    });
  
  // Ruta para actualizar un producto
  router.put('/:pid', (req, res) => {
    // Código para actualizar un producto
  });
  
  
  // Ruta para eliminar un producto
 router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    product = products.filter((product) => product.id !== id);
  });

  export default router;