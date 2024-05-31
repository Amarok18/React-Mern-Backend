const mongoose = require("mongoose")



const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log("DB CONNECTED")
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de inicializar a la base de datos")
    }

}

module.exports = dbConnection