import { connect } from '../../../../dbConfig/dbConfig';
import { User } from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import {sendEmail} from "../../../../helpers/mail.js"

connect()
export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { userName, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists" },{status:400});
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); 

        const newUser = await User.create({
            username: userName,
            email,
            password: hashedPassword
        });

        await sendEmail({email,emailType: "VERIFY-USER",userId: newUser._id});
    

        return NextResponse.json({ message: "User created successfully", status: 200, newUser });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
