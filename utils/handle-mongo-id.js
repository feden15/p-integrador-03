const handleMongoId = (elemento) => {

    const clave = '_id'

    // convierto un obj mongoose en un obj js
    // con stringfy le saco los métodos del obj mongoose (queda como un string) y dsp lo parseo, lo hago obj js
    elemento = JSON.parse(JSON.stringify(elemento))

    if (Array.isArray(elemento)) {

        for (let i = 0; i < elemento.length; i++) {
            elemento[i].id = elemento[i][clave]
            delete elemento[i][clave]
        }

    } else {

        elemento.id = elemento[clave]
        delete elemento[clave]

    }

    return elemento

}

export default handleMongoId