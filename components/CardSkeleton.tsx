// components/CardSkeleton.tsx
import React from "react";

export default function CardSkeleton() {
  return (
    <div className="max-w-lvw w-11/12 bg-white dark:bg-gray-700 rounded-2xl shadow-xl my-2 p-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="ml-4 flex-grow">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="h-5 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-5 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-5 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-5 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}
