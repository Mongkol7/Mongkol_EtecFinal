import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Plus, Minus, ShoppingBag, Star, ChevronRight } from 'lucide-react';
import Navbar from './Ui/Navbar';
import Footer from './Ui/Footer';
import HorizontalCarousel from './Ui/HorizontalCarousel';
import products from '../data/productData';
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [visibleSections, setVisibleSections] = useState({});

  // Refs for each section
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            setVisibleSections((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [product]);

  // Get related products (same category)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 6)
    : [];

  useEffect(() => {
    // Find product from static data
    const foundProduct = products.find((p) => p.id === parseInt(id));

    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = (item, qty) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = existingCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += qty;
      } else {
        const cartItem = {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: qty,
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

  const handleAddToCart = () => {
    const success = addToCart(product, quantity);

    if (success) {
      Swal.fire({
        title: 'Added to Bag',
        html: `<div class="text-center">
          <p class="text-gray-300 mb-2">${quantity} x "${product.title}"</p>
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
          popup: 'rounded-2xl',
          title: 'text-xl font-semibold',
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

  const handleBuyNow = () => {
    const success = addToCart(product, quantity);
    if (success) {
      Swal.fire({
        title: 'Added to Bag',
        html: `<div class="text-center">
          <p class="text-gray-300 mb-2">${quantity} x "${product.title}"</p>
          <p class="text-sm text-gray-400">Free delivery and returns</p>
        </div>`,
        icon: 'success',
        confirmButtonColor: '#a855f7',
        showCancelButton: true,
        cancelButtonText: 'Continue Shopping',
        cancelButtonColor: '#6b7280',
        timer: 3000,
        timerProgressBar: true,
        background: '#1f2937',
        color: '#fff',
        backdrop: 'rgba(0,0,0,0.8)',
        customClass: {
          popup: 'rounded-2xl',
          title: 'text-xl font-semibold',
          confirmButton: 'rounded-full px-6 py-2 font-medium',
          cancelButton: 'rounded-full px-6 py-2 font-medium',
        },
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-thin text-white mb-4">
              Product Not Found
            </h1>
            <Link
              to="/ProductContainer"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              Return to Store
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className={`pt-24 pb-16 px-6 relative transition-all duration-1000 ${
            visibleSections[0]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>

          <div className="max-w-screen-xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                to="/ProductContainer"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <ChevronRight size={16} className="rotate-180" />
                Back to Store
              </Link>
            </div>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={
                        i < Math.floor(product.rating.rate)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <p className="text-4xl font-semibold text-white mb-[-5vh] mt-[-2vh]">
              ${product.price}
            </p>
          </div>
        </section>

        {/* Product Image and Purchase Section */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`py-16 px-6 mt-[-5vh] transition-all duration-1000 delay-200 ${
            visibleSections[1]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Product Image */}
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto rounded-[30px] object-contain max-h-[600px] hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Purchase Options */}
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-3xl font-semibold text-white mb-4">
                    About this product
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decreaseQuantity}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center border border-white/20"
                    >
                      <Minus size={20} className="text-white" />
                    </button>
                    <span className="text-2xl font-semibold text-white min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center border border-white/20"
                    >
                      <Plus size={20} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Purchase Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-white text-black py-4 px-8 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="w-full border-2 border-white/30 text-white py-4 px-8 rounded-full text-lg font-medium hover:border-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Add to Bag
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Delivery & Returns
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Free delivery on orders over $100</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Free and easy returns</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Ships within 1-2 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className={`py-24 px-6 bg-gradient-to-b from-black to-gray-900/50 transition-all duration-1000 delay-300 ${
            visibleSections[2]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-16 text-center">
              What makes it special
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                  <Star size={32} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Premium Quality
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Crafted with the finest materials and attention to detail.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag size={32} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Fast Shipping
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get your order delivered quickly and securely.
                </p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <ChevronRight size={32} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Easy Returns
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Not satisfied? Return it hassle-free within 30 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            className={`py-16 bg-black transition-all duration-1000 delay-400 ${
              visibleSections[3]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <HorizontalCarousel
              products={relatedProducts}
              title="You might also like"
            />
          </section>
        )}

        {/* CTA Section */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className={`py-24 px-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 transition-all duration-1000 delay-500 ${
            visibleSections[4]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">
              Ready to buy?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Get {product.title} with free delivery and returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleBuyNow}
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Buy Now - ${product.price}
              </button>
              <button
                onClick={handleAddToCart}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white transition-all duration-300 transform hover:scale-105"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
