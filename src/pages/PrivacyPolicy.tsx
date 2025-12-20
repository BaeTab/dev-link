import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#0f1115] text-white font-sans flex flex-col">
            <SEO title="Privacy Policy | Dev-Link" />
            <div className="flex-grow max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8">{t('legal.privacy_title')}</h1>
                <p className="mb-4 text-gray-400">{t('legal.last_updated')}</p>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, specifically your GitHub username, display name, profile photo, and email address. We also store the links and profile information you voluntarily add to your profile.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, specifically to display your public developer profile. We do not sell your personal data.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Cookies</h2>
                        <p>We use local storage and standard firebase authentication tokens to maintain your session. We may use third-party analytics tools (like Google Analytics) which may use cookies to help us understand how our service is being used.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
