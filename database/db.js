const mongoose = require('mongoose')
const MONGOURI = process.env.DB_URI


const InicializaMongoServer = async() => {
    try{
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        console.log(`Conectado ao PokeDB PIKA PIKA`)
    }catch(e){
       console.error(e)
       throw e
    }
}
module.exports = InicializaMongoServer