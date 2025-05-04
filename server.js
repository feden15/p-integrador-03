import express from 'express'
import 'dotenv/config'
import connection from './utils/connection.js'
import routerProductos from './routers/productos.router.js'

const app = express()
const PORT = 8080
const URI_DB = process.env.URI_LOCAL

// ! Middlewares

app.use(express.json()) // para poder comprender lo que llega en el body a través de un json

// ! --------------------------------------------------------------------------

// ! Rutas

app.use('/api/v1/productos', routerProductos)

// ! --------------------------------------------------------------------------

// ! Arranque

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
        console.log(`Aplicación funcionando http://localhost:${PORT}`)
    connection(URI_DB)
})

// ! --------------------------------------------------------------------------