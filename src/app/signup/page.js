'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const signUp = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const handleSignUp = async () => {
    if(!user.userName || !user.email || !user.password){
      alert("Fill the form")
    }
    else{
      console.log("o")
    }
  }


  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-white text-black w-[300px] p-5 h-[400px] rounded-md'>
        <h1 className='text-center text-2xl' >Sign Up</h1>
        <div className='flex flex-col items-center gap-6 mt-5 p-4'>
          <input type="text" value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} className='p-2 border border-slate-200 rounded-md' placeholder='Enter your username' />
          <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}  className='p-2 border border-slate-200 rounded-md' placeholder='Enter your email' />
          <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}  className='p-2 border border-slate-200 rounded-md' placeholder='Enter your password' />
          <button className='text-xl w-20 transition-all ease-in-out duration-200 hover:w-full bg-[#ff004f] rounded-md p-2 text-white' onClick={handleSignUp}>Submit</button>
        </div>
        <h4 className='text-center text-sm text-slate-500'>Already have an account ? <span className='text-[#ff004f] cursor-pointer underline '><Link href="/login">Login</Link></span></h4>
      </div>

    </div>
  )
}

export default signUp