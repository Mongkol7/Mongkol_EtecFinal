import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductCarousel = ({ products, title, autoPlayDelay = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, autoPlayDelay]);

  // Touch/swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  // Add to cart function
  const addToCart = (item) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = existingCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        const cartItem = {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: 1,
          dateAdded: new Date().toISOString(),
        };
        existingCart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
      return true;
    } catch (error) {
      console.error('Error saving to cart:', error);
      return false;
    }
  };

  // Handle buy now
  const handleBuyNow = (item) => {
    const success = addToCart(item);
    if (success) {
      Swal.fire({
        title: 'Added to Bag',
        html: `<div class="text-center">
          <p class="text-gray-300 mb-2">"${item.title}"</p>
          <p class="text-sm text-gray-400">Free delivery and returns</p>
        </div>`,
        icon: 'success',
        confirmButtonColor: '#a855f7',
        confirmButtonText: 'View Bag',
        showCancelButton: true,
        cancelButtonText: 'Continue Shopping',
        cancelButtonColor: '#6b7280',
        timer: 3000,
        timerProgressBar: true,
        background: '#1f2937',
        color: '#fff',
        backdrop: 'rgba(0,0,0,0.8)',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          title: 'text-2xl font-semibold text-white',
          confirmButton: 'rounded-full px-6 py-2 font-medium',
          cancelButton: 'rounded-full px-6 py-2 font-medium',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/ProductCard';
        }
      });
    }
  };

  return (
    <div className="relative w-full py-12">
      {title && (
        <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-12">
          {title}
        </h2>
      )}

      <div
        ref={carouselRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-full px-4 md:px-8">
              <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl overflow-hidden border border-white/10">
                <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                  {/* Product Image */}
                  <div className="relative h-96 flex items-center justify-center bg-black bg-opacity-25 rounded-2xl">
                    <Link
                      to={`/product/${product.id}`}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full w-auto object-contain hover:scale-110 transition-transform duration-500 rounded-2xl"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="text-center md:text-left">
                    <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-semibold text-white mt-4 mb-6">
                      {product.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-3xl font-bold text-white mb-8">
                      ${product.price}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl text-center"
                      >
                        Learn More
                      </Link>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white transition-all duration-300 transform hover:scale-105 text-center"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-3 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-3 rounded-full hover:bg-white/20 transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-3 mt-8">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
