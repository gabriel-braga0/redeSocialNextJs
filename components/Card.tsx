import React from "react";

const Card = () => {
  return (
    <div className="max-w-md w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg ">
      <div className="flex items-center p-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-semibold">
          PG
        </div>
        <div className="ml-4">
          <h2 className="font-semibold text-lg">Priyanshu Gupta</h2>
          <p className="text-white/70 text-sm">@28priyanshu2001</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p>
          Just created this amazing Twitter/X card design using Tailwind CSS
          with gradients! 🚀 #WebDevelopment #TailwindCSS
        </p>
      </div>
      <div className="flex justify-between items-center p-4 text-white/70">
        <button className="flex items-center space-x-2 hover:text-blue-200">
          <svg
            viewBox="0 0 16 16"
            className="bi bi-graph-up-arrow"
            fill="currentColor"
            height={16}
            width={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
              fillRule="evenodd"
            />
          </svg>
          <span>5</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-200">
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10l7-7m0 0l7 7M12 3v18"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span>3</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-200">
          <svg
            viewBox="0 0 16 16"
            className="bi bi-chat-left"
            fill="currentColor"
            height={16}
            width={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>
          <span>3</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-pink-200">
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 00-7.78-.61l-.7.7-.7-.7a5.5 5.5 0 00-7.78.61c-2.19 2.36-2.12 6.14.18 8.55L12 21.35l8.22-8.19c2.3-2.41 2.37-6.19.18-8.55z"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span>12</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <svg
            viewBox="0 0 16 16"
            className="bi bi-share"
            fill="currentColor"
            height={16}
            width={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
