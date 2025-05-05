import express from 'express'
import controller from '../controllers/uploads.controller.js'
import uploadsMiddleware from '../middlewares/uploads.middleware.js'

const routerUploads = express.Router()

//                                                la key
routerUploads.post('/', uploadsMiddleware.single('imagen'), controller.uploadImagen)
 
export default routerUploads