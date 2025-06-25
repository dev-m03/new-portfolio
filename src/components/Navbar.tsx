"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationLink from './NavigationLink';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navbar variants for animation
  const navbarVariants = {
    expanded: {
      width: "calc(100% - 2rem)",
      maxWidth: "750px",
      height: "4rem",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(59, 130, 246, 0.2)"
    },
    collapsed: {
      width: "calc(100% - 2rem)",
      maxWidth: "700px",
      height: "3.5rem",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
    }
  };

  // Logo text variants
  const logoVariants = {
    expanded: { fontSize: "1.2rem" },
    collapsed: { fontSize: "1rem" }
  };
  
  return (
    <div className="fixed top-2 sm:top-4 md:top-6 left-0 right-0 z-[100] flex items-center justify-center pointer-events-none isolate">
      <motion.nav 
        className="rounded-full flex items-center justify-between px-3 sm:px-4 md:px-6 pointer-events-auto"
        initial="expanded"
        animate={scrolled ? "collapsed" : "expanded"}
        variants={navbarVariants}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut" 
        }}
      >
        {/* Logo / Left Section */}
        <motion.div 
          className="flex items-center"
          variants={logoVariants}
        >
          <NavigationLink href="/" className="flex items-center space-x-1.5 sm:space-x-2 p-2 -m-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white rounded-md flex items-center justify-center">
              <span className="text-black font-bold text-xs sm:text-sm">Y</span>
            </div>
            <span className="font-bold text-white text-sm sm:text-base">Yash</span>
          </NavigationLink>
        </motion.div>
        
        {/* Desktop Menu / Middle Section - Simplified */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-8 mx-auto">
            <NavigationLink 
              href="/experience" 
              className="text-white text-sm font-medium hover:text-blue-400 transition-colors px-2"
            >
              Experience
            </NavigationLink>
            
            <NavigationLink 
              href="/projects" 
              className="text-white text-sm font-medium hover:text-blue-400 transition-colors px-2"
            >
              Projects
            </NavigationLink>
            
            <NavigationLink 
              href="/blog"
              className="text-white text-sm font-medium hover:text-blue-400 transition-colors px-2"
            >
              Blog
            </NavigationLink>
          </div>
        </div>
        
        {/* Buttons / Right Section */}
        <div className="hidden md:flex items-center">
          <NavigationLink 
            href="/tech-stack" 
            className="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Tech Stack
          </NavigationLink>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 focus:outline-none p-3 -m-3"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-64 bg-black/90 backdrop-blur-md border border-blue-900/30 rounded-xl overflow-hidden pointer-events-auto z-[110]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col py-4 px-6">
            <NavigationLink 
              href="/experience" 
              className="text-gray-100 hover:text-blue-400 transition-colors py-4 px-2 text-base font-medium active:bg-blue-900/20 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Experience
            </NavigationLink>
            <NavigationLink 
              href="/projects" 
              className="text-gray-100 hover:text-blue-400 transition-colors py-4 px-2 text-base font-medium active:bg-blue-900/20 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </NavigationLink>
            <NavigationLink 
              href="/blog"
              className="text-gray-100 hover:text-blue-400 transition-colors py-4 px-2 text-base font-medium active:bg-blue-900/20 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </NavigationLink>
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-800">
              <NavigationLink 
                href="/tech-stack" 
                className="bg-white text-black font-medium px-4 py-3 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors text-center text-base"
                onClick={() => setMenuOpen(false)}
              >
                Tech Stack
              </NavigationLink>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 