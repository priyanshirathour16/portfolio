const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("email.is incorrect ")
            }
        }

    },
    number:{
        type:Number,
        require:true,
        unique:true,
    },
    message:{
        type:String,

    }
})

// create a collection==========================

const User =  mongoose.model("userData" , userSchema);

module.exports = User;