import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Navbar from './Ui/Navbar';
import Footer from './Ui/Footer';
import products from '../../data/productData';

const ProductCard = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage and enrich with full product data
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          // Enrich cart items with full product data from productData.js
          const enrichedCart = parsed.map((cartItem) => {
            const fullProduct = products.find((p) => p.id === cartItem.id);
            return fullProduct
              ? { ...fullProduct, quantity: cartItem.quantity }
              : cartItem;
          });
          setCartItems(Array.isArray(enrichedCart) ? enrichedCart : []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    };

    loadCart();
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 19.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Update quantity and save to localStorage
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  // Remove item with dark-themed SweetAlert
  const removeItem = (id) => {
    const item = cartItems.find((item) => item.id === id);

    Swal.fire({
      title: 'Remove Item?',
      text: `Remove "${item.title}" from your bag?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#fff',
      backdrop: 'rgba(0,0,0,0.8)',
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-xl font-semibold',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));

        Swal.fire({
          title: 'Removed',
          text: 'Item removed from your bag',
          icon: 'success',
          confirmButtonColor: '#a855f7',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
          backdrop: 'rgba(0,0,0,0.8)',
          customClass: {
            popup: 'rounded-2xl',
          },
        });
      }
    });
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity === 1) {
      removeItem(id);
    } else {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    if (cartItems.length === 0) return;

    Swal.fire({
      title: 'Clear Bag?',
      text: `Remove all ${cartItems.length} items?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Clear All',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#fff',
      backdrop: 'rgba(0,0,0,0.8)',
      customClass: {
        popup: 'rounded-2xl',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems([]);
        localStorage.removeItem('cart');

        Swal.fire({
          title: 'Bag Cleared',
          icon: 'success',
          confirmButtonColor: '#a855f7',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
          backdrop: 'rgba(0,0,0,0.8)',
          customClass: {
            popup: 'rounded-2xl',
          },
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-20">
        {/* Header Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-purple-900/20 to-black relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
          <div className="max-w-screen-xl mx-auto relative z-10">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/ProductContainer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft size={20} />
                <span>Continue Shopping</span>
              </Link>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Clear Bag
                </button>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-thin bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Your Bag
            </h1>
            <p className="text-xl text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </section>

        {cartItems.length === 0 ? (
          // Empty Cart
          <section className="py-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-32 h-32 bg-gray-900/50 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <ShoppingBag size={64} className="text-gray-500" />
              </div>
              <h2 className="text-4xl font-thin text-white mb-4">
                Your bag is empty
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Start adding products you love
              </p>
              <Link
                to="/ProductContainer"
                className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Start Shopping
              </Link>
            </div>
          </section>
        ) : (
          // Cart with Items
          <section className="py-16 px-6">
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <Link
                          to={`/product/${item.id}`}
                          className="w-full md:w-48 h-48 bg-white/5 rounded-2xl flex items-center justify-center p-4 hover:bg-white/10 transition-all duration-300"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                                  {item.category}
                                </span>
                                <Link to={`/product/${item.id}`}>
                                  <h3 className="text-xl font-semibold text-white mt-2 hover:text-purple-300 transition-colors duration-300">
                                    {item.title}
                                  </h3>
                                </Link>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 hover:bg-red-500/20 rounded-full transition-all duration-300 group"
                              >
                                <Trash2
                                  size={20}
                                  className="text-gray-400 group-hover:text-red-400"
                                />
                              </button>
                            </div>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {item.description}
                            </p>

                            <p className="text-2xl font-semibold text-white mb-4">
                              ${item.price}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  handleDecreaseQuantity(item.id, item.quantity)
                                }
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center border border-white/20"
                              >
                                <Minus size={16} className="text-white" />
                              </button>
                              <span className="text-lg font-medium text-white min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center border border-white/20"
                              >
                                <Plus size={16} className="text-white" />
                              </button>
                            </div>

                            <div className="text-xl font-bold text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                      Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="font-semibold text-white">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-lg">
                        <span className="text-gray-400">Shipping</span>
                        <span className="font-semibold text-white">
                          {shipping === 0 ? (
                            <span className="text-purple-400">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-lg">
                        <span className="text-gray-400">Tax</span>
                        <span className="font-semibold text-white">
                          ${tax.toFixed(2)}
                        </span>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-white">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {subtotal < 100 && subtotal > 0 && (
                      <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4 mb-6">
                        <p className="text-purple-200 text-sm">
                          Add ${(100 - subtotal).toFixed(2)} more for free
                          shipping
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Link
                        to="/checkout"
                        className="block w-full bg-white text-black py-4 px-6 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl text-center"
                      >
                        Checkout
                      </Link>
                      <button className="w-full border-2 border-white/30 text-white py-3 px-6 rounded-full font-medium hover:border-white transition-all duration-300">
                        Apple Pay
                      </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-2">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span>Secure Checkout</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-2">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span>Free Returns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductCard;
