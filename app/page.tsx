

import { connectMONGO } from "@/config/db-config";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "antd";
import Image from "next/image";

connectMONGO()

export default async function  Home() {

  // const {isLoaded,isSignedIn,user} = useUser() //if i use it then i have to set use client
  // const users = await currentUser() //this is server component

  const users = await GetCurrentUserFromMongoDB()

  // if (!isLoaded) return <div>Loading...</div>;
  // if (!isSignedIn) return <div>Please sign in</div>;
console.log(users)

  return (
    <div className="p-5">
      <div className="flex justify-end px-10 py-3">
        <UserButton afterSwitchSessionUrl="/sign-in" />
      </div>
      <Button color="primary" variant="solid" className="py-3!">
        click here
      </Button>
      <Button color="primary" variant="outlined" className="py-3! ml-2">
        click
      </Button>
      <div className="flex flex-col gap-2 mt-3">
        <span>Name: {users?.firstName} {users?.lastName}</span>
        <span>userName: {users?.id}</span>
        <span>userName: {users?.username}</span>
      </div>
    </div>
  );
}
