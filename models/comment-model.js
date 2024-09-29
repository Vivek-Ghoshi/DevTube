const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    video:{type: Schema.Types.ObjectId, ref:'video', required: true, },
    channel:{type: Schema.Types.ObjectId, ref:'channel', required: true},
    text:{type:String, required:true, trim: true},
    postedDate:{type: Date, default: Date.now()},
    likes:[{type: Schema.Types.ObjectId, ref: 'channel'}],
    dislikes:[{type: Schema.Types.ObjectId, ref: 'channel'}],
    replies:[{type: Schema.Types.ObjectId, ref: 'comment'}],
});

module.exports = mongoose.model('comment', commentSchema);