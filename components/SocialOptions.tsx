import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import { IPostDocument } from "@/models/post.model";
import { useUser } from "@clerk/nextjs";

const SocialOptions = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [commentOpen, setCommentOpen] = useState(false);

  const likeOrDislikeHandler = async () => {
    if(!user) throw new Error("User not authenticated");
    const tempLiked=liked;
    const tempLikes = likes;
    
    const dislike = likes?.filter((userId)=>userId !== user.id);
    const like = [...(likes ?? []),user.id];
    const newLike = liked ? dislike :like
    
    setLiked(!liked);
    setLikes(newLike);

    const res = await fetch(`/api/posts/${post._id}/${liked ? '/dislike' : '/like'}`,{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(user.id)
    });
    if(!res.ok){
      setLiked(tempLiked);
      throw new Error('failed to like or dislike');

    }

    const fetchAllLikes = await fetch(`/api/posts/${post.id}/like`);
    if(!fetchAllLikes.ok){
      setLikes(tempLikes);
      throw new Error("Failed to fetch likes");
    }

    const likeData = await fetchAllLikes.json();
    setLikes(likeData);
  };

  return (
    <div>
            <div className="text-sm m-2 p-2 flex items-center justify-between border-b border-gray-300">
        {
          likes && likes.length > 0 && (<p className="text-xs text-gray-500 hover:to-blue-500 hover:underline hover:cursor-pointer">{likes.length} likes</p>)
        }
      </div>
    
      <div className="flex justify-between px-4 py-4 border-t border-gray-200">
      {/* Like Option */}
      <Button
        onClick={likeOrDislikeHandler}
        variant="ghost"
        className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
      >
        <ThumbsUp size={20} 
        className={`${liked && 'fill-[#378EF9]'}`}
        />
        <span className="text-sm">Like</span>
      </Button>

      {/* Message Option */}
      <Button
        variant="ghost"
        className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
      >
        <MessageCircleMore size={20} />
        <span className="text-sm">Message</span>
      </Button>

      {/* Repost Option */}
      <Button
        variant="ghost"
        className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
      >
        <Repeat size={20} />
        <span className="text-sm">Repost</span>
      </Button>

      {/* Send Option */}
      <Button
        variant="ghost"
        className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
      >
        <Send size={20} />
        <span className="text-sm">Send</span>
      </Button>
    </div>
    </div>

  );
};

export default SocialOptions;
