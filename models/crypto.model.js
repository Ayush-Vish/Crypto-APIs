import mongoose from "mongoose";

const CryptoCurrency = new  mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    symbol :{
        type: String,
        required: false
    },
    name :{
        type: String,
        required: true
    }
    
}); 

export default mongoose.model('CryptoCurrency', CryptoCurrency);