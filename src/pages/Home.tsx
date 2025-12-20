import { loginWithGithub } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import { Github, Zap, Shield, Code2, Share2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = async () => {
        try {
            const user = await loginWithGithub();
            if (user) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const features = [
        {
            icon: <Code2 className="w-8 h-8 text-blue-400" />,
            title: t('landing.feature_1_title'),
            desc: t('landing.feature_1_desc'),
        },
        {
            icon: <Zap className="w-8 h-8 text-purple-400" />,
            title: t('landing.feature_2_title'),
            desc: t('landing.feature_2_desc'),
        },
        {
            icon: <Shield className="w-8 h-8 text-green-400" />,
            title: t('landing.feature_3_title'),
            desc: t('landing.feature_3_desc'),
        },
    ];

    const steps = [
        {
            icon: <Github className="w-6 h-6" />,
            title: t('landing.step_1'),
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: t('landing.step_2'),
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            title: t('landing.step_3'),
        },
    ];

    return (
        <div className="min-h-screen bg-[#0f1115] text-white selection:bg-purple-500/30 font-sans">
            <SEO />
            <LanguageToggle />
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[100px] animate-blob" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Hero Section */}
                <main className="flex-grow flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl space-y-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {t('landing.hero_title')}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            {t('landing.hero_desc')}
                        </p>

                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={handleLogin}
                                className="bg-white text-black hover:bg-gray-200 rounded-full h-12 px-8 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                {t('landing.get_started')}
                            </Button>
                        </div>
                    </motion.div>
                </main>

                {/* Features Section */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            {t('landing.features_title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                >
                                    <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-20 px-4 bg-black/20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">{t('landing.how_it_works')}</h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                                        {step.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-purple-400 font-mono">Step 0{idx + 1}</p>
                                        <h3 className="font-semibold text-lg">{step.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Rich Content for AdSense */}
                <section className="py-20 px-4">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold text-center mb-12">{t('landing.faq_title')}</h2>

                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-lg font-bold mb-2">{t('landing.faq_1_q')}</h3>
                                <p className="text-gray-400">{t('landing.faq_1_a')}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-lg font-bold mb-2">{t('landing.faq_2_q')}</h3>
                                <p className="text-gray-400">{t('landing.faq_2_a')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
