const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String ,require: true },
    email: {type: String , require: true, unique: true}, // unique - create index for email
    password:{ type: String, require: true, minlength: 8 },
    image:  {type: String ,require: true },
    places: [{ type: mongoose.Types.ObjectId, requierd:true, ref: 'Place'}] // the real places (array) 


});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
