import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Resume = () => {
  const { t } = useLanguage();
  return (
    <section id="resume" className="py-12 sm:py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{t('resume.title')}</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-xl sm:max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-card/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-border dark:border-white/10 text-center shadow-sm dark:shadow-none">
            <div className="mb-4 sm:mb-6">
              <FileText size={48} className="mx-auto text-blue-500 dark:text-blue-400 mb-3 sm:mb-4 sm:w-16 sm:h-16" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{t('resume.downloadTitle')}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{t('resume.description')}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a href="https://docs.google.com/document/d/1o5pxJWwWCvjAiMuzTyx01YDCdMtq7DUyhNPZR_kGzug/export?format=pdf" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm sm:text-base text-white">
                <Download size={18} className="sm:w-5 sm:h-5" />
                <span>{t('resume.download')}</span>
              </motion.a>
              <motion.a href="https://docs.google.com/document/d/1o5pxJWwWCvjAiMuzTyx01YDCdMtq7DUyhNPZR_kGzug/edit?usp=drive_link" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-border dark:border-gray-400 rounded-full font-semibold hover:bg-primary/5 dark:hover:bg-white/10 transition-all duration-300 text-sm sm:text-base text-foreground">
                <Eye size={18} className="sm:w-5 sm:h-5" />
                <span>{t('resume.preview')}</span>
              </motion.a>
            </div>

            <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
              <p>{t('resume.lastUpdated')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
