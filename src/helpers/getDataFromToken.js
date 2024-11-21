import { verify } from "jsonwebtoken";

export const getDataFromToken = (req) =>{
    try {
        const token = req.cookies.get("token")?.value || "";
        const verifyUser = verify(token,process.env.SECRET_KEY);
        return verifyUser
    } catch (error) {
        throw new Error(error.message)
    }
}