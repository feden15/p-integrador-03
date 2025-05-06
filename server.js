import express from 'express'
import 'dotenv/config'
import connection from './utils/connection.js'
import routerProductos from './routers/productos.router.js'
import routerUploads from './routers/uploads.router.js'
import routerCarrito from './routers/carrito.router.js'
import path from 'node:path'
import cors from 'cors'

// ! Constantes

const app = express()
const PORT = process.env.PORT
// const URI_DB = process.env.URI_LOCAL
const URI_DB = process.env.URI_REMOTA
// const URL_FRONT = process.env.URL_FRONTEND_CORS
// ! --------------------------------------------------------------------------

// ! Configuraciones

// const corsConfig = {
//     origin: function (origin, callback) {
//         console.log('Origin recibido:', origin)
//         if (!origin || origin === URL_FRONT) {
//             console.log('Origin permitido')
//             callback(null, true)
//         } else {
//             console.log('Origin bloqueado')
//             callback(new Error('No permitido por CORS'))
//         }
//     }
// }
// ! --------------------------------------------------------------------------

// ! Middlewares

app.use(express.json()) // para poder comprender lo que llega en el body a través de un json
app.use(cors())
app.use(express.static(path.join('public')))
// ! --------------------------------------------------------------------------

// ! Rutas

app.get('/', (req, res) => {
    res.send('Proyecto Integrador - Etapa 3')
})

app.use('/api/v1/productos', routerProductos)
app.use('/api/v1/uploads', routerUploads)
app.use('/api/v1/carrito', routerCarrito)
// ! --------------------------------------------------------------------------

// ! Arranque

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
    console.log(`Aplicación funcionando http://localhost:${PORT}`)
    connection(URI_DB)
})
// ! --------------------------------------------------------------------------