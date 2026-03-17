import { motion } from "framer-motion";

const MovingLogos = () => {
  const logos = [
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 sm:py-16 md:py-20 overflow-hidden relative z-10">
      <div className="container mx-auto px-4 mb-10 sm:mb-12 md:mb-16">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Technologies I Work With</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div className="flex gap-8 sm:gap-12 md:gap-16 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}>
            {duplicatedLogos.map((logo, index) => (
              <motion.div key={`${logo.name}-${index}`} className="flex-shrink-0 group" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-card/60 dark:bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border dark:border-white/10 flex items-center justify-center group-hover:bg-card dark:group-hover:bg-white/10 transition-colors duration-300 shadow-sm dark:shadow-none">
                  <img src={logo.url} alt={logo.name} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain dark:filter dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 transition-all duration-300" />
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 sm:mt-2 text-center group-hover:text-foreground transition-colors duration-300">{logo.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MovingLogos;
