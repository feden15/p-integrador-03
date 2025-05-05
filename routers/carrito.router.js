import express from 'express'
import controller from '../controllers/carrito.controller.js'

const routerCarrito = express.Router()

// Post para que se efectúe la compre
routerCarrito.post('/', controller.guardarCarrito)

export default routerCarrito