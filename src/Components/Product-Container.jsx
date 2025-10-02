//product container
import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ChevronRight } from 'lucide-react';
import Navbar from './Ui/Navbar';
import Footer from './Ui/Footer';
import ProductCarousel from './Ui/ProductCarousel';
import HorizontalCarousel from './Ui/HorizontalCarousel';
import Products from '../data/productData.jsx';
function ProductContainer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState({});
  const [visibleSections, setVisibleSections] = useState({});

  const productRefs = useRef([]);
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const accessoriesRef = useRef(null);
  const helpRef = useRef(null);

  // Get featured products (first 5)
  const featuredProducts = Products.slice(0, 5);

  // Get new arrivals (products with iPhone, iPad, Mac categories)
  const newArrivals = Products.filter((p) =>
    ['iPhone', 'iPad', 'Mac'].includes(p.category)
  );

  // Get accessories
  const accessories = Products.filter((p) =>
    ['AirPods', 'Accessories', 'Watch'].includes(p.category)
  );

  // Intersection Observer for sections
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.dataset.section;
            setVisibleSections((prev) => ({ ...prev, [sectionName]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = [
      { ref: heroRef, name: 'hero' },
      { ref: featuredRef, name: 'featured' },
      { ref: newArrivalsRef, name: 'newArrivals' },
      { ref: accessoriesRef, name: 'accessories' },
      { ref: helpRef, name: 'help' },
    ];

    sections.forEach(({ ref }) => {
      if (ref.current) sectionObserver.observe(ref.current);
    });

    return () => sectionObserver.disconnect();
  }, []);

  // Intersection Observer for product cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = productRefs.current.indexOf(entry.target);
            setVisibleCards((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setData(Products);
      setLoading(false);
      console.log('Products loaded successfully✅');
    }, 500);
  }, []);

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
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section
          ref={heroRef}
          data-section="hero"
          className={`pt-32 pb-16 px-6 bg-gradient-to-b from-purple-900/20 to-black relative transition-all duration-1000 ${
            visibleSections.hero
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
          <div className="max-w-screen-xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-thin bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 tracking-tight">
              Store
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
              The best way to buy the products you love.
            </p>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section
          ref={featuredRef}
          data-section="featured"
          className={`py-16 px-6 bg-black transition-all duration-1000 ${
            visibleSections.featured
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-screen-xl mx-auto">
            <ProductCarousel
              products={featuredProducts}
              title="Featured Products"
              autoPlayDelay={2500}
              isVisible={visibleSections.featured}
            />
          </div>
        </section>

        {/* New Arrivals Horizontal Carousel */}
        <section
          ref={newArrivalsRef}
          data-section="newArrivals"
          className={`py-16 bg-gradient-to-b from-black to-gray-900/50 transition-all duration-1000 ${
            visibleSections.newArrivals
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <HorizontalCarousel
            products={newArrivals}
            title="New Arrivals"
            isVisible={visibleSections.newArrivals}
          />
        </section>

        {/* Accessories Horizontal Carousel */}
        <section
          ref={accessoriesRef}
          data-section="accessories"
          className={`py-16 bg-gray-900/50 transition-all duration-1000 ${
            visibleSections.accessories
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <HorizontalCarousel
            products={accessories}
            title="Accessories"
            isVisible={visibleSections.accessories}
          />
        </section>

        {/* All Products Grid */}
        <section className="py-16 px-6 bg-black">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">
              All Products
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-900/50 rounded-3xl h-[500px] animate-pulse backdrop-blur-xl border border-white/10"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {data.map((item, index) => (
                  <div
                    key={item.id}
                    ref={(el) => (productRefs.current[index] = el)}
                    className={`group transition-all duration-700 ${
                      visibleCards[index]
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col hover:transform hover:scale-105">
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <Link
                        to={`/product/${item.id}`}
                        className="flex-shrink-0 mb-6"
                      >
                        <div className="relative h-64 flex items-center justify-center bg-white/5 rounded-2xl p-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      <div className="flex-grow flex flex-col">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex items-center mb-4">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-400">
                            {item.rating?.rate || '4.5'} (
                            {item.rating?.count || '100'})
                          </span>
                        </div>

                        <div className="mt-auto">
                          <p className="text-2xl font-semibold text-white mb-4">
                            ${item.price}
                          </p>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBuyNow(item)}
                              className="flex-1 bg-white text-black py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                            >
                              Buy Now
                            </button>
                            <Link
                              to={`/product/${item.id}`}
                              className="flex items-center justify-center px-4 border-2 border-white/30 text-white rounded-full hover:border-white transition-all duration-300"
                            >
                              <ChevronRight size={20} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section
          ref={helpRef}
          data-section="help"
          className={`py-24 px-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 transition-all duration-1000 ${
            visibleSections.help
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">
              Need shopping help?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ask a Specialist or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Contact Support
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white transition-all duration-300 transform hover:scale-105">
                Find a Store
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ProductContainer;
