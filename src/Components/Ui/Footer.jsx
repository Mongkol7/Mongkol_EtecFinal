import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Shop and Learn',
      links: [
        'Store',
        'Mac',
        'iPad',
        'iPhone',
        'Watch',
        'Vision',
        'AirPods',
        'TV & Home',
        'Accessories',
        'Gift Cards',
      ],
    },
    {
      title: 'Services',
      links: [
        'Apple Music',
        'Apple TV+',
        'Apple Fitness+',
        'Apple News+',
        'Apple Arcade',
        'iCloud',
        'Apple One',
        'Apple Card',
        'Apple Books',
        'App Store',
      ],
    },
    {
      title: 'Account',
      links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'],
    },
    {
      title: 'Apple Store',
      links: [
        'Find a Store',
        'Genius Bar',
        'Today at Apple',
        'Apple Camp',
        'Apple Store App',
        'Certified Refurbished',
        'Financing',
        'Order Status',
        'Shopping Help',
      ],
    },
    {
      title: 'For Business',
      links: ['Apple and Business', 'Shop for Business'],
    },
    {
      title: 'For Education',
      links: ['Apple and Education', 'Shop for K-12', 'Shop for College'],
    },
    {
      title: 'Apple Values',
      links: [
        'Accessibility',
        'Education',
        'Environment',
        'Inclusion and Diversity',
        'Privacy',
        'Racial Equity and Justice',
        'Supplier Responsibility',
      ],
    },
    {
      title: 'About Apple',
      links: [
        'Newsroom',
        'Apple Leadership',
        'Career Opportunities',
        'Investors',
        'Ethics & Compliance',
        'Events',
        'Contact Apple',
      ],
    },
  ];

  return (
    <footer className="bg-gray-50/80 backdrop-blur-xl border-t border-gray-200/30">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div
              key={index}
              className="space-y-3 transition-all duration-300 ease-out"
            >
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 ease-out hover:underline hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200/50 pt-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Stay up to date
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest news, product updates, and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-300 ease-out focus:scale-105"
              />
              <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Info */}
        <div className="border-t border-gray-200/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Follow us:</span>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 group"
              >
                <Facebook
                  size={18}
                  className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 group"
              >
                <Twitter
                  size={18}
                  className="text-gray-600 group-hover:text-blue-400 transition-colors duration-300"
                />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 group"
              >
                <Instagram
                  size={18}
                  className="text-gray-600 group-hover:text-pink-600 transition-colors duration-300"
                />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/80 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 group"
              >
                <Youtube
                  size={18}
                  className="text-gray-600 group-hover:text-red-600 transition-colors duration-300"
                />
              </a>
            </div>

            {/* Contact Info */}
            <div className="text-sm text-gray-600">
              <p>
                More ways to shop:{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:underline transition-all duration-300"
                >
                  Find an Apple Store
                </a>{' '}
                or{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:underline transition-all duration-300"
                >
                  other retailer
                </a>{' '}
                near you. Or call 1-800-MY-APPLE.
              </p>
            </div>
          </div>

          {/* Developer Info & Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="mb-6">
              <p className="text-xs text-gray-600 mb-1">
                Website developed by{' '}
                <span className="font-semibold text-gray-900">
                  Sereymongkol Theoung
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Web Developer | Cambodia |{' '}
                <a
                  href="mailto:thoeungsereymongkol@gmail.com"
                  className="text-blue-600 hover:underline transition-colors duration-300"
                >
                  thoeungsereymongkol@gmail.com
                </a>
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-xs text-gray-500">
                Copyright © 2025 Apple Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors duration-300 hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors duration-300 hover:underline"
                >
                  Terms of Use
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors duration-300 hover:underline"
                >
                  Sales and Refunds
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors duration-300 hover:underline"
                >
                  Legal
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="hover:text-gray-900 transition-colors duration-300 hover:underline"
                >
                  Site Map
                </a>
              </div>
            </div>

            {/* Country Selector */}
            <div className="mt-4">
              <button className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-900 transition-all duration-300 ease-out group">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  🌐
                </span>
                <span className="group-hover:underline">United States</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
