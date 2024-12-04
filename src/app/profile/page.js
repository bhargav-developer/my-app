"use client"

import useStore from '@/src/helpers/store.js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Profile = () => {
  const router = useRouter()
  const { userInfo, setUserInfo } = useStore();

  useEffect(() => {
    try {
  
      const getUserInfo = async () => {
        const res = await axios.get("/api/auth/me");
        if (res.status === 200) {
          setUserInfo(res.data)
        }
      }
      getUserInfo()
    } catch (err) {
      if (err.status === 400) {
        router.push('/login')
      }
    }
  }, [])

  const logOut = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.data.success) {
        router.push("/login")
      }
      console.log(userInfo)
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <div>
      <h1 className='text-center' >Profile</h1>


      <button onClick={logOut} className='bg-red-400 rounded-xl p-3 text-white' >Log out</button>

    </div>
  )
}

export default Profile