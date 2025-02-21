'use client'

import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { motion } from 'framer-motion';
import { bangers } from './fonts';
import { Tag, Percent, Gift, X } from 'lucide-react';

const RouletteWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showWinningAnimation, setShowWinningAnimation] = useState(false);
  
  const data = [
    { 
      id: 'promo_buy3get1',
      option: 'Buy 3 Get 1 Free',
      style: { backgroundColor: '#FF6B9C', textColor: 'white', fontSize: 16 },
      icon: <Tag className="w-3 h-3" />,
      isPromo: true
    },
    { 
      id: 'better_luck',
      option: 'Better Luck Next Time',
      style: { backgroundColor: '#666666', textColor: 'white', fontSize: 16 },
      icon: <X className="w-3 h-3" />,
      isPromo: false
    },
    { 
      id: 'promo_3free',
      option: 'Any 3 Items Free',
      style: { backgroundColor: '#F72585', textColor: 'white', fontSize: 16  },
      icon: <Gift className="w-3 h-3" />,
      isPromo: true
    },
    { 
      id: 'promo_15off',
      option: '15% Off',
      style: { backgroundColor: '#4361EE', textColor: 'white', fontSize: 16 },
      icon: <Percent className="w-3 h-3" />,
      isPromo: true
    }
  ];

  const getRandomNumber = () => {
    // You can adjust these probabilities later as needed
    const probabilities = [0.45,0.45, 0.02, 0.28];
    
    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
      sum += probabilities[i];
      if (random <= sum) return i;
    }
    return probabilities.length - 1;
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      setShowWinningAnimation(false);
      const newPrizeNumber = getRandomNumber();
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const confettiVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const renderSegmentContent = (option, icon) => {
    return (
      <div className="flex items-center justify-center gap-1">
        {icon && <span className="inline-flex">{icon}</span>}
        <span>{option}</span>
      </div>
    );
  };

  useEffect(() => {
    if (!mustSpin && showWinningAnimation && data[prizeNumber].isPromo) {
      const audio = new Audio('/music-effect.mp3');
      audio.play();
    }
  }, [mustSpin, showWinningAnimation]);



  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900  relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center max-w-2xl w-full relative z-10">
        {/* Result Display */}
        {!mustSpin && prizeNumber !== null && (
          <motion.div
            initial="hidden"
            animate={showWinningAnimation ? "visible" : "hidden"}
            variants={confettiVariants}
            className={`bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md border border-white/20 mb-6 ${bangers.className}`}
          >
            <div className="text-center">
                <span className={data[prizeNumber].isPromo ? "text-yellow-400" : "text-gray-300"}>
                {data[prizeNumber].isPromo ? <span> ★ {data[prizeNumber].option} ★ </span> : <span> {data[prizeNumber].option} </span> }
                </span>
              {/* <p className="text-xl text-white mt-2 flex items-center justify-center gap-2">
                {data[prizeNumber].icon && <span>{data[prizeNumber].icon}</span>}
                {data[prizeNumber].option}
              </p> */}
            </div>
          </motion.div>
        )}

        {/* Container for wheel and button with extra padding */}
        <div className="flex flex-col items-center pb-24">
          {/* Wheel Container */}
          <motion.div 
            className="relative w-96 h-96 mb-24  ml-12 md:ml-0"
            animate={{
              scale: mustSpin ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => {
                setMustSpin(false);
                setShowWinningAnimation(true);
              }}
              spinDuration={0.8}
              outerBorderColor="#ffffff30"
              outerBorderWidth={3}
              innerBorderColor="#ffffff20"
              innerBorderWidth={2}
              radiusLineColor="#ffffff10"
              radiusLineWidth={1}
              fontSize={18}
              textDistance={60}

              renderPrizeSection={({ option, icon }) => renderSegmentContent(option, icon)}
            />
          </motion.div>
          
          {/* Spin Button */}
          <motion.button
            onClick={handleSpinClick}
            disabled={mustSpin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-12 py-4 
              text-3xl font-bold
              rounded-full
              shadow-lg
              ${bangers.className}
              ${mustSpin 
                ? 'bg-gray-600 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600'
              }
              relative overflow-hidden
            `}
          >
            <span className="relative z-10">
              {mustSpin ? 'SPINNING...' : 'SPIN THE WHEEL!'}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-400 to-blue-300 opacity-0"
              animate={{
                opacity: mustSpin ? [0, 0.2, 0] : 0,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
