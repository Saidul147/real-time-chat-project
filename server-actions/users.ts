import { connectMONGO } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMONGO();

export const GetCurrentUserFromMongoDB = async () => {
    try {
        const clerkUser = await currentUser()
        //check if the use is already in the database based on clerkuserId:
        const mongoUser = await UserModel.findOne({clerkUserId: clerkUser?.id})
        if(mongoUser){
            return JSON.parse(JSON.stringify(mongoUser))
        }
        //check if the user is not in the database, create a new user in the database
        const newUserPayload = {
            cerkuserId: clerkUser?. id,
            name: clerkUser?.firstName + " " + clerkUser?.lastName,
            userName: clerkUser?.userName,
        }
        const newUser = await UserModel.create(newUserPayload);
        return JSON.parse(JSON.stringify(newUser))

    } catch (error:any) {
        return {
            error: error?.message
        }
    }
}