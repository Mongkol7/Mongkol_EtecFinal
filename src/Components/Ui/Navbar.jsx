import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Store } from 'lucide-react';
import { Link }  from 'react-router-dom';
import AppleLogo from '../../assets/AppleLogo.json'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      name: 'Store',
      icon: <Store size={16} />,
      products: [
        {
          name: 'Shop the Latest',
          image:
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop',
          path: '/ProductContainer',
        },
        {
          name: 'Mac',
          image:
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop',
        },
        {
          name: 'iPad',
          image:
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop',
        },
        {
          name: 'iPhone',
          image:
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
        },
        {
          name: 'Watch',
          image:
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=150&h=150&fit=crop',
        },
        {
          name: 'AirPods',
          image:
            'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=150&h=150&fit=crop',
        },
        {
          name: 'TV & Home',
          image:
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Mac',
      products: [
        {
          name: 'MacBook Air',
          image:
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'MacBook Pro',
          image:
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop',
        },
        {
          name: 'iMac',
          image:
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop',
        },
        {
          name: 'Mac Studio',
          image:
            'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=150&h=150&fit=crop',
        },
        {
          name: 'Mac Pro',
          image:
            'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=150&h=150&fit=crop',
        },
        {
          name: 'Mac mini',
          image:
            'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=150&h=150&fit=crop',
        },
        {
          name: 'Compare',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'macOS',
          image:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'iPad',
      products: [
        {
          name: 'iPad Pro',
          image:
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'iPad Air',
          image:
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'iPad',
          image:
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop',
        },
        {
          name: 'iPad mini',
          image:
            'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Pencil',
          image:
            'https://images.unsplash.com/photo-1586953180226-d716b5382f1d?w=150&h=150&fit=crop',
        },
        {
          name: 'Keyboards',
          image:
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&h=150&fit=crop',
        },
        {
          name: 'Compare',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'iPadOS',
          image:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'iPhone',
      products: [
        {
          name: 'iPhone 17 Pro',
          image:
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'iPhone Air',
          image:
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'iPhone 17',
          image:
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'iPhone 16',
          image:
            'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=150&h=150&fit=crop',
        },
        {
          name: 'iPhone 16e',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'Compare',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'Shop',
          image:
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150&h=150&fit=crop',
        },
        {
          name: 'iOS',
          image:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Watch',
      products: [
        {
          name: 'Apple Watch S9',
          image:
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'Apple Watch Ul2',
          image:
            'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Watch SE',
          image:
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Watch Studio',
          image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
        },
        {
          name: 'Bands',
          image:
            'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=150&h=150&fit=crop',
        },
        {
          name: 'Compare',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'watchOS',
          image:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Vision',
      products: [
        {
          name: 'Apple Vision Pro',
          image:
            'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'Apps for Vision Pro',
          image:
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'visionOS',
          image:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'AirPods',
      products: [
        {
          name: 'AirPods Pro',
          image:
            'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=150&h=150&fit=crop',
          badge: 'New',
        },
        {
          name: 'AirPods',
          image:
            'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=150&h=150&fit=crop',
        },
        {
          name: 'AirPods Max',
          image:
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop',
        },
        {
          name: 'Compare',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'TV',
      products: [
        {
          name: 'Apple TV 4K',
          image:
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=150&h=150&fit=crop',
        },
        {
          name: 'HomePod',
          image:
            'https://images.unsplash.com/photo-1543512214-318c7553f230?w=150&h=150&fit=crop',
        },
        {
          name: 'HomePod mini',
          image:
            'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=150&h=150&fit=crop',
        },
        {
          name: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'tvOS',
          image:
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Entertainment',
      products: [
        {
          name: 'Apple TV+',
          image:
            'https://images.unsplash.com/photo-1489599162687-dee7f88b7bae?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Music',
          image:
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Arcade',
          image:
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Fitness+',
          image:
            'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple News+',
          image:
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Podcasts',
          image:
            'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Books',
          image:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop',
        },
        {
          name: 'App Store',
          image:
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Accessories',
      products: [
        {
          name: 'Cases & Protection',
          image:
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=150&h=150&fit=crop',
        },
        {
          name: 'Charging',
          image:
            'https://images.unsplash.com/photo-1609592173755-0fe36b0bd179?w=150&h=150&fit=crop',
        },
        {
          name: 'Audio & Video',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
        },
        {
          name: 'Creativity',
          image:
            'https://images.unsplash.com/photo-1586953180226-d716b5382f1d?w=150&h=150&fit=crop',
        },
        {
          name: 'Mac Accessories',
          image:
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&h=150&fit=crop',
        },
        {
          name: 'iPad Accessories',
          image:
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop',
        },
      ],
    },
    {
      name: 'Support',
      products: [
        {
          name: 'Contact Support',
          image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop',
        },
        {
          name: 'Apple Support App',
          image:
            'https://images.unsplash.com/photo-1471666875520-c75081f42081?w=150&h=150&fit=crop',
        },
        {
          name: 'Service & Repair',
          image:
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=150&h=150&fit=crop',
        },
        {
          name: 'User Guide',
          image:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop',
        },
        {
          name: 'AppleCare+',
          image:
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
        },
        {
          name: 'Community',
          image:
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop',
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <>
      {/* Dropdown Container Wrapper - This creates the connection */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Navigation */}
        <nav
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/20'
              : 'bg-white/95 backdrop-blur-xl'
          }`}
        >
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-between h-12">
              {/* Apple Logo */}
              <div className="flex items-center">
                <Link
                  to="/"
                  className="p-2 -ml-2 rounded-lg transition-all duration-500 ease-out relative overflow-hidden group transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rounded-lg transform scale-x-0 group-hover:scale-x-100"></div>
                  <div className="relative z-10 transition-all duration-300 ease-out group-hover:brightness-110">
                    <img src="/img/AppleLogo.png" className="w-5 h-5"></img>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation Items */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <Link
                      to={item.path || '#'}
                      className="flex items-center space-x-1 text-sm font-normal text-gray-800 hover:text-gray-600 transition-all duration-500 ease-out py-2 px-3 rounded-lg relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out rounded-lg transform scale-x-0 group-hover:scale-x-100"></div>
                      <div className="relative z-10 flex items-center space-x-1 transition-all duration-300 ease-out">
                        {item.icon && (
                          <span className="mr-1 transition-transform duration-300 ease-out group-hover:rotate-3">
                            {item.icon}
                          </span>
                        )}
                        <span className="transition-all duration-300 ease-out group-hover:font-medium">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-lg transition-all duration-500 ease-out relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rounded-lg transform scale-x-0 group-hover:scale-x-100"></div>
                  <div className="relative z-10 transition-all duration-300 ease-out group-hover:rotate-12">
                    <Search
                      size={16}
                      className="text-gray-800 transition-all duration-300 ease-out group-hover:text-gray-600"
                    />
                  </div>
                </button>

                <Link
                  to="/ProductCard"
                  className="p-2 rounded-lg transition-all duration-500 ease-out relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rounded-lg transform scale-x-0 group-hover:scale-x-100"></div>
                  <div className="relative z-10 transition-all duration-300 ease-out group-hover:rotate-12">
                    <ShoppingBag
                      size={16}
                      className="text-gray-800 transition-all duration-300 ease-out group-hover:text-gray-600"
                    />
                  </div>
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 rounded-lg transition-all duration-500 ease-out relative overflow-hidden group transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rounded-lg transform scale-x-0 group-hover:scale-x-100"></div>
                  <div className="relative z-10 transition-all duration-300 ease-out">
                    {isMobileMenuOpen ? (
                      <X
                        size={16}
                        className="text-gray-800 transition-all duration-300 ease-out group-hover:rotate-90"
                      />
                    ) : (
                      <Menu
                        size={16}
                        className="text-gray-800 transition-all duration-300 ease-out group-hover:scale-110"
                      />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar (Expanded) */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-gray-200/30 bg-white/95 backdrop-blur-xl">
              <div className="max-w-screen-xl mx-auto px-4 py-3">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search apple.com"
                    className="w-full pl-4 pr-12 py-2 bg-gray-100/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-300 ease-out focus:scale-105 focus:shadow-lg"
                    autoFocus={searchOpen}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out hover:scale-110">
                    <Search size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Full-Width Dropdown Menu - Connected to Navbar */}
        <div
          className={` bg-white/35 backdrop-blur-xl border-b border-gray-200/30 shadow-lg overflow-hidden transition-all duration-300 ease-out ${
            activeDropdown !== null
              ? 'max-h-96 opacity-100 pointer-events-auto'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {activeDropdown !== null && (
            <div className="max-w-screen-xl mx-auto px-8 py-8">
              <div className="flex items-center justify-center flex-wrap gap-8">
                {navItems[activeDropdown]?.products?.map(
                  (product, productIndex) => (
                    <Link
                      key={productIndex}
                      to={product.path || '#'}
                      className="group flex flex-col items-center text-center cursor-pointer min-w-0 w-24 transition-all duration-300 ease-out"
                    >
                      <div className="relative mb-3">
                        <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 ease-out transform group-hover:-translate-y-1">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-full rounded-[10px] object-contain transition-all duration-300 ease-out group-hover:brightness-110 group-hover:contrast-110"
                          />
                        </div>
                      </div>
                      <div className="">
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-orange-500 transition-all duration-300 ease-out whitespace-nowrap group-hover:font-semibold">
                          {product.name}
                        </h3>
                        {product.badge && (
                          <p className="text-xs mb-[-2.2vh] text-orange-500 font-medium transition-all duration-300 ease-out group-hover:text-orange-600">
                            {product.badge}
                          </p>
                        )}
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-500 ease-out"
          onClick={toggleMobileMenu}
        ></div>

        <div
          className={`absolute top-12 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/30 transition-all duration-500 ease-out max-h-96 overflow-y-auto ${
            isMobileMenuOpen
              ? 'translate-y-0 scale-100'
              : '-translate-y-full scale-95'
          }`}
        >
          <div className="max-w-screen-xl mx-auto px-4 py-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200/30 pb-4 last:border-b-0 transition-all duration-500 ease-out"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="flex items-center space-x-2 text-left py-2 px-4 text-gray-800 font-medium text-lg w-full transition-all duration-300 ease-out hover:bg-gray-100/50 rounded-lg hover:scale-105 hover:pl-6"
                    >
                      {item.icon && (
                        <span className="transition-transform duration-300 ease-out group-hover:rotate-12">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <button className="flex items-center space-x-2 text-left py-2 px-4 text-gray-800 font-medium text-lg w-full transition-all duration-300 ease-out hover:bg-gray-100/50 rounded-lg hover:scale-105 hover:pl-6">
                      {item.icon && (
                        <span className="transition-transform duration-300 ease-out group-hover:rotate-12">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.name}</span>
                    </button>
                  )}

                  {/* Mobile Product Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-3 ml-4">
                    {item.products?.slice(0, 4).map((product, productIndex) => (
                      <Link
                        key={productIndex}
                        to={product.path || '#'}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-300 ease-out hover:scale-105 hover:shadow-md"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 rounded object-cover transition-all duration-300 ease-out hover:scale-110"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate transition-all duration-300 ease-out hover:text-blue-600">
                            {product.name}
                          </p>
                          {product.badge && (
                            <p className="text-xs text-orange-500 font-medium transition-all duration-300 ease-out hover:text-orange-600">
                              {product.badge}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="mt-6 pt-6 border-t border-gray-200/30">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search apple.com"
                  className="w-full pl-4 pr-12 py-3 bg-gray-100/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-out focus:scale-105 focus:shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out hover:scale-110">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
