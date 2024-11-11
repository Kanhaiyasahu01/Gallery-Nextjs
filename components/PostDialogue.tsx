
import React, { ReactNode, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Images } from "lucide-react";
import Image from "next/image";
import { readFileAsDataUrl } from "@/lib/utils";
import { createPostAction } from "@/lib/serveractions";

const PostDialogue = ({
  setOpen,
  open,
  src,
}: {
  setOpen: any;
  open: any;
  src: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<string>("");
  
  const [inputText, setInputText] = useState<string>("");

  const changeHandler = (e:any) => {
    setInputText(e.target.value);
  }


  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const postActionHandler = async(formData:FormData) =>{
    const inputText = formData.get('inputText') as string;
    console.log(inputText);
    try{
      await createPostAction(inputText,selectedFile);

    }catch(err){
      console.log(err);
      console.log("err in getting text");
    }
    setInputText("");
    setOpen(false);

  }

  return (
    <Dialog open={open}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        className="bg-white"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <ProfilePhoto src={src} />
            <div>
              {/* TODO: change with orignal username */}
              <h1>Kanhaiya Sahu </h1>
              <p className="text-xs">Post to anyone</p>
            </div>
          </DialogTitle>
          <form action={postActionHandler}>
            <div className="flex flex-col">
              <Textarea
                id="name"
                name="inputText"
                onChange={changeHandler}
                value = {inputText}
                className="border border-gray-100 rounded-lg text-lg focus-visible:ring-0"
                placeholder="Type your message here"
              />
            </div>
            <div className="my-4 ">
                {
                    selectedFile && (
                        <Image 
                            src={selectedFile}
                            alt="preview image"
                            width={400}
                            height={400}

                        />
                    )
                }
            </div>
            <DialogFooter>
              <div className="flex items-center gap-4">
                <input
                  ref={inputRef}
                  onChange={fileChangeHandler}
                  type="file"
                  name="image"
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
          <Button className="gap-2" onClick={() => inputRef?.current?.click()} variant={"ghost"}>
            <Images className="text-blue-500" />
            <p>Media</p>
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialogue;
