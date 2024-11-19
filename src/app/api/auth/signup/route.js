import { connect } from "@/src/dbConfig/dbConfig.js";
import User from "@/src/models/userModel.js";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { userName, email, password } = reqBody;

        // Check if the user already exists by email
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists" },{status:400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);  // Correct hash usage

        // Create a new user and save it to the database
        const newUser = await User.create({
            username: userName,
            email,
            password: hashedPassword
        });

        return NextResponse.json({ message: "User created successfully", status: 200, newUser });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
