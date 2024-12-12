import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { User } from "@/src/models/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const user = getDataFromToken(req);
        const userId = new mongoose.Types.ObjectId(user.id);
        const reqBody = await req.json();
        const { productId } = reqBody;

        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }
        const findUser = await User.findById(userId);

        const productIndex = findUser.cart.findIndex(item => item.productId === productId);

        if (productIndex >= 0) {
            if (findUser.cart[productIndex].quantity > 1) {
                findUser.cart[productIndex].quantity -= 1;
            }
            else{
                findUser.cart.splice(productIndex,1);
            }
        } 
       await findUser.save()
       console.log(findUser.cart[productIndex])
       return NextResponse.json({ message: "Product quantity decresed" }, { status: 200 })

    } catch (error) {
    
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}