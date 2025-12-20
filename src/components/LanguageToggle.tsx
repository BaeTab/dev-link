import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ko' ? 'en' : 'ko';
        i18n.changeLanguage(newLang);
        localStorage.setItem('lang', newLang);
    };

    const currentLang = i18n.language === 'ko' ? 'EN' : '한국어';

    return (
        <motion.button
            onClick={toggleLanguage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/80 hover:bg-black/90 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-700 dark:border-white/20 backdrop-blur-xl text-white text-sm font-semibold transition-colors duration-300 shadow-xl cursor-pointer"
            aria-label="Toggle Language"
        >
            <Globe className="w-4 h-4 text-purple-400" />
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentLang}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="min-w-[50px] text-center"
                >
                    {currentLang}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    );
}
