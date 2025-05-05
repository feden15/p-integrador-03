// ! Esquema para el carrito

import mongoose from 'mongoose'

const carritoSchema = mongoose.Schema(
    {
    carrito: Array
    },
    {
        versionKey: false,
        timestamps: true
    }
)

// ! Con el esquema, creo el modelo

const CarritoModel = mongoose.model('carritos', carritoSchema)

// -------------------------------------------------------------
// Métodos que nos van a server para interactuar con la DB
// -------------------------------------------------------------

const crearCarrito = async (carrito) => {

    try {

        const carritoCreado = new CarritoModel( carrito ) // tiene que recibir un objeto
        const carritoGuardado = await carritoCreado.save()

        return carritoGuardado

    } catch (error) {
        throw error
    }

}

export default {
    crearCarrito
}