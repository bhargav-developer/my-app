import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { connect } from '../../../../dbConfig/dbConfig';
import { User } from '../../../../models/userModel';
connect()

export const POST = async (req) => {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "user does not exist" }, { status: 404 })
        }
        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return NextResponse.json({ message: "Wrong password" }, { status: 400 })
        }
        const isVerified = user.isVerified
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = sign(tokenData, process.env.SECRET_KEY, { expiresIn: "2h" })
        console.log(isVerified,user)
        const res = 
            NextResponse.json({
                message: "login successfull"
            }, { status: 200 });
            res.cookies.set("token", token, {
                httpOnly: true
            })
 if(isVerified){
     return res;
 }
 else{
    return NextResponse.json({
        message: "login successfull"
    }, { status: 401 });
 }
        



    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}