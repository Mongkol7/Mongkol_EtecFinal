import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Ui/Navbar';
import Footer from './Ui/Footer';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail02 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const productImages = [
    '../../public/img/3iPhone17ProMax.jpg',
  '../../public/img/3iPhone17ProMax02.jpg',
  '../../public/img/iPhone17ProMaxCamera.jpg',
  ];

  const colors = [
    { name: 'Orange', bg: 'bg-[#FF6B35]', selected: true },
    { name: 'Blue', bg: 'bg-[#1e293b]', selected: false },
    { name: 'Silver', bg: 'bg-[#d1d5db]', selected: false },
  ];

  const features = [
    {
      title: 'Advanced Performance',
      description:
        'Next-generation processor with 40% faster performance and enhanced efficiency.',
      image:
        '../../public/img/Chip19.jpg',
    },
    {
      title: 'Professional Camera System',
      description:
        'Triple-lens system with AI-enhanced photography and 8K video recording.',
      image:
        '../../public/img/Camera02.jpg'
    },
    {
      title: 'All-Day Battery',
      description:
        'Up to 30 hours of video playback with fast wireless charging.',
      image:
        '../../public/img/Battery.png',
    },
  ];

  const [scale, setScale] = useState(1.1);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust these values to control the zoom effect
      const maxScroll = 500; // Distance to scroll for full effect
      const minScale = 0.8; // Minimum scale (how small it gets)
      const maxScale = 1.1; // Starting scale

      // Calculate scale based on scroll position
      const newScale = Math.max(
        minScale,
        maxScale - (scrollPosition / maxScroll) * (maxScale - minScale)
      );

      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [productImages.length]);

  const handleScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      setIsVisible((prev) => ({ ...prev, [index]: isInView }));
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  
const [videoScale, setVideoScale] = useState(3.5);
const [titleOpacity, setTitleOpacity] = useState(1);
const videoRef = useRef(null);
const videoSectionRef = useRef(null);

// Play/pause video based on visibility
useEffect(() => {
  const videoElement = videoRef.current;
  if (!videoElement) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play().catch((error) => {
            console.log('Video play failed:', error);
          });
        } else {
          videoElement.pause();
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  if (videoSectionRef.current) {
    observer.observe(videoSectionRef.current);
  }

  return () => {
    if (videoSectionRef.current) {
      observer.unobserve(videoSectionRef.current);
    }
  };
}, []);

