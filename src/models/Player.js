const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;
const playerSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    category:{type:String, required:true},
    password:{type:String, required:true},
    date:{type:Date, default:Date.now}
});

playerSchema.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};
playerSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('Player', playerSchema);
