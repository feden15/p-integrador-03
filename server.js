import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express()
const PORT = 8080

const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Conexión OK')
    } catch (error) {
        console.log('No se pudo conectar al servidor', error)
    }
}

app.get('/', (req, res) => {
    res.send('Proyecto Integrador - Etapa 3')
})

app.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor')
    console.log(`Aplicación funcionando http://localhost:${PORT}`)
    conexionDB()
})