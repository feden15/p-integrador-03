import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import connection from './utils/connection.js'

const app = express()
const PORT = 8080
const URI_DB = process.env.URI_LOCAL

// ? 1. Crear un ESQUEMA
// Para crear un SCHEMA lo que hago es decirle a Mongoose cómo va a ser el documento (qué forma va a tener)

const productoSchema = new mongoose.Schema(
    {
        nombre: String,
        precio: Number,
        stock: Number,
        marca: String,
        categoria: String,
        detalles: String,
        foto: String,
        envio: Boolean
    },
    {
        versionKey: false,
        timestamps: true
    }
)

// ? 2. Crear un MODELO (a partir del esquema)
// Le digo a Mongoose que el documento descripto en el esquema, se va a guardar en la colección indicada

//                             ('nombre-colección', schema a usar)
const ProductoModelo = mongoose.model('productos', productoSchema)

// ! Middlewares

app.use(express.json()) // para poder comprender lo que llega en el body a través de un json

// ! --------------------------------------------------------------------------

// ! Rutas

app.get('/', (req, res) => {
    res.send('Proyecto Integrador - Etapa 3')
})

// GET ALL
app.get('/api/v1/productos', async (req, res) => {

    try {
        
        const productos = await ProductoModelo.find({})
        res.json(productos)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'No se pudieron listar los productos'
        })
    }

})

// GET ONE
app.get('/api/v1/productos/:id', async (req, res) => {
    
    const id = req.params.id

    try {
        
        if (id) {
            const producto = await ProductoModelo.findById(id)
            res.json(producto)
        } else {
            res.status(400).json({
                mensaje: 'No se envió la información necesaria'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Hubo un inconveniente, no se pudo obtener el producto'
        })
    }

})

// CREATE (POST)
app.post('/api/v1/productos', async (req, res) => {

    const productoACrear = req.body
    // console.log(productoACrear)

    try {
        const productoModel = new ProductoModelo(productoACrear)
        const productoCreado = await productoModel.save()
        res.status(201).json(productoCreado)
    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'No se pudo crear el producto' })
    }

})

// DELETE
app.delete('/api/v1/productos/:id', async (req, res) => {

    const id = req.params.id
    
    try {

        const productoBorrado = await ProductoModelo.findByIdAndDelete(id).lean()
        // Lean lo que hace es saca el objeto completo de mongoose y te da uno limpio (solo el producto a borrar)
        // convierte un obj de mongoose en un objeto de javascript
        res.json({
            ...productoBorrado // Puedo hacerlo así porque usé lean() antes
        })

    } catch (error) {

        res.status(500).json({
            mensaje: "No se pudo borrar el producto"
        })
    }

})

// UPDATE
app.put('/api/v1/productos/:id', async (req, res) => {

    const id = req.params.id
    const productoEditado = req.body

    try {

        // console.log(id);
        // console.log(productoEditado)

        const productoActualizado = await ProductoModelo.findByIdAndUpdate(id, productoEditado, { new: true }).lean()
        // con la opción {new: true} me va a devolver el usuario actualizado, no el usuario viejo

        res.json({
            ...productoActualizado
        })

    } catch (error) {
        res.json({
            mensaje: 'No se pudo actualizar el producto'
        })
    }

})

// ! --------------------------------------------------------------------------

// ! Arranque

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
        console.log(`Aplicación funcionando http://localhost:${PORT}`)
    connection(URI_DB)
})

// ! --------------------------------------------------------------------------