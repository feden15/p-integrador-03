import express from 'express'
import controller from '../controllers/uploads.controller.js'

const routerUploads = express.Router()

routerUploads.post('/', controller.uploadImagen)

export default routerUploads