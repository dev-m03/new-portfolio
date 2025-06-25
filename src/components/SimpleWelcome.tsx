"use client";

import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaPython, FaCode, FaServer, FaDatabase } from 'react-icons/fa';
import { SiDjango, SiPostgresql, SiDocker, SiAmazon, SiReact, SiLinux } from 'react-icons/si';
import { MdEmail, MdDevices, MdCloudQueue } from 'react-icons/md';
import { TbBrandOpenSource } from 'react-icons/tb';
import { FiTerminal } from 'react-icons/fi';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

// Animation for typing text effect
const typingVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
};

// Convert text to an array of characters for typing animation
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  isCommand?: boolean;
}

const AnimatedText = ({ text, className = "", delay = 0, isCommand = false }: AnimatedTextProps) => {
  // Format text to ensure proper line breaks for longer content
  const formattedText = text.replace(/\n/g, '\n');
  
  return (
    <motion.p
      className={`${className} ${isCommand ? "text-green-400 font-bold" : ""} break-words`}
      variants={typingVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
    >
      {isCommand && <span className="text-blue-400 mr-2">$</span>}
      {Array.from(formattedText).map((letter, i) => (
        <motion.span key={i} variants={letterVariants}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

// Blinking cursor component
interface BlinkingCursorProps {
  show?: boolean;
}

const BlinkingCursor = ({ show = true }: BlinkingCursorProps) => {
  if (!show) return null;
  
  return (
    <motion.span
      className="inline-block w-2.5 h-5 bg-green-400"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1, repeatType: "loop" }}
    />
  );
};

// Floating tech icon component
interface FloatingTechIconProps {
  icon: React.ComponentType<{ size: number }>;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color?: string;
}

const FloatingTechIcon = ({ icon: Icon, x, y, size, delay, duration, color }: FloatingTechIconProps) => {
  return (
    <motion.div
      className="absolute text-opacity-20 pointer-events-none"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        color: color || 'white',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0.15], 
        scale: [0, 1, 0.9],
        y: [0, -15, 0],
      }}
      transition={{ 
        delay, 
        duration, 
        repeat: Infinity, 
        repeatType: 'reverse' 
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default function SimpleWelcome() {
  // Animation control for sequential display
  const controls = useAnimation();
  // State to track when terminal animations are complete
  const [terminalLoaded, setTerminalLoaded] = useState(false);
  const navbarControls = useAnimation();
  
  // Tech icons to display
  const techIcons = [
    { Icon: FaPython, x: 15, y: 20, size: 40, delay: 1, duration: 8, color: '#3776AB' },
    { Icon: SiDjango, x: 10, y: 40, size: 36, delay: 2, duration: 7, color: '#092E20' },
    { Icon: FaDatabase, x: 18, y: 60, size: 28, delay: 3, duration: 6, color: '#F29111' },
    { Icon: FaServer, x: 20, y: 80, size: 34, delay: 2.5, duration: 9, color: '#00C7B7' },
    { Icon: SiPostgresql, x: 12, y: 75, size: 30, delay: 3.5, duration: 8, color: '#336791' },
    { Icon: SiDocker, x: 8, y: 25, size: 32, delay: 4, duration: 7, color: '#2496ED' },
    { Icon: FiTerminal, x: 22, y: 35, size: 38, delay: 1.5, duration: 6, color: '#5ED3F3' },
    { Icon: SiAmazon, x: 85, y: 30, size: 36, delay: 2, duration: 8, color: '#FF9900' },
    { Icon: SiReact, x: 88, y: 50, size: 40, delay: 3, duration: 7, color: '#61DAFB' },
    { Icon: SiLinux, x: 80, y: 70, size: 34, delay: 2.5, duration: 6, color: '#FCC624' },
    { Icon: FaCode, x: 82, y: 25, size: 30, delay: 3.5, duration: 8, color: '#E34F26' },
    { Icon: MdDevices, x: 90, y: 85, size: 38, delay: 4, duration: 7, color: '#7B42BC' },
    { Icon: MdCloudQueue, x: 78, y: 45, size: 42, delay: 1.5, duration: 9, color: '#0078D7' },
    { Icon: TbBrandOpenSource, x: 84, y: 65, size: 36, delay: 4.5, duration: 8, color: '#33CC00' },
  ];
  
  useEffect(() => {
    controls.start("visible");
    
    // Set terminal as loaded after all animations have played (10s for cursor + 1s buffer)
    const timer = setTimeout(() => {
      setTerminalLoaded(true);
    }, 11000);
    
    return () => clearTimeout(timer);
  }, [controls]);
  
  // Animate navbar when terminal is loaded
  useEffect(() => {
    if (terminalLoaded) {
      navbarControls.start({
        height: "auto",
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
      });
    }
  }, [terminalLoaded, navbarControls]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black overflow-auto">
      {/* Background tech decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {techIcons.map((icon, index) => (
          <FloatingTechIcon
            key={index}
            icon={icon.Icon}
            x={icon.x}
            y={icon.y}
            size={icon.size}
            delay={icon.delay}
            duration={icon.duration}
            color={icon.color}
          />
        ))}
      </div>
      
      {/* Animated Navbar */}
      <motion.div 
        className="w-full absolute top-0 z-50"
        initial={{ height: "60px", opacity: 0.7 }}
        animate={navbarControls}
      >
        <Navbar />
      </motion.div>
      
      {/* Main content - improved mobile responsiveness */}
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 pt-28 pb-8 sm:pt-40 sm:pb-16 flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-16 relative z-10">
        <div className="text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-500 via-cyan-400 to-green-500 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
            Hi, I&apos;m Yash
          </h1>
          
          <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">
            Welcome to my portfolio
          </div>
        </div>
        
        {/* Intro Text - improved mobile layout */}
        <div className="w-full max-w-4xl px-2 sm:px-4 md:px-6 text-center">
          <div className="overflow-hidden rounded-lg shadow-2xl border border-gray-700 transform perspective-1000 transition-all duration-300 hover:shadow-glow hover:scale-[1.01]">
            {/* Terminal Header */}
            <div className="bg-gray-900 px-2 sm:px-3 md:px-4 py-2 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"></div>
              </div>
              <div className="text-xs text-gray-400 font-mono hidden sm:block">bash ~ /portfolio</div>
              <div className="text-xs text-gray-400 font-mono sm:hidden">~</div>
              <div className="w-2 sm:w-4"></div> {/* Spacer */}
            </div>
            
            {/* Terminal Content - improved mobile text sizing */}
            <div className="bg-[#0d1117] p-2 sm:p-3 md:p-5 text-left font-mono text-xs sm:text-sm md:text-base overflow-hidden">
              <AnimatedText text="whoami" className="mb-2" delay={0.5} isCommand={true} />
              
              <AnimatedText 
                text="Hi there, my name is Yash Raj (kai) - Python backend engineer, Django contributor, and an"
                className="text-gray-300 mb-0 leading-relaxed break-words text-xs sm:text-sm md:text-base"
                delay={1}
              />
              <AnimatedText 
                text="Individual member at Django Software Foundation."
                className="text-gray-300 mb-4 leading-relaxed break-words text-xs sm:text-sm md:text-base"
                delay={1.5}
              />
              
              <AnimatedText text="skills" className="mb-2" delay={4} isCommand={true} />
              
              <AnimatedText 
                text="I do system design & architecture, devops and I love open source."
                className="text-gray-300 mb-4 leading-relaxed break-words text-xs sm:text-sm md:text-base"
                delay={4.5}
              />
              
              <AnimatedText text="community" className="mb-2" delay={6} isCommand={true} />
              
              <AnimatedText
                text="Organizer at Django India Community, and a Djangonaut Space fellow."
                className="text-gray-300 mb-4 leading-relaxed break-words text-xs sm:text-sm md:text-base"
                delay={6.5}
              />
              
              <AnimatedText text="interests" className="mb-2" delay={8} isCommand={true} />
              
              <AnimatedText
                text="I love attending and giving talks at Conferences and meetups."
                className="text-gray-300 leading-relaxed break-words text-xs sm:text-sm md:text-base"
                delay={8.5}
              />
              
              <motion.div 
                className="flex items-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10 }}
                onAnimationComplete={() => setTerminalLoaded(true)}
              >
                <span className="text-green-400 font-bold">$ </span>
                <BlinkingCursor />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Dock - improved mobile positioning */}
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 z-40">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6 px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 bg-gray-900/60 backdrop-blur-md rounded-full border border-gray-800 shadow-lg hover:shadow-glow transition-all duration-300">
          {/* GitHub */}
          <a
            href="https://github.com/YashRaj1506"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            <FaGithub className="text-blue-500 text-base sm:text-lg md:text-xl hover:text-blue-400 transition-colors" />
          </a>
          
          {/* Twitter */}
          <a
            href="https://x.com/Yash44207966"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Profile"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            <FaTwitter className="text-blue-500 text-base sm:text-lg md:text-xl hover:text-blue-400 transition-colors" />
          </a>
          
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/yash-raj-83933922a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin className="text-blue-500 text-base sm:text-lg md:text-xl hover:text-blue-400 transition-colors" />
          </a>
          
          {/* Email */}
          <a
            href="mailto:yashraj504300@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send Email"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            <MdEmail className="text-blue-500 text-base sm:text-lg md:text-xl hover:text-blue-400 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Add this to tailwind.config.js if not already present
// extend: {
//   boxShadow: {
//     'glow': '0 0 15px rgba(59, 130, 246, 0.5)'
//   }
// } 