// Zoom effect on scroll with responsive scaling
useEffect(() => {
  const handleScroll = () => {
    if (!videoSectionRef.current) return;

    const rect = videoSectionRef.current.getBoundingClientRect();
    const sectionHeight = videoSectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrollProgress = Math.max(
      0,
      Math.min(1, (viewportHeight - rect.top) / sectionHeight)
    );

    // Responsive scale values based on screen size
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    let minScale, maxScale;

    if (isMobile) {
      minScale = 1.2; // Zoom out more on mobile
      maxScale = 2.5; // Start smaller on mobile
    } else if (isTablet) {
      minScale = 0.8;
      maxScale = 3.5;
    } else {
      minScale = 1;
      maxScale = 5.5;
    }

    const newScale = maxScale - scrollProgress * (maxScale - minScale);
    setVideoScale(Math.max(minScale, Math.min(maxScale, newScale)));

    // Calculate title opacity
    const fadeThreshold = isMobile ? 2 : 3;
    const opacity = Math.max(
      0,
      Math.min(1, (newScale - fadeThreshold) / (maxScale - fadeThreshold))
    );
    setTitleOpacity(opacity);
  };

  handleScroll(); // Initial call
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll); // Recalculate on resize

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}, []);

 



  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative lg:min-h-screen md:h-[80vh] flex items-center justify-center flex-col pb-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>

          <div className="max-w-4xl mx-auto text-center lg:mt-[160px] md:mt-[140px] mt-[100px] lg:mb-[-100px] md:mb-[0px] mb-[0px] z-10 relative px-6">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Pre-order Now
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              Starting at $999 or $41.62/mo. for 24 mo.
            </p>
          </div>

          <h1 className="lg:text-[300px] md:text-[200px] text-[90px] lg:mb-[-200px] md:mb-[-80px] mb-[-140px] font-thin bg-gradient-to-r from-white text-center via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Pro Max
          </h1>
          <img
            src="../../public/img/Iphone17ProMax-NoBC.png"
            alt="Background"
            className="absolute bottom-0 left-0 right-0 w-auto h-[70vh] object-contain object-bottom md:w-full md:h-[90vh] md:object-contain md:object-bottom lg:inset-0 lg:w-full lg:h-full lg:object-contain opacity-100 lg:z-0 md:z-1 pointer-events-none select-none"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.1s ease-out',
            }}
          />
          <div className="relative z-10 text-center lg:bottom-[-160px] md:bottom-[120px] ">
            <h1 className="text-glow lg:text-[150px] md:text-[150px] text-9xl font-thick bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              17
            </h1>
          </div>
        </section>
        {/* Carousel Section */}
        <div className="relative container mx-auto text-center py-24 px-6 z-40">
          <p className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
            Beyond extraordinary
          </p>

          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl opacity-20 blur-3xl"></div>
            <img
              src={productImages[currentImageIndex]}
              alt="Product"
              className="relative w-full h-full object-cover rounded-3xl transition-all duration-1000 transform hover:scale-105"
            />
          </div>

          <div className="flex gap-3 justify-center mb-8">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Discover More
          </button>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20" data-animate>
              <h2 className="text-5xl md:text-6xl font-thin mb-6">
                Revolutionary Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Every detail engineered for excellence, every feature designed
                to push boundaries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-animate
                  className={`group transition-all duration-700 transform ${
                    isVisible[index + 1]
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <div ref={videoSectionRef} className="h-[200vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Title that fades in/out */}
            <div
              className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 text-center transition-opacity duration-300 px-4"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[35px] font-bold md:text-4xl lg:text-6xl bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
                Pro video
              </h2>
              <h1 className="text-gray-400 font-bold text-[40px] md:text-[150px] lg:text-[100px] lg:w-[140vh] w-[50vh]">
                Any more pro and it would need an agent.
              </h1>
            </div>

            <div
              className="relative transition-transform duration-150 ease-out"
              style={{ transform: `scale(${videoScale})` }}
            >
              {/* Responsive container for video and frame */}
              <div className="relative w-[300px] h-[146px] sm:w-[500px] sm:h-[243px] md:w-[700px] md:h-[340px]">
                {/* Video */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] py-2 px-2 sm:py-3 sm:px-2 md:py-4 md:px-3"
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source
                    src="../../public/video/ShotOnIphone.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* iPhone Frame Image Overlay */}
                <img
                  src="../../public/img/iPhone-Frame.png"
                  alt="iPhone Frame"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-[0px] left-1/2 -translate-x-1/2 z-20 text-center lg:px-4 md:px-4 px-0">
            <h2 className="text-[12px] md:text-xl lg:text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
              From home movies to Hollywood productions, iPhone 17 Pro is up to
              any challenge. With more pro video features than ever — like
              enhanced video stabilization, cinema-grade specs, and
              compatibility with industry-standard workflows — iPhone 17 Pro
              puts powerful filmmaking tools within reach, wherever you need
              them.
            </h2>
          </div>
        </div>

        {/* Color Options */}
        <section className="py-24 px-6 bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-thin mb-4">
              Choose Your Color
            </h2>
            <p className="text-gray-400 mb-12">
              Three stunning finishes to match your style
            </p>

            <div className="flex flex-wrap justify-center gap-10 ">
              {colors.map((color, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div
                    className={`w-16 h-16 ${color.bg} rounded-full mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ring-4 ring-transparent group-hover:ring-white/20`}
                  ></div>
                  <p className="text-sm font-medium">{color.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-thin text-center mb-20">
              Technical Specifications
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-medium mb-2 text-purple-300">
                    Display
                  </h3>
                  <p className="text-gray-400">
                    6.7-inch Super Retina XDR OLED
                  </p>
                  <p className="text-gray-400">
                    2778 × 1284 resolution at 458 ppi
                  </p>
                  <p className="text-gray-400">
                    ProMotion technology up to 120Hz
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-medium mb-2 text-purple-300">
                    Performance
                  </h3>
                  <p className="text-gray-400">A17 Pro chip with 6-core CPU</p>
                  <p className="text-gray-400">6-core GPU with ray tracing</p>
                  <p className="text-gray-400">16-core Neural Engine</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-medium mb-2 text-purple-300">
                    Camera System
                  </h3>
                  <p className="text-gray-400">
                    48MP Main with f/1.78 aperture
                  </p>
                  <p className="text-gray-400">
                    12MP Ultra Wide with f/2.2 aperture
                  </p>
                  <p className="text-gray-400">
                    12MP Telephoto with 3x optical zoom
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-medium mb-2 text-purple-300">
                    Battery & Charging
                  </h3>
                  <p className="text-gray-400">Up to 29 hours video playback</p>
                  <p className="text-gray-400">
                    MagSafe wireless charging up to 15W
                  </p>
                  <p className="text-gray-400">USB-C with USB 3 support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-thin mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join millions who have already made the switch.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Pre-order Now
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              Starting at $999 or $41.62/mo. for 24 mo.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail02;
