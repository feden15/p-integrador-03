import models from '../models/productos.model.js'

const getAll = async (req, res) => {

    try {

        const productos = await models.obtenerTodosLosProductos()
        res.json(productos)

    } catch (error) {

        console.log(error)
        res.status(500).json({
            mensaje: 'No se pudieron listar los productos'
        })
        
    }

}

const getOne = async (req, res) => {

    const id = req.params.id

    try {

        if (id) {
            const producto = await models.obtenerUnProducto(id)
            res.json(producto)
        } else {
            res.status(400).json({
                mensaje: 'No se envió la información necesaria'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Hubo un inconveniente, no se pudo obtener el producto'
        })
    }

}

const create = async (req, res) => {

    const productoACrear = req.body

    try {

        const productoGuardado = await models.crearUnProducto(productoACrear)
        res.status(201).json(productoGuardado)

    } catch (error) {

        console.log(error)
        res.status(500).json({
            mensaje: 'No se pudo crear el producto'
        })

    }

}

const update = async (req, res) => {
    
    const id = req.params.id
    const productoAEditar = req.body
    productoAEditar.id = id 
    
    try {
        
        const productoActualizado = await models.editarUnProducto(productoAEditar)
        res.json(productoActualizado)
        
    } catch (error) {

        console.log(error)
        res.json({
            mensaje: 'No se pudo actualizar el producto'
        })

    }
    
}

const remove = async (req, res) => {

    const id = req.params.id

    try {

        const productoEliminado = await models.eliminarProducto(id)
        res.json(productoEliminado)

    } catch (error) {

        console.log(error)
        res.status(500).json({
            mensaje: "No se pudo borrar el producto"
        })
    }

}

export default {
    getAll,
    getOne,
    create,
    remove,
    update
}