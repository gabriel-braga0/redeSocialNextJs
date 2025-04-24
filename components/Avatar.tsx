import React from "react";
import avatar from "../public/avatar.jpeg";

export default function Avatar() {
  return (
    <div className="bg-blue-200 flex flex-col items-center">
      <div className="flex -space-x-2 overflow-hidden">
        <img
          className="inline-block m-4 h-16 w-16 rounded-full ring-2 ring-white"
          src={avatar.src}
          alt="avatar"
        />
      </div>
      <h2>Name</h2>
      <h2>@tag</h2>
    </div>
  );
}
