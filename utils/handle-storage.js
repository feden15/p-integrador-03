import path from 'node:path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        const rutaDeAlmacenamiento = path.join('public', 'uploads') // /public/uploads
        cb(null, rutaDeAlmacenamiento)

    },
    filename: function(req, file, cb) {
        
        const extension = file.originalname.split('.').pop()
        // con split le indicas cuál es el separador y con pop le decis que extraiga la última parte (la extensión del archivo) y la guarde en la constante declarada
        // foto.jpg -> ['foto', 'jpg'] (pop sacaría 'jpg')

        const nombreArchivo = `${uuidv4()}.${extension}`
        cb(null, nombreArchivo)
    }
})

export default storage