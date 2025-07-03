import { connectMONGO } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMONGO();

 const GetCurrentUserFromMongoDB = async () => {
    try {
        const clerkUser = await currentUser()
        let clerkEmail = "";
        if(clerkUser?.emailAddresses){
            clerkEmail = clerkUser?.emailAddresses[0]?.emailAddress || ""
        }
      
        //check if the user is already in the database based on clerkuserId:
        const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id })
        if (mongoUser) {
            return JSON.parse(JSON.stringify(mongoUser))
        }
        //check if the user is not in the database, create a new user in the database
        const newUserPayload = {
            clerkUserId: clerkUser?.id,
            name: clerkUser?.firstName + " " + clerkUser?.lastName,
            userName: clerkUser?.username,
            email: clerkEmail,
            profilePicture: clerkUser?.imageUrl,
        }
        const newUser = await UserModel.create(newUserPayload);
        return JSON.parse(JSON.stringify(newUser))

    } catch (error: any) {
        return {
            error: error?.message
        }
    }
}

export default GetCurrentUserFromMongoDB;