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

        console.log(error)
        res.status(500).json({
            mensaje: 'No se pudieron listar los productos'
        })
        
    }
}

const obtenerUnProducto = (id) => {

}

const crearUnProducto = (productoNuevo) => {

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