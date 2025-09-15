import React from 'react'

const skeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-[300px] h-[500px] justify-center items-center 
     p-5 rounded-[20px] shadow-lg overflow-hidden animate-pulse">
      <div className="skeleton bg-gray-400 h-32 w-full"></div>
      <div className="skeleton bg-gray-400 h-4 w-28"></div>
      <div className="skeleton bg-gray-400 h-4 w-full"></div>
      <div className="skeleton bg-gray-400 h-4 w-full"></div>
      <div className="skeleton bg-gray-400 h-4 w-full"></div>
      <div className="skeleton bg-gray-400 h-4 w-full"></div>
    </div>
  );
}

export default skeleton
