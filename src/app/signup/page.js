'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const signUp = () => {
  const router = useRouter();
  const [btn, setBtn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup",user);
      if(res.status === 200){
        router.push("/verifyemail")
      }

    } catch (error) {
      console.log(error.message)
    }
    finally {
      setLoading(false)
    }

  }
  useEffect(() => {
    if (user.email.length > 1 && user.userName.length > 1 && user.password.length > 1) {
      setBtn(true)
    }
    else {
      setBtn(false)
    }
  }, [user])



  return (
    loading ?
      <div className='text-center text-6xl min-h-[100vh] flex justify-center items-center'>
        Loading...
      </div>
      :
      <div className='min-h-screen flex justify-center items-center'>
        <div className='bg-white text-black w-[300px] p-5 h-[400px] rounded-md'>
          <h1 className='text-center text-2xl' >Sign Up</h1>
          <div className='flex flex-col items-center gap-6 mt-5 p-4'>
            <input type="text" value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} className='p-2 border border-slate-200 rounded-md' placeholder='Enter your username' />
            <input type="email" required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='p-2 border border-slate-200 rounded-md' placeholder='Enter your email' />
            <input type="password" required value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='p-2 border border-slate-200 rounded-md' placeholder='Enter your password' />
            {
              btn ?
                <button className='text-xl w-20 transition-all ease-in-out duration-200 hover:w-full bg-[#ff004f] rounded-md p-2 text-white' onClick={handleSignUp}>Submit</button>
                :
                <button className='text-xl w-20 transition-all ease-in-out duration-200 bg-slate-600 rounded-md p-2 text-white'>Submit</button>
            }
          </div>
          <h4 className='text-center text-sm text-slate-500'>Already have an account ? <span className='text-[#ff004f] cursor-pointer underline '><Link href="/login">Login</Link></span></h4>
        </div>

      </div>
  )
}

export default signUp