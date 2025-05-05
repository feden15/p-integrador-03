import express from 'express'
import 'dotenv/config'
import connection from './utils/connection.js'
import routerProductos from './routers/productos.router.js'
import routerUploads from './routers/uploads.router.js'
import path from 'node:path'

const app = express()
const PORT = 8080
const URI_DB = process.env.URI_LOCAL

// ! Middlewares

app.use(express.json()) // para poder comprender lo que llega en el body a través de un json
app.use(express.static(path.join('public')))
// ! --------------------------------------------------------------------------

// ! Rutas

app.get('/', (req, res) => {
    res.send('Proyecto Integrador - Etapa 3')
})

app.use('/api/v1/productos', routerProductos)
app.use('/api/v1/uploads/', routerUploads)

// ! --------------------------------------------------------------------------

// ! Arranque

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
        console.log(`Aplicación funcionando http://localhost:${PORT}`)
    connection(URI_DB)
})

// ! --------------------------------------------------------------------------