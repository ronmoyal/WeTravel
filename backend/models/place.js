const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String,required:true },
    description: {type: String , required:true},
    image: { type: String,required:true } ,//URL 
    address: { type: String,required:true },
    location:{
        lat: { type: Number,required:true },
        lng: { type: Number,required:true },
    },
    creator: { type: mongoose.Types.ObjectId, requierd:true, ref: 'User'} // the real user 
});

module.exports=mongoose.model('Place',placeSchema);
