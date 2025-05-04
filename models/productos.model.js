import mongoose from "mongoose"

// ? 1. Crear un ESQUEMA
// Para crear un SCHEMA lo que hago es decirle a Mongoose cómo va a ser el documento (qué forma va a tener)

const productoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        precio: Number,
        stock: Number,
        marca: String,
        categoria: String,
        detalles: String,
        foto: String,
        envio: Boolean
    },
    {
        versionKey: false,
        timestamps: true
    }
)

// ? 2. Crear un MODELO (a partir del esquema)
// Le digo a Mongoose que el documento descripto en el esquema, se va a guardar en la colección indicada

//                             ('nombre-colección', schema a usar)
const ProductoModelo = mongoose.model('productos', productoSchema)

const obtenerTodosLosProductos = async () => {

    try {

        const productos = await ProductoModelo.find({})
        return productos

    } catch (error) {
        throw error
    }
}

const obtenerUnProducto = async (id) => {

    try {

        const producto = await ProductoModelo.findById(id)
        return producto
        
    } catch (error) {
        throw error
    }

}

const crearUnProducto = async (productoNuevo) => {

    try {
        
        const productoAGuardar = new ProductoModelo(productoNuevo)
        const productoGuardado = await productoAGuardar.save()
        return productoGuardado

    } catch (error) {
        throw error
    }

}

const editarUnProducto = (productoEditado) => {

}

const removerProducto = (id) => {

}

export default {
    obtenerTodosLosProductos,
    obtenerUnProducto,
    crearUnProducto,
    editarUnProducto,
    removerProducto
}