 import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const carts = new CartManager('../src/carts.json')


router.post('/', (req, res) => {
    // · crear un carrito
    const cart = carts.createCart();
    res.status(200).send(cart);
})

router.get('/:cid', (req, res) => {
    // · conseguir un carrito por su id
    const { cid } = req.params;

    const getCart = carts.getCartByID(cid)
    if(getCart.id){
        res.status(200).send(getCart)
    }else{
        res.status(400).send(getCart)
    }
})

router.post('/:cid/product/:pid', (req, res) => {
    // agregar el producto al arreglo de carrito, product id & quantity.
    const { cid, pid } = req.params;
    
    const result = carts.addProductToCart(cid, pid)
    
    if(result.cart){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
})

export default router;
