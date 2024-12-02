import { Product } from '@/src/models/productModel';
import { connect } from '../../../../dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect()

const randomProducts = [
    {
        name: "Urban Nomad",
        category: "Men",
        description: "A rugged yet stylish T-shirt for the man who's always on the move. Perfect for navigating the concrete jungle with ease and confidence.",
        price: 99,
        imageLink: "http://localhost:3000/Products/Men/1.png",
    },
    {
        name: "Classic Vibe",
        category: "Men",
        description: "A timeless design that never goes out of style. The Classic Vibe T-shirt offers simplicity and comfort, ideal for those who prefer the essentials.",
        price: 69,
        imageLink: "http://localhost:3000/Products/Men/2.png",
    }
]

export const GET = async () => {
    try {
        // await Promise.all(randomProducts.map(async (e) => {
        //     await Product.create(e);
        // }));
       const Products = await Product.find({})
        return NextResponse.json({Products},{status: 200})
    } catch (error) {
        console.error("Error creating products:", error);
    }

}