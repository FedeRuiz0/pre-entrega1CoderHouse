const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let producto = {
      'title': title,
      'description': description,
      'price': price,
      'thumbnail': thumbnail,
      'code': code,
      'stock': stock,
    }
 
    this.products.length === 0 ? producto["id"] = 1 : producto["id"] = this.products[this.products.length -1 ]["id"] + 1
    let encontrado = this.products.some(elemento => elemento.code === code)

    if (encontrado) console.warn('El codigo de producto ya existe')
    else {
      this.products.push(producto)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
    }

  }

  getProducts = () => {
    return this.products
  }

  getElementById = (id) => {
    let producto = this.products.find(el => el.id === id)
    console.log('Cargando producto por ID:', producto || 'El producto no existe')
  }


  updateProduct(id, campo, valorNuevo) {

    let index = this.products.findIndex(element => element.id === id)
    let campoValido = Object.keys(this.products[index]).some(el => el === campo)
    if (campo === 'id') {
      console.error('El producto no puede ser actualizado\n')
    } else if (!campoValido) {
      console.error('Elija un campo valido\n')
    } else {
      this.products[index][campo] = valorNuevo;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
    }


  }


  deleteProduct(id) {
    let encontrado = this.products.some(el => el.id === id)
    if (encontrado) {
      this.products = this.products.filter(el => el.id !== id)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      console.log('Producto eliminado \n')
    } else {
      console.error('El producto no existe')
    }
  }
}

const manager = new ProductManager('products.json')
console.log(manager.getProducts())

module.exports = ProductManager;
