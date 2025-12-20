import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

export default function TermsOfService() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#0f1115] text-white font-sans flex flex-col">
            <SEO title="Terms of Service | Dev-Link" />
            <div className="flex-grow max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8">{t('legal.terms_title')}</h1>
                <p className="mb-4 text-gray-400">{t('legal.last_updated')}</p>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing or using Dev-Link, you agree to be bound by these Terms of Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. User Conduct</h2>
                        <p>You are solely responsible for the content you post on Dev-Link. You agree not to use the service for any illegal or unauthorized purpose.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Termination</h2>
                        <p>We reserve the right to terminate or suspend your account at any time without notice if you violate these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Disclaimer</h2>
                        <p>The service is provided "as is" without warranties of any kind.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
