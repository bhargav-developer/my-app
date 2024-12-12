"use client";
import useStore from "@/src/helpers/store";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";

const page = () => {
    const { userInfo, setUserInfo } = useStore();  
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);


    const fetchProducts = async () => {
        const cartItems = userInfo.cart;
        if (cartItems) {
            try {
                const fetchedProducts = await Promise.all(
                    cartItems.map(async (e) => {
                        const res = await axios.post("/api/products/getSpecificProducts", { id: e.productId });
                        if (res.status === 200) {
                            return res.data.product;
                        }
                    })
                );
                setProducts(fetchedProducts.filter((product) => product !== undefined));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
    };

    // Update the total amount
    useEffect(() => {
        fetchProducts();
    }, [userInfo]);

    // Recalculate total when products or cart changes
    useEffect(() => {
        let newTotal = 0;
        products.forEach((product) => {
            const cartItem = userInfo.cart.find((item) => item.productId === product._id);
            if (cartItem) {
                newTotal += product.price * cartItem.quantity;
            }
        });
        newTotal += 9; // Add sales tax (adjust logic as needed)
        setTotal(newTotal);
    }, [products, userInfo.cart]);

    // Add item to the cart and update local store
    const addToCart = async (id) => {
        const res = await axios.post("/api/products/addToCart", { productId: id });
        if (res.status === 200) {
            const updatedCart = [...userInfo.cart];
            const existingItem = updatedCart.find(item => item.productId === id);
            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity
            } else {
                updatedCart.push({ productId: id, quantity: 1 }); // Add new item if not in cart
            }
            setUserInfo({ ...userInfo, cart: updatedCart });  // Update the cart in the store
        }
    };

    const removeFromCart = async (id) => {
        const res = await axios.post("/api/products/removeFromCart", { productId: id });
        if (res.status === 200) {
            const updatedCart = [...userInfo.cart];
            const existingItem = updatedCart.find(item => item.productId === id);
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                setUserInfo({ ...userInfo, cart: updatedCart });
            }
            else {
                const updatedCart = userInfo.cart.filter(item => item.productId !== id);
                setUserInfo({ ...userInfo, cart: updatedCart });
            }
        }
    };

    return (
        <>
            <Header />
            <div className="flex mt-5">
                {products.length > 0 ? (
                    <div className="flex w-full">
                        <div className="basis-[70%] px-6">
                            {products.map((product) => {
                                const cartItem = userInfo.cart
                                    ? userInfo.cart.find((item) => item.productId === product._id)
                                    : null;
                                const quantity = cartItem ? cartItem.quantity : 0;

                                return (
                                    <div key={product._id} className="flex px-28 m-7">
                                        <div>
                                            <img src={product.imageLink} width={250} alt={product.name} />
                                        </div>
                                        <div className="flex gap-3 m-5 flex-col">
                                            <h1 className="text-4xl font-bold">{product.name}</h1>
                                            <h2 className="text-2xl">$ {product.price}</h2>
                                            <div className="flex items-center justify-between gap-3">
                                                <div
                                                    className="bg-black py-[10px] cursor-pointer px-[20px] rounded-[50%] text-white text-center"
                                                    onClick={() => {
                                                        removeFromCart(product._id);
                                                    }}
                                                >
                                                    -
                                                </div>
                                                <h2 className="text-xl">Quantity: {quantity}</h2>
                                                <div
                                                    className="bg-black py-[10px] cursor-pointer px-[20px] rounded-[50%] text-white text-center"
                                                    onClick={() => {
                                                        addToCart(product._id);
                                                    }}
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <div className="bg-[#f2f2f2] p-7 m-7 flex flex-col gap-3">
                                {products.length > 0 &&
                                    products.map((product) => {
                                        const cartItem = userInfo.cart
                                            ? userInfo.cart.find((item) => item.productId === product._id)
                                            : null;
                                        const quantity = cartItem ? cartItem.quantity : 0;
                                        const totalPrice = product.price * quantity;
                                        return (
                                            <div key={product._id} className="flex justify-between gap-9 text-xl">
                                                <h2>{product.name}</h2>
                                                <h2>{quantity > 1 && `x ${quantity}`}</h2>
                                                <h2>$ {totalPrice}</h2>
                                            </div>
                                        );
                                    })}
                                <hr />
                                <div className="flex justify-between gap-9 text-xl">
                                    <h2>Sales Tax</h2>
                                    <h2>$9</h2>
                                </div>
                                <hr />
                                <div className="flex justify-between gap-9 text-2xl">
                                    <h2>TOTAL</h2>
                                    <h2>${total}</h2>
                                </div>
                                <div className="m-auto">
                                    <button className="bg-black border text-white p-3 m-3 rounded-sm hover:text-black hover:bg-transparent hover:border-black transition-all duration-200">
                                        Proceed To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mt-5 text-4xl flex justify-center">No Items in Cart :(</div>
                )}
            </div>
        </>
    );
};

export default page;
