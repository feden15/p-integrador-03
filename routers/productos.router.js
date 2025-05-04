import express from 'express'
import mongoose from 'mongoose'
import productosController from '../controllers/productos.controller.js'

const routerProductos = express.Router()

// GET ALL
routerProductos.get('/', productosController.getAll)

// GET ONE
routerProductos.get('/:id', productosController.getOne)

// CREATE (POST)
routerProductos.post('/', productosController.create)

// DELETE
routerProductos.delete('/:id', productosController.remove)

// UPDATE
routerProductos.put('/:id', productosController.update)

// routerProductos.all('', (req, res) => {

//     res.status(404).json({
//         ruta: `${req.url}`,
//         metodo: `${req.method}`,
//         mensaje: 'No se encontró el recurso al que estás queriendo acceder'
//     })

// })

export default routerProductos