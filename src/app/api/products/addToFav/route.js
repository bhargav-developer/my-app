import { connect } from "@/src/dbConfig/dbConfig";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { User } from "@/src/models/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
connect()
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

        if (!findUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        let productExist = false;
         findUser.fav.map((e) => {
            if(e.id === productId){
                productExist = true
            }
        })
        console.log(productExist)
        if (productExist) {
            findUser.fav.pop({id: productId});
        }
        else {
            findUser.fav.push({ id: productId })
        }
        console.log(findUser)

        await findUser.save();

        return NextResponse.json({ res: "Product added to Fav successfully" }, { status: 200 });



    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 400 })

    }

}