"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaUsers,
  FaCog,
  FaComments,
  FaImages,
} from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

const menuItems = [
  { name: "News Feed", icon: <MdExplore size={20} />, active: true },
  { name: "Messages", icon: <FaEnvelope size={20} />, count: 6 },
  { name: "Forums", icon: <FaComments size={20} /> },
  { name: "Friends", icon: <FaUsers size={20} />, count: 3 },
  { name: "Media", icon: <FaImages size={20} /> },
  { name: "Settings", icon: <FaCog size={20} /> },
];

export default function Menu() {
  const [active, setActive] = useState("News Feed");

  const handleChange = (name: string) => {
    setActive(name);
  };

  return (
    <div className="flex w-full items-center mt-10 flex-col gap-3">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            handleChange(item.name);
          }}
          className={`cursor-pointer transition-all ${
            item.name === active
              ? "bg-black text-white"
              : "bg-white dark:bg-gray-800 text-pastel-light-subtext dark:text-gray-200"
          } px-6 py-2 rounded-2xl
       border-black border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex items-center gap-2 font-semibold md:w-full lg:w-60`}
        >
          {item.icon}
          <span className="hidden md:inline font-primary font-bold text-lg">
            {item.name}
          </span>
        </button>
      ))}
      {/* <ThemeToggle /> */}
    </div>
  );
}
