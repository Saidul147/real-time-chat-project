import mongoose from "mongoose"


const MONGODB_URI = process.env.MONGODB_URI!;

export const connectMONGO = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Mongo connected")
    } catch (error) {
        console.log(error)
    }
}