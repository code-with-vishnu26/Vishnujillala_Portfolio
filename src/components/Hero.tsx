import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingCube from "./FloatingCube";
import RotatingText3D from "./RotatingText3D";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20 md:py-0">
      <div className="absolute inset-0 z-0">
        <FloatingCube />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.greeting')}
            </motion.h2>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {t('hero.name')}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center lg:justify-start mt-2"
            >
              <RotatingText3D />
            </motion.div>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t('hero.tagline')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 md:mt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <a 
                href="#professional-journey" 
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base text-center text-white whitespace-nowrap"
              >
                {t('hero.viewWork')}
              </a>
              <a 
                href="#contact" 
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-white text-xs sm:text-sm md:text-base text-center whitespace-nowrap"
              >
                {t('hero.contactMe')}
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1LnZTFVzXaXV0IF8h0rPkJU_Rol5bRrrf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-foreground/30 dark:border-gray-400 rounded-full font-semibold hover:bg-foreground/5 dark:hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm md:text-base text-center text-foreground whitespace-nowrap"
              >
                {t('hero.downloadResume')}
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center order-1 lg:order-2 mb-6 lg:mb-0"
          >
            <div className="relative">
              <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-64 lg:w-72 lg:h-80 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur-3xl absolute inset-0"></div>
              <div className="w-28 h-32 sm:w-44 sm:h-48 md:w-52 md:h-64 lg:w-72 lg:h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl relative z-10 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white shadow-2xl">
                VJ
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-muted-foreground sm:w-8 sm:h-8" />
      </motion.div>
    </section>
  );
};

export default Hero;
