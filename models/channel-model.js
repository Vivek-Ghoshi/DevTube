const mongoose = require('mongoose');
const {Schema} = mongoose;

const channelSchema = new Schema({
    name:{type:String, required: true, trim: true},
    uid:{type:String, sparse:true},
    email:{type:String,trim:true},
    handle:{type:String, required: true,sparse: true},
    description:{type: String,trim: true},
    logoUrl:{type: String,trim:true},
    bannerImageUrl:{type:String,trim:true},
    createdDate:{type:Date, default: Date.now()},
    subscribers:[{type: Schema.Types.ObjectId,ref:'channel'}],
    tags:[{type:Schema.Types.ObjectId, ref:'tag'}],
    subscriptions:[{types: Schema.Types.ObjectId, ref:'subscriptions'}],
    collectionId:{type: String, sparse: true},
    videos:[{type: Schema.Types.ObjectId,ref:'video'}],
    
});

channelSchema.index(
    {uid: 1},
    {
        unique: true,
        partialFilterExpression:{ uid:{ $exists: true, $ne: null}},
    }
);
channelSchema.index(
    {handle: 1},
    {
        unique: true,
        partialFilterExpression:{ handle:{ $exists: true, $ne: null}},
    }
);
channelSchema.index(
    {collectionId: 1},
    {
        unique: true,
        partialFilterExpression:{ collectionId:{ $exists: true, $ne: null}},
    }
);

channelSchema.index({name: 'text', description: 'text'});

module.exports = mongoose.model('channel', channelSchema);