"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {

    const [token, setToken] = useState("")
    const router = useRouter();

    const verifyEmail = async () => {
        try {
            const res = await axios.post("api/auth/verifyEmail", { token })
            console.log(res)
            if (res.status === 200) {
                router.push("/login")
            }
            
        } catch (error) {
            if(error.status === 404){
                alert("Invalid request")
            }
        }
    }


    
    useEffect(() => {
      const urlToken = window.location.search.split("=")[1]
      setToken(urlToken)
    }, [])


    useEffect(() => {
        if (token.length > 1) {
            verifyEmail()
        }
    }, [token])



    return (
        <div>
            <h1>Query Parameters</h1>
            <p>Token: {token}</p>
        </div>
    );
};

export default VerifyEmail;
