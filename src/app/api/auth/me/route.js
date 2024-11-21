import { getDataFromToken } from "../../../../helpers/getDatafromToken";
import { User } from '../../../../models/userModel';
import { connect } from '../../../../dbConfig/dbConfig';
import { NextResponse } from "next/server";
connect()
export async function GET(req){

    try {
       const user = await getDataFromToken(req)
       const userInfo = await User.findById(user.id).select("-password");
       return NextResponse.json(userInfo)


    } catch (error) {
     return NextResponse.json({error: error.message},{status: 500})   
    }

}