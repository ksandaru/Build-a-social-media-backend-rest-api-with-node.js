const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [
    {type:mongoose.Types.ObjectId, ref: "Blog"}
  ]
});

module.exports = mongoose.model("User", UserSchema);
//model is 'User'
//so, db collection will be 'users'
