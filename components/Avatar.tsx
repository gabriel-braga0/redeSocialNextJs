"use client";

import React from "react";
import avatar from "../public/avatar.jpeg";
import { useAuth } from "../context/AuthContext";

export default function Avatar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <div className="flex -space-x-2 pt-7 overflow-hidden">
        <img
          className="inline-block m-4 h-16 w-16 rounded-full ring-2 ring-white object-cover object-center"
          src={avatar.src}
          alt="avatar"
        />
      </div>
      <h2 className="font-semibold font-primary">{user?.nome}</h2>
      <h2>@{user?.email}</h2>
    </div>
  );
}
