"use client";
import React from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

const Post = () => {
  return (
    <div className="bg-white my-2 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        {/* <ProfilePhoto src={user?.user?.imageUrl!}/> */}
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">Full name <Badge variant={'secondary'} className="ml-2">You</Badge></h1>
            <p className="text-xs text-gray-500">@username</p>
            <p className="text-xs text-gray-500">1 hr ago</p>
          </div>
        </div>
        <div>
          <Button size={"icon"} className="rounded-full" variant={"outline"}>
            <Trash2 />
          </Button>
        </div>
      </div>
      {/* <PostContent/> */}
    </div>
  );
};

export default Post;
