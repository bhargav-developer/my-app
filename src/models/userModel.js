const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },  
    password:{
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
   forgotPasswordToken: String,
    forgotPasswordTokenExp: Date,
    verifyToken: String,
    verifyTokenExp: Date, 

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User