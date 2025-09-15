import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductCard = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage on component mount ONLY
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    };

    loadCart();
  }, []); // Empty dependency array - only run once

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
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

  // Remove item with SweetAlert confirmation
  const removeItem = (id) => {
    const item = cartItems.find((item) => item.id === id);

    Swal.fire({
      title: 'Remove Item?',
      text: `Are you sure you want to remove "${item.title}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Remove',
      cancelButtonText: 'Cancel',
      background: 'rgba(255, 255, 255, 0.95)',
      customClass: {
        popup: 'rounded-xl',
        title: 'text-xl font-bold text-gray-800',
        content: 'text-gray-600',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));

        // Success message
        Swal.fire({
          title: 'Removed!',
          text: `"${item.title}" has been removed from your cart.`,
          icon: 'success',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: 'rgba(255, 255, 255, 0.95)',
          customClass: {
            popup: 'rounded-xl',
            title: 'text-xl font-bold text-gray-800',
            content: 'text-gray-600',
          },
        });
      }
    });
  };

  // Handle quantity decrease with confirmation when reaching 0
  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity === 1) {
      // If quantity is 1, ask for confirmation to remove
      removeItem(id);
    } else {
      // Just decrease quantity normally
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // Clear entire cart with SweetAlert confirmation
  const clearCart = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: 'Cart is Empty',
        text: 'Your cart is already empty.',
        icon: 'info',
        confirmButtonColor: '#6b7280',
        timer: 2000,
        timerProgressBar: true,
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl font-bold text-gray-800',
          content: 'text-gray-600',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Clear Cart?',
      text: `Are you sure you want to remove all ${cartItems.length} items from your cart? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Clear Cart',
      cancelButtonText: 'Cancel',
      background: 'rgba(255, 255, 255, 0.95)',
      customClass: {
        popup: 'rounded-xl',
        title: 'text-xl font-bold text-gray-800',
        content: 'text-gray-600',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems([]);
        localStorage.removeItem('cart');

        // Success message
        Swal.fire({
          title: 'Cart Cleared!',
          text: 'All items have been removed from your cart.',
          icon: 'success',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: 'rgba(255, 255, 255, 0.95)',
          customClass: {
            popup: 'rounded-xl',
            title: 'text-xl font-bold text-gray-800',
            content: 'text-gray-600',
          },
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center">
          {/* Back Button */}
          <div className="styled-wrapper">
            <Link to="/" className="nav-btn">
              <div className="nav-btn-box">
                <span className="nav-btn-elem">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path
                      fill="black"
                      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                    ></path>
                  </svg>
                </span>
                <span className="nav-btn-elem">
                  <svg
                    fill="black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-green-600">Shopping Cart</h1>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Add some products from the main page to see them here!
            </p>
            <Link
              to="/"
              className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Cart Items ({cartItems.length})
              </h2>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all duration-300"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        {item.category && (
                          <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold capitalize mb-4">
                            {item.category}
                          </div>
                        )}

                        <div className="text-2xl font-bold text-green-600 mb-4">
                          ${item.price}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 font-medium">
                            Quantity:
                          </span>
                          <button
                            onClick={() =>
                              handleDecreaseQuantity(item.id, item.quantity)
                            }
                            className="w-10 h-10 bg-gray-200 hover:bg-red-600 hover:text-white text-gray-800 font-bold rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="bg-gray-100 px-4 py-2 rounded-xl text-lg font-bold text-gray-900 min-w-[60px] text-center border-2 border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-10 h-10 bg-gray-200 hover:bg-green-600 hover:text-white text-gray-800 font-bold rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-xl font-bold text-gray-900">
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
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-green-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {subtotal < 50 && subtotal > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <p className="text-yellow-800 text-sm">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Proceed to Checkout
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-2xl font-semibold transition-all duration-300">
                    Save for Later
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Secure
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                      </svg>
                      Free Shipping
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
