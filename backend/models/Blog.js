const { Schema, default: mongoose } = require('mongoose');

const BlogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },


})

module.exports = mongoose.model('Blog', BlogSchema);