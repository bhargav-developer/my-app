'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const page = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleLogin = async () => {
   try {
    const res = await axios.post("api/auth/login",user);
    if(res.status === 200){
      router.push("/profile")
    }
    
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-white text-black w-[300px] p-5 h-[300px] rounded-md'>
        <h1 className='text-center text-2xl' >Login</h1>
        <div className='flex flex-col items-center gap-6  p-4'>
          <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='p-2 border border-slate-300 rounded-md' placeholder='Enter your email' />
          <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='p-2 border border-slate-300 rounded-md' placeholder='Enter your username' />
          <button className='text-xl w-full transition-all ease-in-out duration-200 hover:w-20 bg-[#ff004f] rounded-md p-2 text-white' onClick={handleLogin}>Submit</button>
        </div>
        <h4 className='text-center text-sm text-slate-500' >Don't have an account ? <span className='text-[#ff004f] cursor-pointer underline '><Link href="/signup">signUp</Link></span></h4>
      </div>

    </div>
  )
}

export default page