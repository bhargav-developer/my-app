import { NextResponse } from 'next/server';
import { connect } from '../../../../dbConfig/dbConfig';
import { User } from '../../../../models/userModel';
connect()

export async function POST(req) {
    try {

        const reqBody = await req.json()
        const { token } = reqBody
        console.log(token);
        const user = await User.findOne({ verifyToken: token, verifyTokenExp: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ message: "Invaild Token" }, { status: 404 });
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExp = undefined
        await user.save()

        return NextResponse.json({
            message: "Email Verified",
            success: true
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}
