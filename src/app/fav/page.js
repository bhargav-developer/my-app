"use client"
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import useStore from '@/src/helpers/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
    const [favItems, setFavItems] = useState([])
    const { userInfo, setUserInfo } = useStore();
    const router = useRouter()

    const fetchProducts = async () => {
        const fav = userInfo.fav;
        if (fav) {
            try {
                const fetchedProducts = await Promise.all(
                    fav.map(async (e) => {
                        const res = await axios.post("/api/products/getSpecificProducts", { id: e.id });
                        if (res.status === 200) {
                            return res.data.product;
                        }
                    })
                );
                setFavItems(fetchedProducts.filter((product) => product !== undefined));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
    };

    useEffect(() => {
        fetchProducts()
    }, [userInfo])

    const redirectPage = async (id) => {
        router.push(`/catalogue/${id}`);
      };

    return (
        <>
            <Header />
            <div className='flex m-5 mt-12 p-5 px-14 flex-wrap'>
                {
                    favItems && favItems.map((e) => {
                        return <div
                            key={e._id}
                            onClick={() => redirectPage(e._id)}
                            className="lg:w-1/4 md:w-1/2 p-4 w-full"
                        >
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img
                                    alt="ecommerce"
                                    className="object-cover hover:scale-125 transition-all duration-300 object-center w-full h-full block"
                                    src={e.imageLink}
                                />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                    {e.category}
                                </h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                    {e.name}
                                </h2>
                                <p className="mt-1">${e.price}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default page