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

// ! --------------------------------------------------------------------------

// ! Arranque

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
        console.log(`Aplicación funcionando http://localhost:${PORT}`)
    conexionDB()
})

// ! --------------------------------------------------------------------------