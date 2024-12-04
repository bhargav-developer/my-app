import { Product } from '@/src/models/productModel';
import { connect } from '../../../../dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect()


export const GET = async () => {
    try {
    
        const Products = await Product.find({})
        return NextResponse.json({ Products }, { status: 200 })
    } catch (error) {
        console.error("Error creating products:", error);
        return NextResponse.json({ message: "Error creating products" }, { status: 400 })
    }

}