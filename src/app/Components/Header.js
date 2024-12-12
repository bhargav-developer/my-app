"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import useStore from '@/src/helpers/store';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [profileDropdown, setProfileDropdown] = useState(false)
    const [cart, setCart] = useState([])
    const { userInfo, setUserInfo } = useStore();
    const router = useRouter()
    const logOut = async () => {
        try {
            const res = await axios.get("/api/auth/logout");
            if (res.status === 200) {
                router.push("/login")
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        const getUserInfo = async () => {
            const res = await axios.get("/api/auth/me");
            if (res.status === 200) {
                setUserInfo(res.data)
            }
        }
        getUserInfo()
    }, [])

    useEffect(() => {
        setCart(userInfo.cart)
    }, [userInfo])



    return (
        <>
            <div>
                <nav className='flex  justify-between items-center px-16 m-5'>
                    <div>
                        <h1 className='font-bold text-2xl'>BS.</h1>
                    </div>
                    <div>
                        <ul className='flex gap-7'>
                            <Link href={"/"}>Home</Link>
                            <Link href={"/catalogue"}>Catalogue</Link>
                            <li className='cursor-pointer '>Store </li>
                        </ul>
                    </div>
                    <div className='flex gap-7 items-center justify-center'>
                        <div className='relative'>
                            <Link href={"/cart"}> <CiShoppingCart className='text-2xl cursor-pointer' /></Link>
                           
                            { cart &&
                                <div className='absolute bottom-[-5px] right-[-10px] bg-black rounded-[50%] w-[18px] h-[17px] text-white text-[11px] flex justify-center items-center'>{cart.length}</div>
                            }
                        </div>
                        <div className='flex flex-col relative justify-center'>
                            <CgProfile className='text-2xl cursor-pointer' onClick={() => setProfileDropdown(!profileDropdown)} />
                            {
                                profileDropdown &&
                                <div className='flex justify-center'>
                                    <div className='bg-slate-200 rounded-sm flex flex-col p-2 absolute mt-2'>
                                        <span className='text-base'>Profile</span>
                                        <hr />
                                        <span className='text-base cursor-pointer' onClick={logOut} >Logout</span>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </nav>

            </div>
        </>
    )
}

export default Header