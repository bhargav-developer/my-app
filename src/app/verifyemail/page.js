"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {

    const [token, setToken] = useState("")
    const [inputs, setInputs] = useState(["", "", "", ""]);
    const router = useRouter();

    const verifyEmail = async () => {
        try {
            const res = await axios.post("api/auth/verifyEmail", { token })
            console.log(res)
            if (res.status === 200) {
                router.push("/profile")
            }

        } catch (error) {
            if (error.status === 404) {
                alert("Invalid request")
            }
        }
    }

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^\d$/.test(value) || value === "") {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);
    
            if (value && index < inputs.length - 1) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }

    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        if (urlToken) {
            setToken(urlToken)
        }
    }, [])


    useEffect(() => {
        if (token.length > 1) {
            verifyEmail()
        }
    }, [token])



    return (
        <div className="h-[100vh] flex justify-center items-center">
            <div className=" bg-slate-600 rounded-md p-5">
                <h1 className="text-center mt-3 text-2xl">Verify Your Email Is verified</h1>
            </div>
        </div>
    );
};

export default VerifyEmail;
