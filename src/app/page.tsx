import React from "react";
import Card from "../../components/Card";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import ThemeToggle from "../../components/ThemeToggle";
import Feed from "../../components/Feed";
import PostFeed from "../../components/PostFeed";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto h-screen">
        <div className="grid grid-cols-4 grid-rows-9 gap-4 h-full">
          <div className=" col-span-1 row-span-2 bg-amber-500">
            <Avatar />
          </div>
          <div className="col-span-2 row-span-1 bg-amber-300 h-full flex">
            <div className="px-16 flex w-full justify-between items-end font-bold">
              <h2 className="text-2xl">Feeds</h2>
              <h2 className="text-lg">Recents</h2>
            </div>
          </div>
          <div className="bg-blue-800 col-span-1 row-span-2 flex">
            <ThemeToggle />
          </div>
          <div className="col-span-1 row-start-3 row-span-5 flex justify-center bg-amber-300">
            <Menu />
          </div>
          <div
            className="scrollbar-none lg:mx-1 
          row-span-7 col-span-2 flex flex-col items-center gap-5 overflow-y-auto"
          >
            {/* <Feed /> */}
            <PostFeed />
          </div>

          <div className="bg-blue-800 row-span-5">Barra lateral direita</div>
          <div className="bg-blue-800 row-span-2 ">não sei 1</div>
          <div className="bg-blue-800 row-span-1 col-span-2">post</div>
          <div className="bg-blue-800 row-span-2 row-start-8">não sei 2</div>
        </div>
      </div>
    </div>
  );
}
