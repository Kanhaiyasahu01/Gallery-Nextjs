"use client";
import React from "react";
import { ThumbsUp, MessageCircle, Share2, Repeat } from "lucide-react";

const SocialOptions = () => {
  return (
    <div className="flex justify-between px-4 py-4 border-t border-gray-200">
      {/* Like Option */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
        <ThumbsUp size={20} />
        <span className="text-sm">Like</span>
      </div>

      {/* Comment Option */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
        <MessageCircle size={20} />
        <span className="text-sm">Comment</span>
      </div>

      {/* Share Option */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
        <Share2 size={20} />
        <span className="text-sm">Share</span>
      </div>

      {/* Repost Option */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
        <Repeat size={20} />
        <span className="text-sm">Repost</span>
      </div>
    </div>
  );
};

export default SocialOptions;
