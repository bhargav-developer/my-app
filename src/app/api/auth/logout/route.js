import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    try {
        const res = NextResponse.json({
            message: "Logout Successful",
            success: true
        });
        res.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        })
        return res
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
