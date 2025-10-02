import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react';
import Navbar from './Ui/Navbar';
import Footer from './Ui/Footer';
import products from '../data/productData';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false,
  });

  // Load cart data
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  // Format expiry date
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData({ ...formData, expiryDate: value });
  };

  // Validate form
  const validateForm = () => {
    const required = [
      'email',
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'zipCode',
      'phone',
      'cardNumber',
      'cardName',
      'expiryDate',
      'cvv',
    ];

    for (let field of required) {
      if (!formData[field]) {
        Swal.fire({
          title: 'Incomplete Form',
          text: `Please fill in all required fields`,
          icon: 'warning',
          confirmButtonColor: '#a855f7',
          background: '#1f2937',
          color: '#fff',
          backdrop: 'rgba(0,0,0,0.8)',
        });
        return false;
      }
    }

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      Swal.fire({
        title: 'Invalid Card',
        text: 'Please enter a valid 16-digit card number',
        icon: 'error',
        confirmButtonColor: '#a855f7',
        background: '#1f2937',
        color: '#fff',
        backdrop: 'rgba(0,0,0,0.8)',
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);

      // Clear cart
      localStorage.removeItem('cart');

      Swal.fire({
        title: 'Order Placed Successfully!',
        html: `
          <div class="text-center">
            <div class="mb-4">
              <svg class="w-16 h-16 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="text-gray-300 mb-2">Thank you for your purchase!</p>
            <p class="text-sm text-gray-400">Order confirmation sent to ${
              formData.email
            }</p>
            <p class="text-sm text-gray-400 mt-2">Total: $${total.toFixed(
              2
            )}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#a855f7',
        confirmButtonText: 'View Orders',
        showCancelButton: true,
        cancelButtonText: 'Continue Shopping',
        cancelButtonColor: '#6b7280',
        background: '#1f2937',
        color: '#fff',
        backdrop: 'rgba(0,0,0,0.8)',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/orders');
        } else {
          navigate('/ProductContainer');
        }
      });
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white pt-20">
          <section className="py-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-32 h-32 bg-gray-900/50 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <Package size={64} className="text-gray-500" />
              </div>
              <h2 className="text-4xl font-thin text-white mb-4">
                Your cart is empty
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Add items to your cart before checking out
              </p>
              <Link
                to="/ProductContainer"
                className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Start Shopping
              </Link>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-20">
        {/* Header */}
        <section className="py-16 px-6 bg-gradient-to-b from-purple-900/20 to-black relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
          <div className="max-w-screen-xl mx-auto relative z-10">
            <Link
              to="/ProductCard"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Bag</span>
            </Link>
            <h1 className="text-5xl md:text-7xl font-thin bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Checkout
            </h1>
            <div className="flex items-center gap-8 text-sm text-gray-400 mt-6">
              <div className="flex items-center gap-2">
                <Lock size={16} />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} />
                <span>Free Shipping Over $100</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                        1
                      </span>
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="(123) 456-7890"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                        2
                      </span>
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="Apt 4B"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="NY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                        3
                      </span>
                      Payment Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength="19"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <CreditCard
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryChange}
                            maxLength="5"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength="4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <input
                          type="checkbox"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          className="w-5 h-5 bg-white/5 border border-white/10 rounded text-purple-500 focus:ring-2 focus:ring-purple-500"
                        />
                        <label className="text-sm text-gray-300">
                          Save payment information for future purchases
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black py-5 px-8 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={20} />
                        Complete Order - ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-24">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Order Summary
                  </h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center p-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-white line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-white mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
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
                      <div className="flex justify-between text-2xl font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-white">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-purple-400" />
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-purple-400" />
                        <span>Free returns within 14 days</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-purple-400" />
                        <span>Secure SSL encrypted checkout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
