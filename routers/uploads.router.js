import express from 'express'
import path from 'node:path'
import fs from 'node:fs'

import controller from '../controllers/uploads.controller.js'
import uploadsMiddleware from '../middlewares/uploads.middleware.js'

const routerUploads = express.Router()


routerUploads.get('/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
    // cwd te da la raíz -> public/uploads/imagen.jpg se ve como http://localhost:3000/uploads/imagen.jpg

    // Verifica si el archivo existe
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ mensaje: 'Archivo no encontrado' })
    }

    res.sendFile(filePath)
})

//                                                la key
routerUploads.post('/', uploadsMiddleware.single('imagen'), controller.uploadImagen)
 
export default routerUploads