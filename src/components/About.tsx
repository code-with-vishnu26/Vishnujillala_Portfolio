import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Calendar, X, Trophy, Target } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  const cardDetails = {
    education: {
      title: "Education",
      icon: GraduationCap,
      color: "blue-400",
      content: {
        degree: "B.Tech – CSE (Core)",
        institution: "Woxsen University, Hyderabad",
        duration: "2022 – 2026",
        description: "Pursuing Bachelor of Technology in Computer Science Engineering with focus on core computer science concepts, algorithms, and modern software development practices.",
        highlights: ["Current CGPA: 7.5/10", "Specialization in Full Stack Development", "Active participant in coding competitions", "Member of Computer Science Society"]
      }
    },
    location: {
      title: "Location",
      icon: MapPin,
      color: "purple-400",
      content: {
        current: "Nizamabad, Telangana, India",
        description: "Based in Nizamabad, a vibrant district in Telangana state. Open to remote work opportunities and willing to relocate for the right position.",
        details: ["Time Zone: IST (UTC +5:30)", "Open to Remote Work", "Willing to Relocate", "Passport Ready for International Opportunities"]
      }
    },
    achievement: {
      title: "Achievement",
      icon: Trophy,
      color: "yellow-400",
      content: {
        title: "DIGITECH Hackathon Winner",
        date: "March 2025",
        description: "Ranked #1 among 50+ teams using Resume Ranker AI tool",
        details: ["Developed AI-powered resume ranking system", "Used machine learning algorithms for scoring", "Implemented React frontend with Node.js backend"]
      }
    },
    interests: {
      title: "Interests",
      icon: Target,
      color: "green-400",
      content: {
        description: "Passionate about technology and continuous learning",
        interests: [{
          name: "Competitive Coding",
          description: "Regularly practicing problem-solving on LeetCode with 100+ completed challenges across data structures and algorithms."
        }, {
          name: "Open Source",
          description: "Contributing to open source projects on GitHub. Contributed to 10+ repositories with 200+ commits."
        }, {
          name: "Exploring AI",
          description: "Learning about machine learning, neural networks, and AI applications in web development."
        }]
      }
    }
  };

  const renderDetailModal = () => {
    if (!selectedCard) return null;
    const card = cardDetails[selectedCard as keyof typeof cardDetails];
    const IconComponent = card.icon;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={() => setSelectedCard(null)}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg sm:max-w-2xl bg-card/90 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-border dark:border-white/20 max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={() => setSelectedCard(null)} 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className={`flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 text-${card.color}`}>
            <IconComponent size={24} className="sm:w-8 sm:h-8" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{card.title}</h3>
          </div>

          {selectedCard === 'education' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-xl overflow-hidden mb-4 sm:mb-6">
                <img src="/lovable-uploads/edae03cb-9d12-4f8c-b78f-1af61bbf4c94.png" alt="Woxsen University" className="w-full h-32 sm:h-48 object-cover" />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">{(card.content as any).degree}</h4>
                <p className="text-base sm:text-lg text-muted-foreground">{(card.content as any).institution}</p>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">{(card.content as any).duration}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{(card.content as any).description}</p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground text-sm sm:text-base">Key Highlights:</h5>
                  <ul className="space-y-1">
                    {(card.content as any).highlights?.map((highlight: string, index: number) => (
                      <li key={index} className="text-sm sm:text-base text-muted-foreground flex items-center">
                        <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedCard === 'location' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 cursor-pointer group"
                onClick={() => window.open('https://maps.app.goo.gl/85FyFsF49cXPXiR4A', '_blank')}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60736.82448507439!2d78.0638!3d18.6725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e4b0b0b0b0b%3A0x1234567890abcdef!2sNizamabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-full border-0 pointer-events-none"
                  loading="lazy"
                  title="Location Map"
                  style={{ filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.1)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center -mt-4">
                    <MapPin className="text-red-500 drop-shadow-lg" size={40} fill="currentColor" />
                    <div className="w-2 h-2 bg-red-500/40 rounded-full mt-[-4px] animate-ping" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm bg-black/60 px-3 py-1 rounded-full">Open in Google Maps</span>
                </div>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground">{(card.content as any).current}</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{(card.content as any).description}</p>
              <div className="space-y-2">
                <h5 className="font-semibold text-foreground text-sm sm:text-base">Details:</h5>
                <ul className="space-y-1">
                  {(card.content as any).details?.map((detail: string, index: number) => (
                    <li key={index} className="text-sm sm:text-base text-muted-foreground flex items-center">
                      <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => window.open('https://maps.app.goo.gl/85FyFsF49cXPXiR4A', '_blank')}
                className="w-full mt-2 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-500 dark:text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <MapPin size={16} />
                View on Google Maps
              </button>
            </div>
          )}

          {selectedCard === 'achievement' && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold text-foreground">{(card.content as any).title}</h4>
              <p className="text-base sm:text-lg text-muted-foreground">{(card.content as any).date}</p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{(card.content as any).description}</p>
              <div className="space-y-2">
                <h5 className="font-semibold text-foreground text-sm sm:text-base">Project Details:</h5>
                <ul className="space-y-1">
                  {(card.content as any).details?.map((detail: string, index: number) => (
                    <li key={index} className="text-sm sm:text-base text-muted-foreground flex items-center">
                      <span className="text-yellow-500 dark:text-yellow-400 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedCard === 'interests' && (
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{(card.content as any).description}</p>
              <div className="space-y-3 sm:space-y-4">
                {(card.content as any).interests?.map((interest: any, index: number) => (
                  <div key={index} className="bg-primary/5 dark:bg-white/5 rounded-lg p-3 sm:p-4 border border-border dark:border-white/10">
                    <h5 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{interest.name}</h5>
                    <p className="text-muted-foreground text-xs sm:text-sm">{interest.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section id="about" className="py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t('about.title')}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('about.description1')}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('about.description2')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Education Card */}
              <motion.div 
                className="bg-card/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-border/60 dark:border-white/10 cursor-pointer hover:bg-card/90 dark:hover:bg-white/10 transition-all duration-300 shadow-sm shadow-primary/5 dark:shadow-none hover:shadow-md hover:shadow-primary/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('education')}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <GraduationCap className="text-blue-500 dark:text-blue-400" size={20} />
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Education</h3>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base text-muted-foreground">B.Tech – Computer Science and Engineering</p>
                  <p className="text-sm sm:text-base text-muted-foreground/70">Woxsen University, Hyderabad</p>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground/70">
                    <Calendar size={14} />
                    <span>2022 – 2026</span>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div 
                className="bg-card/70 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-border/60 dark:border-white/10 cursor-pointer hover:bg-card/90 dark:hover:bg-white/10 transition-all duration-300 overflow-hidden shadow-sm shadow-primary/5 dark:shadow-none hover:shadow-md hover:shadow-primary/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('location')}
              >
                <div className="relative h-36 sm:h-44 w-full bg-muted dark:bg-[#1a1a2e] overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60736.82448507439!2d78.0638!3d18.6725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e4b0b0b0b0b%3A0x1234567890abcdef!2sNizamabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
                    className="w-full h-full border-0 pointer-events-none"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                    style={{ filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.1)' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center -mt-4">
                      <MapPin className="text-red-500 drop-shadow-lg" size={32} fill="currentColor" />
                      <div className="w-2 h-2 bg-red-500/40 rounded-full mt-[-4px] animate-ping" />
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="text-red-500" size={18} />
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground">Nizamabad, Telangana</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Click to view on Google Maps</p>
                </div>
              </motion.div>

              {/* Achievement Card */}
              <motion.div 
                className="bg-card/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-border/60 dark:border-white/10 cursor-pointer hover:bg-card/90 dark:hover:bg-white/10 transition-all duration-300 shadow-sm shadow-primary/5 dark:shadow-none hover:shadow-md hover:shadow-primary/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('achievement')}
              >
                <h3 className="text-foreground font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                  <Trophy className="text-yellow-500 dark:text-yellow-400 mr-2" size={18} />
                  Achievement
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <strong>DIGITECH Hackathon Winner</strong> – March 2025<br />
                  <span className="text-xs sm:text-sm">Ranked #1 among 50+ teams using Resume Ranker AI tool</span>
                </p>
              </motion.div>

              {/* Interests Card */}
              <motion.div 
                className="bg-card/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border dark:border-white/10 cursor-pointer hover:bg-card/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('interests')}
              >
                <h3 className="text-foreground font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                  <Target className="text-green-500 dark:text-green-400 mr-2" size={18} />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Competitive Coding", "Open Source", "Exploring AI"].map(interest => (
                    <span 
                      key={interest} 
                      className="px-2 sm:px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-full text-xs sm:text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {renderDetailModal()}
      </AnimatePresence>
    </>
  );
};

export default About;
