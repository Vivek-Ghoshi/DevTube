const mongoose = require('mongoose');
const {Schema} = mongoose;

const tagSchema = mongoose.Schema({
   name:{type: String, required: true, trim: true,unique: true},
   videos:[{type: Schema.Types.ObjectId, ref:'video'}],
   channels:[{type: Schema.Types.ObjectId, ref:'channel'}],
});

module.exports = mongoose.model('tag',tagSchema)