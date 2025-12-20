import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="w-full py-8 mt-16 border-t border-white/10 bg-black/20 backdrop-blur-sm text-gray-400">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-bold text-lg text-white">Dev-Link</span>
                    <p className="text-sm mt-1">{t('common.footer')}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <Link to="/guide" className="hover:text-purple-400 transition-colors">{t('footer.guide')}</Link>
                    <Link to="/privacy" className="hover:text-purple-400 transition-colors">{t('footer.privacy')}</Link>
                    <Link to="/terms" className="hover:text-purple-400 transition-colors">{t('footer.terms')}</Link>
                </div>

                <div className="flex gap-4">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
