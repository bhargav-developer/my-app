import { Product } from "@/src/models/productModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const reqBody = await req.json()
        const { id } = reqBody;
        const ProductId = new mongoose.Types.ObjectId(id)
        const product = await Product.find({ _id: ProductId });
        if (product) {
            return NextResponse.json({ product }, { status: 200 })
        }
        return NextResponse.json({ message: "product not found" }, { status: 404 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

}