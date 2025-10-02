import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HorizontalCarousel = ({ products, title }) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="relative py-12">
      {title && (
        <h2 className="text-3xl md:text-4xl font-thin text-white mb-8 px-6 max-w-screen-xl mx-auto">
          {title}
        </h2>
      )}

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-3 rounded-full hover:bg-white/20 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-4 scrollbar-hide lg:ml-[25vh]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-80 group/card mt-5"
            >
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col hover:transform hover:scale-105">
                {/* Category Badge */}
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">
                  {product.category}
                </span>

                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="mb-4">
                  <div className="relative h-48 flex items-center justify-center bg-white/5 rounded-2xl p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full w-auto object-contain group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover/card:text-purple-300 transition-colors duration-300">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-xl font-semibold text-white mt-auto">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-3 rounded-full hover:bg-white/20 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HorizontalCarousel;
