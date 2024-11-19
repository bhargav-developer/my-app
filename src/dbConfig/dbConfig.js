import mongoose from "mongoose"

export async function connect(){
    try {
        mongoose.connect(process.env.DB_URL)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB is connected")
        })
        connection.on("error",(err)=>{
            console.log("MongoDB is not connected : ",err)
        })
        
    } catch (error) {
        console.log(error.message)
    }
}