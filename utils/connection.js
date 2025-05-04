import mongoose from "mongoose"

const connection = async (uri) => {

    try {
        await mongoose.connect(uri)
        console.log('Conexión OK')
    } catch (error) {
        console.log('No se pudo conectar al servidor', error)
    }

}

export default connection