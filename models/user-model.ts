import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type : String,
      required: true,
      unique: true,
    },
    name: {
        type : String,
        required: true,
    },
    userName: {
        type : String,
        required : true,
        unique: true
    },
    email:{
        type: String
    },
    bio: {
        type : String,
        required: false
    },
    profilePicture: {
        type: String,
        reqyured: false
    }
  },
  { timestamps: true }
);

//check if the model is already compiled , if yes delete it.

if(mongoose.models && mongoose.models['users']){
    mongoose.deleteModel("users")
}
const UserModel = mongoose.model("users",userSchema)

export default UserModel;