import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express()
const PORT = 8080

// ! Conexión de base de datos

const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Conexión OK')
    } catch (error) {
        console.log('No se pudo conectar al servidor', error)
    }
}

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
    }
)

// ? 2. Crear un MODELO (a partir del esquema)
// Le digo a Mongoose que el documento descripto en el esquema, se va a guardar en la colección indicada

//                             ('nombre-colección', schema a usar)
const ProductoModelo = mongoose.model('productos', productoSchema)

// ! --------------------------------------------------------------------------

// ! Middlewares
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

// ! --------------------------------------------------------------------------

// ! Arranque

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
        console.log(`Aplicación funcionando http://localhost:${PORT}`)
    conexionDB()
})

// ! --------------------------------------------------------------------------