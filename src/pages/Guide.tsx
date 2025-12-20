import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import { Github, Edit3, Link as LinkIcon } from 'lucide-react';

export default function Guide() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#0f1115] text-white font-sans flex flex-col">
            <SEO title="User Guide | Dev-Link" />

            <div className="flex-grow max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-4">{t('guide.title')}</h1>
                <p className="text-xl text-gray-400 mb-12">{t('guide.intro')}</p>

                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shrink-0">
                            <Github className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-purple-300">{t('guide.step_1_title')}</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{t('guide.step_1_desc')}</p>
                            <div className="mt-4 p-4 bg-black/30 rounded-lg text-sm font-mono text-gray-400">
                                Tip: You need a GitHub account to verify your developer identity.
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shrink-0">
                            <Edit3 className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-blue-300">{t('guide.step_2_title')}</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{t('guide.step_2_desc')}</p>
                            <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1 ml-2">
                                <li>Set a unique username (dev-link.web.app/yourname)</li>
                                <li>Write a short bio</li>
                                <li>Select "Dark" or "Light" theme</li>
                                <li>Add "My Tech Stack" to show off your skills</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 shrink-0">
                            <LinkIcon className="w-8 h-8 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-green-300">{t('guide.step_3_title')}</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{t('guide.step_3_desc')}</p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 rounded">
                                    <span className="block font-semibold text-white mb-1">Title & URL</span>
                                    <span className="text-xs text-gray-500">e.g., "My Portfolio"</span>
                                </div>
                                <div className="p-3 bg-white/5 border border-white/10 rounded">
                                    <span className="block font-semibold text-white mb-1">Description</span>
                                    <span className="text-xs text-gray-500">Short intro about the project</span>
                                </div>
                                <div className="p-3 bg-white/5 border border-white/10 rounded col-span-full">
                                    <span className="block font-semibold text-white mb-1">Tech Stacks</span>
                                    <span className="text-xs text-gray-500">Select stack badges for each link!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
