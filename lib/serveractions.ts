'use server'
import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"
import { v2 as cloudinary } from 'cloudinary';
import connectDB from "./db";
import { revalidatePath } from "next/cache";

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

// creating post using server action
export const  createPostAction = async(inputText:string,selectedFile:string)=>{
    await connectDB();
    const user = await currentUser();
    if(!user){
        throw new Error("User not authenticated");
    }
    if(!inputText){
        throw new Error("Input text is required");
    }

    const userDatabase:IUser ={
        firstName:user.firstName || "N/A",
        lastName:user.lastName || "N/A",
        userId:user.id,
        profilePhoto:user.imageUrl || "",

    }
    const image = selectedFile;
    let uploadResponse;
    try{
        // create post with image 
        if(image){
            uploadResponse = await cloudinary.uploader.upload(image);
            await Post.create({
                description:inputText,
                user:userDatabase,
                // image url from cloudinary
                imageUrl:uploadResponse?.secure_url
            })
        }else{
            await Post.create({
                description:inputText,
                user:userDatabase
            })
        }
        revalidatePath("/"); 
        // or create post with text only
    }catch(err:any){
        throw new Error(err)
    }
}

// get all posts
export const getAllPosts = async()=>{
    await connectDB();
    try{
        const posts = await Post.find().sort({createdAt:-1})
        return JSON.parse(JSON.stringify(posts));


    }catch(err){
        console.log(err);
    }
}


// delete
export const deletePostAction = async(postId:string)=>{
    await connectDB();
    const user = await currentUser();
    if(!user) 
        throw new Error('user is not authenticated');
    const post = await Post.findById(postId);
    if(!post){
        throw new Error("post not found");
    }
    // delete post that is of user only not others
    if(post.user.userId !== user.id){
        throw new Error('You are not an owner');
    }
    try{
        await Post.deleteOne({_id:postId});
        revalidatePath('/');
    }catch(err){
        throw new Error("An error occured");
    }
}   