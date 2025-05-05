import express from 'express'
import 'dotenv/config'
import connection from './utils/connection.js'
import routerProductos from './routers/productos.router.js'
import routerUploads from './routers/uploads.router.js'
import path from 'node:path'
import cors from 'cors'

// ! Constantes

const app = express()
const PORT = 8080
// const URI_DB = process.env.URI_LOCAL
const URI_DB = process.env.URI_REMOTA
const URL_FRONT = process.env.URL_FRONTEND_CORS
// ! --------------------------------------------------------------------------

// ! Configuraciones

const corsConfig = {
    origin: URL_FRONT // link completo de netlify (frontend)
}
// ! --------------------------------------------------------------------------

// ! Middlewares

app.use(express.json()) // para poder comprender lo que llega en el body a través de un json
app.use(express.static(path.join('public')))
app.use(cors(corsConfig))
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