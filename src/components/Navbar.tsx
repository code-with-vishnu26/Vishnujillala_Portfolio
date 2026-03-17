import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";
import LanguageSwitcher from "./LanguageSwitcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  // Track window width for mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      } else {
        setUserEmail("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const menuItems = [
    { key: "nav.home", value: "Home" },
    { key: "nav.about", value: "About" },
    { key: "nav.projects", value: "Projects" },
    { key: "nav.journey", value: "Journey" },
    { key: "nav.certifications", value: "Certifications" },
    { key: "nav.resume", value: "Resume" },
    { key: "nav.contact", value: "Contact" },
  ];

  const handleNavClick = (item: string) => {
    setIsOpen(false);
    
    if (item === "Resume") {
      window.open("https://drive.google.com/uc?export=download&id=1tzCxxKywTCItE8WycimCWmbHQXDnHC0p", "_blank");
      return;
    }
    
    const sectionMap: { [key: string]: string } = {
      "Home": "hero",
      "About": "about", 
      "Projects": "projects",
      "Journey": "professional-journey",
      "Certifications": "certifications",
      "Contact": "contact"
    };
    
    const targetId = sectionMap[item];
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-transparent backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-3 sm:px-4 py-3 sm:py-4">
        {/* Logo / Brand */}
        <motion.button 
          className="px-3 sm:px-6 py-2 sm:py-3 text-white ml-2 sm:ml-8 cursor-pointer relative group bg-transparent rounded-2xl border border-transparent transition-all duration-300"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent uppercase">
            Portfolio
          </span>
        </motion.button>

        {/* Desktop Menu Items */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Desktop Menu Items - Always visible */}
          <div className="flex flex-row gap-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.key}
                onClick={() => handleNavClick(item.value)}
                className="px-4 py-2 text-sm font-medium text-white hover:text-cyan-300 rounded-xl transition-all duration-300 hover:bg-purple-500/20 border border-transparent hover:border-purple-400/50 uppercase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Profile Button */}
          {userEmail && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="h-10 w-10 border-2 border-white/30 hover:border-white/50 transition-all duration-300 cursor-pointer">
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-bold text-lg">
                      {userEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-gradient-to-r from-slate-800/95 via-purple-800/90 to-slate-800/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20"
              >
                <div className="px-3 py-3 border-b border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <p className="text-sm text-cyan-300 font-medium truncate">{userEmail}</p>
                </div>
                <DropdownMenuItem
                  onClick={() => navigate("/profiles")}
                  className="text-white hover:text-cyan-300 cursor-pointer hover:bg-purple-500/20 transition-all duration-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Exit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher />
          
          {userEmail && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button className="relative" whileTap={{ scale: 0.95 }}>
                  <Avatar className="h-8 w-8 border-2 border-white/30">
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-bold text-sm">
                      {userEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-slate-800/95 backdrop-blur-xl border border-purple-500/30"
              >
                <div className="px-3 py-2 border-b border-purple-500/20">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-cyan-300 font-medium truncate">{userEmail}</p>
                </div>
                <DropdownMenuItem
                  onClick={() => navigate("/profiles")}
                  className="text-white hover:text-cyan-300 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Exit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-transparent text-white rounded-xl border border-white/30"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.value)}
                    className="w-full text-left px-4 py-3 text-white hover:text-cyan-300 hover:bg-white/5 rounded-xl transition-all duration-200 text-base font-medium uppercase"
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
