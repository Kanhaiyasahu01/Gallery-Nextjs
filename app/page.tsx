import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import News from "@/components/News";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const user = await currentUser();
  // console.log(user)

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* sidebar */}
        <Sidebar  user = {user}/>
        <Feed user = {user} />
        <News />

        {/* Feed */}
        {/* news */}


      </div>
    </div>
  );
}
