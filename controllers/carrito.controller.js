import model from '../models/carrito.model.js'

const guardarCarrito = async (req, res) => {

    const carrito = req.body

    try {

        const carritoGuardado = await model.crearCarrito(carrito)
        res.status(201).json(carritoGuardado)
        
    } catch (error) {
        console.log('[guardarCarrito]', error)
        res.status(500).json({
            mensaje: 'No se pudo guardar el carrito'
        })
    }

}

export default {
    guardarCarrito
}