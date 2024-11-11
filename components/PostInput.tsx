'use client'
import React, { useState } from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Input } from "./ui/input";
import PostDialogue from "./PostDialogue";

const PostInput = ({ user }: { user: any }) => {

    const [open, setOpen] = useState<boolean>(false);
    const inputHandler = ()=>{
        setOpen(true);
    }

  return (
    <div className="bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg ">
      <div className="flex items-center gap-3">
        <ProfilePhoto src={user?.imageUrl} />
        <Input
          type="text"
          placeholder="Create a new post"
          className="rounded-full hover:bg-gray-100 h-12 cursor-pointer border border-gray-100"
          onClick={inputHandler}
        />
        <PostDialogue 
        setOpen = {setOpen} 
        open = {open}
        src = {user?.imageUrl}
        />
      </div>
    </div>
  );
};

export default PostInput;
