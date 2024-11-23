"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Profile = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(false)

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get("/api/auth/me");
      if (res.status === 200) {
        setUserInfo(res.data)
      }
    }
    getUserInfo()
  }, [])

  const logOut = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.data.success) {
        router.push("/login")
      }
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <div>
      <h1 className='text-center' >Profile</h1>
      <h2>Username: {userInfo.username}</h2>
      <h2>Email: {userInfo.email}</h2>
      <hr />
  
      <button onClick={logOut} className='bg-red-400 rounded-xl p-3 text-white' >Log out</button>
        
    </div>
  )
}

export default Profile