"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useStore from '@/src/helpers/store.js';
import axios from 'axios';

const page = ({ params }) => {

    const { userInfo } = useStore()
    const [ product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(undefined)
    const [fav, setFav] = useState(false)

    const getProduct = async () => {
        try {
            const { id } = await params
            const res = await axios.post("/api/products/getSpecificProducts", { id })
            if (res.status === 200) {
                setProduct(res.data.product)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(true)
        }

    }


    useEffect(() => {

        getProduct()
        console.log(userInfo)
        if (userInfo.cart) {
            const cartItem = userInfo.cart.find(item => item.productId === product._id);
            if (cartItem) {
                setQuantity(cartItem.quantity);
            }
            else {
                setQuantity(0)
            }
        }
        if (userInfo.fav) {
            const isFav = userInfo.fav.find(item => item.id === product._id);
            if (isFav) {
                setFav(true)
            }
            else {
                setFav(false)
            }

        }

    }, [userInfo])

    const addToCart = async () => {
        const res = await axios.post("/api/products/addToCart", { productId: product._id });
        if (res.status === 200) {
            if (quantity === 0) {
                userInfo.cart.push({ productId: product._id, quantity: 1 })
                console.log(userInfo.cart)
            }
            setQuantity(quantity + 1)
        }
    }

    const addToFav = async () => {
        const res = await axios.post("/api/products/addToFav", { productId: product._id });
        if (res.status === 200) {
            setFav(!fav)
        }
    }

    const removeFromCart = async () => {
        const res = await axios.post("/api/products/removeFromCart", { productId: product._id });
        if (res.status === 200) {
            if (quantity === 1) {
                userInfo.cart.pop({ productId: product._id })
                console.log(userInfo.cart)
            }
            setQuantity(quantity - 1)
        }
    }

    if (!loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Header />
            <div className='flex px-16 m-5 mt-12'>
                <div className='basis-[50%] flex justify-center items-center'>
                    <img src={product.imageLink} className='rounded-md' width={400} />
                </div>
                <div className='basis-[50%] flex justify-center flex-col gap-7'>
                    <h1 className='text-3xl font-bold'>{product.name}</h1>
                    <p className='text-gray-500'>{product.description}</p>
                    <h1 className='text-4xl font-bold'>${product.price}</h1>
                    <div className='flex gap-5'>
                        {quantity > 0 ?
                            <div className='flex items-center justify-between gap-3'>
                                <div className='bg-black py-[10px] cursor-pointer px-[20px] rounded-[50%] text-white text-center' onClick={removeFromCart}>-</div>
                                <div className=''>{quantity}</div>
                                <div className='bg-black py-[10px] cursor-pointer px-[20px] rounded-[50%] text-white text-center' onClick={addToCart}>+</div>
                            </div>
                            :
                            <button className='basis-[70%] border hover:bg-transparent hover:text-black hover:border-black transition-all duration-200  bg-black rounded-md p-4 text-white' onClick={addToCart}>Add To cart</button>

                        }

                        <button className='p-4 px-5 bg-[#f0eee6] rounded-md text-2xl ' onClick={addToFav}> {
                            fav ? <MdFavorite className='text-red-600 ' /> : <MdFavoriteBorder />
                        }
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page