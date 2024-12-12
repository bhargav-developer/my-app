import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
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
    cart: {
        type: [{ productId: String, quantity: Number }],
    },
    fav: {
        type: [{ id: String, quantity: Number }],
        required: false,
    }

})

export const User = mongoose.models.users || mongoose.model("users", userSchema)

