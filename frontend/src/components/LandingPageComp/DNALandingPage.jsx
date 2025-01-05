'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DNAScene from './DNAScene';
import Navbar from '../Navbar';
import Button from '../ui/LandingPageButton';

const DNALandingPage = () => {
  const [activeBase, setActiveBase] = useState(null);
  const { scrollY } = useScroll();

  // DNA fade-in/out effect
  const dnaOpacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out as we scroll down
  const dnaTranslateY = useTransform(scrollY, [0, 300], [0, 50]); // Slight downward motion

  const handleBaseClick = (index) => {
    setActiveBase(index);
  };

  const baseInfo = [
    { title: "Patient Data", description: "Secure and comprehensive patient information management." },
    { title: "Resource Allocation", description: "AI-driven optimization of hospital resources." },
    { title: "Treatment Plans", description: "Personalized care pathways based on data analytics." },
    { title: "Research Integration", description: "Seamless incorporation of latest medical research." },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white text-green-800">
      <Navbar />

      <div className="flex items-center justify-between h-full w-full px-10">
        {/* Left Side: Website Name and Description */}
        <div className="w-1/2 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold mb-4"
          >
            MediSync
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Unraveling the Complexity of Healthcare Management
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Decode MediSync
            </Button>
          </motion.div>
        </div>

        {/* Right Side: DNA Animation */}
        <motion.div
          className="w-1/2 h-full flex justify-center items-center relative"
          style={{ opacity: dnaOpacity, translateY: dnaTranslateY }}
        >
          <div className="absolute top-0 right-0 h-full w-full">
            <DNAScene onBaseClick={handleBaseClick} />
          </div>
        </motion.div>
      </div>

      {/* Active Base Information at the Bottom */}
      {activeBase !== null && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-green-100 p-6 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">{baseInfo[activeBase].title}</h2>
          <p className="text-lg">{baseInfo[activeBase].description}</p>
        </motion.div>
      )}
    </div>
  );
};

export default DNALandingPage;
