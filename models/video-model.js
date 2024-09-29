const mongoose = require('mongoose');
const {Schema} = mongoose;

const videoSchema = new Schema({
    videoId:{type: String, required: true},
    title:{type: String, required: true },
    fileName: { type: String, required: true},
    uid:{type: String, required: true, unique: true},
    description: {type: String, default:''},
    likes:[{type: Schema.Types.ObjectId, ref:'channel'}],
    commentsStatus: {type: Boolean, default: true},
    comments:[{type: Schema.Types.ObjectId, ref:'comment'}],
    tags:[{type: Schema.Types.ObjectId, ref:'tag'}],
    hashTag: [{type: Schema.Types.ObjectId, ref:'tag'}],
    uploadDate: {type: Date},
    length: {type: Number},
    aspect:{type: Number},
    category: {type: String},
    privacySettings:{
        type: String,
        trim: true,
        default: "private",
        enum:['public','unlisted','private']
    },
    viewsEnabled: {type: Boolean, default: true},
    status: {type: String, trim: true, default:'uploading'},
    channel: {type: Schema.Types.ObjectId, ref:'channel'},

},{timestamps: true});

videoSchema.index({title: 'text',description:'text' });
videoSchema.index({channel: 1});
videoSchema.index({length: 1});
videoSchema.index({privacySettings: 1});
videoSchema.index({uploadDate: 1});

module.exports = mongoose.model('video', videoSchema);