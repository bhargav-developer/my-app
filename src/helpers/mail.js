import { hash } from "bcryptjs";
import nodemailer from "nodemailer"
import { User } from '../models/userModel.js';
import mongoose from "mongoose";



export const sendEmail = async ({ email, emailType, userId }) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId');
        }
        const verificationCode = function num(){
            return Math.floor(Math.random() * 9)
        }

        const hasedToken = await hash(`${userId}`, 10)
        if (emailType === "VERIFY-USER") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hasedToken,
                verifyTokenExp: Date.now() + 360000
            }, { new: true, runValidators: true })
        }
        else if (emailType === "FORGOT-PASSWORD") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hasedToken,
                forgotPasswordTokenExp: Date.now() + 360000
            }, { new: true, runValidators: true })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d0b1bc76834b51",
                pass: "7f29498a0ee0e7"
            }
        });
        const mailOptions = {
            from: "Bhargav@dev.in",
            to: `${email}`,
            subject: "Verify Your Email",
            html: `<p>Click here to <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">Verify</a></p>
            <h1>${verificationCode()}</h1>
            `
        }

        const mailRes = await transporter.sendMail(mailOptions);

        return mailRes





    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }

}