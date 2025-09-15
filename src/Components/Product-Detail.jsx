import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductDetails() {
  const { id } = useParams(); //for getting id from url(API)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Function to decrease quantity (minimum 1)
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Function to add item to localStorage cart
  const addToCart = (item, qty) => {
    try {
      // Get existing cart from localStorage or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // If item exists, increase quantity
        existingCart[existingItemIndex].quantity += qty;
      } else {
        // If item doesn't exist, add new item with specified quantity
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

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));

      console.log('Cart updated:', existingCart);
      return true;
    } catch (error) {
      console.error('Error saving to cart:', error);
      return false;
    }
  };

  // Handle Add to Cart with SweetAlert
  const handleAddToCart = () => {
    const success = addToCart(product, quantity);

    if (success) {
      // Success alert
      Swal.fire({
        title: 'Added to Cart!',
        text: `${quantity} x "${product.title}" added to your cart.`,
        icon: 'success',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Continue Shopping',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl font-bold text-gray-800',
          content: 'text-gray-600',
        },
      });
    } else {
      // Error alert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add item to cart. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK',
        timer: 2500,
        timerProgressBar: true,
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl font-bold text-gray-800',
          content: 'text-gray-600',
        },
      });
    }
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    const success = addToCart(product, quantity);

    if (success) {
      Swal.fire({
        title: 'Added to Cart!',
        text: `${quantity} x "${product.title}" added. Redirecting to cart...`,
        icon: 'success',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Go to Cart',
        timer: 2000,
        timerProgressBar: true,
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-xl font-bold text-gray-800',
          content: 'text-gray-600',
        },
      }).then(() => {
        // Redirect to cart page
        window.location.href = '/ProductCard';
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto select-none">
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-green-600 font-bold text-5xl shadow-lg p-5 rounded-lg">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto select-none">
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-red-600 font-bold text-5xl shadow-lg p-5 rounded-lg">
            Product not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto select-none px-4">
      {/* Navigation Bar */}
      <div className="nav flex justify-between items-center rounded-[20px] my-5 p-4">
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

        {/* Product Title */}
        <h1 className="text-green-600 font-bold text-3xl text-center">
          Product Details
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link
            to="/ProductCard"
            className="text-green-600 font-bold text-lg hover:underline relative"
          >
            Cart
            {(() => {
              try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const count = cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                );
                return count > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                  </span>
                ) : null;
              } catch (error) {
                return null;
              }
            })()}
          </Link>
          <Link
            to="/"
            className="text-green-600 font-bold text-lg hover:underline"
          >
            Profile
          </Link>
        </div>
      </div>

      {/* Product detail card */}
      <div className="flex justify-center">
        <div className="bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6">
              <img
                className="w-full h-[400px] object-contain hover:scale-105 transition-all duration-300"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between p-4">
              <div>
                <h1 className="text-4xl font-bold mb-6 leading-tight">
                  {product.title}
                </h1>

                <div className="mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {product.category}
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-5xl font-bold text-green-600">
                    ${product.price}
                  </h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="text-xl font-bold">
                        {product.rating.rate}/5
                      </span>
                      <span className="text-gray-600">
                        ({product.rating.count} reviews)
                      </span>
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-gray-200 hover:bg-green-600 hover:text-white text-gray-800 font-bold w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-6 py-3 rounded-2xl text-xl font-bold min-w-[80px] text-center border-2 border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="bg-gray-200 hover:bg-green-600 hover:text-white text-gray-800 font-bold w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 font-bold hover:scale-105 text-lg"
                >
                  Add {quantity} to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 font-bold hover:scale-105 text-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
