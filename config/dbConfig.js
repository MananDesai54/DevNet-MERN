const mongoose = require('mongoose');
const config = require('config');

const dbURI = config.get('mongoURI');

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });   
        console.log('Database connected')
    } catch (error) {
        console.error(error.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;