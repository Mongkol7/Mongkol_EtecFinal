import React, { useState } from 'react';

const ReadLessMore = ({ text, title, maxlength }) => {
  const [readMore, setReadMore] = useState(false);

  if (text.length <= maxlength) {
    return <p>{text}</p>;
  }

  return (
    <div className="relative">
      <p>
        {text.slice(0, maxlength) + '...'}
        <button
          onClick={() => setReadMore(!readMore)}
          className="read-more-less-btn text-gray-500 font-semibold cursor-pointer ml-2 mb-8"
        >
          Read More
        </button>
      </p>

      {/* Expanded overlay */}
      {readMore && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setReadMore(false)}
          />

          {/* Expanded content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 max-w-[90vw]">
            <div className="bg-white border-2 border-green-500 rounded-lg p-4 shadow-lg max-h-96 overflow-y-auto">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800">
                  <span className='des'>Description:</span>
                  <span className="font-bold text-gray-800">{title}</span>
                </h3>
                <button
                  onClick={() => setReadMore(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {text}
              </p>
              <button
                onClick={() => setReadMore(false)}
                className="text-green-500 font-semibold cursor-pointer mt-3"
              >
                Read Less
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadLessMore;
