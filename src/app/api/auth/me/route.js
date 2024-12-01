
import { User } from '../../../../models/userModel';
import { connect } from '../../../../dbConfig/dbConfig';
import { NextResponse } from "next/server";
import { getDataFromToken } from '@/src/helpers/getDataFromToken';
connect()
export async function GET(req) {

    try {
        const user = await getDataFromToken(req)
        const userInfo = await User.findById(user.id).select("-password");
        return NextResponse.json(userInfo)


    } catch (error) {
        if (error.message === "jwt expired") {
            const res = NextResponse.json({ error: "Token Expired" }, { status: 400 });
            res.cookies.set("token","",{expires: Date.now()})
            return res
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}