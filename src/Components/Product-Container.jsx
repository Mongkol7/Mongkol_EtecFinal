import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from './skeleton';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ProductContainer() {
  const [data, setData] = React.useState([]); // for storing data from API in state variable data and setData is function to update data

  const [loading, setLoading] = useState(true); // for loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
        response.status === 200
          ? console.log('Data fetched successfully✅')
          : console.log('Something went wrong during fetching data❌');
      } catch (err) {
        console.log('Something went wrong during fetching data: ' + err);
      } finally {
        setLoading(false); // set loading to false after data is fetched or error occurs
      }
    };
    fetchData();
  }, []);

  // Function to add item to localStorage cart
  const addToCart = (item) => {
    try {
      // Get existing cart from localStorage or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // If item exists, increase quantity
        existingCart[existingItemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add new item with quantity 1
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

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));

      console.log('Cart updated:', existingCart);
      return true;
    } catch (error) {
      console.error('Error saving to cart:', error);
      return false;
    }
  };

  // Function to get cart count for display
  const getCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      return cart.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error('Error reading cart:', error);
      return 0;
    }
  };

  // Simplified SweetAlert function for Buy Now button - Direct add to cart
  const handleBuyNow = (item) => {
    // Add item to cart directly
    const success = addToCart(item);

    if (success) {
      // Success alert only
      Swal.fire({
        title: 'Added to Cart!',
        text: `"${item.title}" has been added to your cart.`,
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
          confirmButton: 'font-bold px-6 py-3 rounded-lg',
        },
      });
    }
  };

  return (
    <div className="container mx-auto select-none">
      <div className="nav flex justify-between items-center  rounded-[20px] my-5">
        <Link
          to="/"
          className="text-green-600 font-bold text-5xl text-center my-5 shadow-lg p-5 rounded-lg hover:scale-105 transition-all duration-300"
        >
          MK-SHOP
        </Link>
        <div className="flex gap-4 mr-5">
          <Link
            to="/ProductCard"
            className="text-green-600 font-bold text-lg hover:underline relative"
          >
            Cart
            <i className="fa fa-shopping-cart ml-1 text-green-600"></i>
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <Link
            to="/"
            className="text-green-600 font-bold text-lg hover:underline"
          >
            Profile
          </Link>
        </div>
      </div>
      {
        <div className="product-container flex flex-wrap justify-center items-center gap-[20px] mx-auto">
          {loading ? (
            <>
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
              :
            </>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="product-card w-[300px] h-[360px] flex flex-col bg-white items-center p-4 rounded-[20px] shadow-lg overflow-hidden"
              >
                {/* Image Container */}
                <div className="w-full h-[160px] flex justify-center items-center mb-3 bg-gray-50 rounded-lg">
                  <Link to={`/product/${item.id}`}>
                    <img
                      className="h-[140px] w-auto object-contain hover:scale-105 transition-all duration-300 cursor-pointer"
                      src={item.image}
                      alt={item.title}
                    />
                  </Link>
                </div>

                {/* Content Container */}
                <div className="flex flex-col text-center w-full h-full">
                  <Link to={`/product/${item.id}`}>
                    <h1 className="title text-lg font-bold hover:text-green-600 transition-colors duration-300 cursor-pointer mb-2 leading-tight h-[50px] overflow-hidden">
                      {item.title.slice(0, 40)}
                    </h1>
                  </Link>
                  <p className="des text-gray-600 text-sm leading-relaxed mb-3 h-[60px] overflow-hidden">
                    {item.description.slice(0, 70)}...
                  </p>

                  {/* Price and Button - Fixed to bottom */}
                  <div className="flex flex-row justify-between items-center w-full bg-transparent mt-[-20px]">
                    <h1 className="price text-xl font-bold text-green-600">
                      $ {item.price}
                    </h1>
                    {/* Buy Button with SweetAlert and localStorage */}
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="button flex flex-row gap-0"
                    >
                      <span className="text">Buy Now</span>
                      <span className="svg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="20"
                          viewBox="0 0 38 15"
                          fill="none"
                        >
                          <path
                            fill="white"
                            d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      }
    </div>
  );
}

export default ProductContainer;
