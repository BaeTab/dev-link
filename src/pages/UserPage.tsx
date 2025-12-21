import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserByUsername, subscribeToLinks } from '@/firebase';
import { getBadgeUrl, getStack } from '@/lib/stacks';
import SEO from '@/components/SEO';
import LanguageToggle from '@/components/LanguageToggle';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Sparkles, Share2, X, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserProfile {
    uid: string;
    username: string;
    bio?: string;
    projectIntro?: string;
    stacks?: string[];
    theme?: string;
    displayName?: string;
    photoURL?: string;
}

interface Link {
    id: string;
    title: string;
    url: string;
    description?: string;
    stacks?: string[];
    order: number;
}

export default function UserPage() {
    const { t } = useTranslation();
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Share Modal
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const profileUrl = window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!username) return;

            try {
                const userData = await getUserByUsername(username);
                if (userData) {
                    setProfile(userData as UserProfile);
                    const unsubscribe = subscribeToLinks(userData.uid, (data) => {
                        setLinks(data as Link[]);
                    });
                    setIsLoading(false);
                    return () => unsubscribe();
                } else {
                    setUserNotFound(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
                setUserNotFound(true);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (userNotFound) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white gap-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {t('user_page.not_found_title')}
                    </h1>
                    <p className="text-gray-400 text-lg">{t('user_page.not_found_desc')}</p>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="mt-4 border-purple-500/50 hover:bg-purple-500/10"
                    >
                        {t('user_page.create_own')}
                    </Button>
                </motion.div>
            </div>
        );
    }



    const isLightMode = profile?.theme === 'light';

    return (
        <div className={`min-h-screen ${isLightMode ? 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50' : 'bg-[#0a0a0f]'} selection:bg-purple-500/30 overflow-x-hidden`}>

            {/* Premium Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Gradient Orbs */}
                <div className={`absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full blur-[120px] ${isLightMode ? 'bg-purple-200/60' : 'bg-purple-900/30'} animate-blob`} />
                <div className={`absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full blur-[120px] ${isLightMode ? 'bg-blue-200/60' : 'bg-blue-900/20'} animate-blob animation-delay-2000`} />
                <div className={`absolute -bottom-[30%] left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] ${isLightMode ? 'bg-pink-200/40' : 'bg-pink-900/20'} animate-blob animation-delay-4000`} />

                {/* Grid Pattern Overlay */}
                <div
                    className={`absolute inset-0 ${isLightMode ? 'opacity-[0.015]' : 'opacity-[0.03]'}`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Noise Texture */}
                <div className={`absolute inset-0 ${isLightMode ? 'opacity-[0.02]' : 'opacity-[0.015]'}`} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            </div>

            <SEO
                title={`${profile?.displayName || profile?.username} | Dev-Link`}
                description={profile?.bio || `Check out ${profile?.username}'s links on Dev-Link.`}
                image={profile?.photoURL}
                url={`/${profile?.username}`}
            />
            <LanguageToggle />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-20 lg:py-24 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">

                {/* Profile Card Container - Sticky on Desktop */}
                <div className="w-full lg:w-[400px] lg:shrink-0 lg:sticky lg:top-24 perspective-1000">
                    <motion.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={`
                            relative w-full p-8 md:p-10 rounded-[2rem] border overflow-hidden
                            ${isLightMode
                                ? 'bg-white/70 border-white shadow-[0_20px_70px_-15px_rgba(139,92,246,0.15)]'
                                : 'bg-white/[0.03] border-white/[0.08] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)]'
                            }
                            backdrop-blur-2xl
                        `}
                    >
                        {/* Share Button */}
                        <motion.button
                            onClick={() => setShowShareModal(true)}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className={`absolute top-4 right-4 p-2 rounded-full ${isLightMode ? 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'} transition-colors z-20`}
                        >
                            <Share2 className="w-5 h-5" />
                        </motion.button>

                        {/* Subtle Glow Effect */}
                        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${isLightMode ? 'bg-purple-300/30' : 'bg-purple-500/10'} pointer-events-none`} />
                        <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl ${isLightMode ? 'bg-blue-300/30' : 'bg-blue-500/10'} pointer-events-none`} />

                        <div className="relative flex flex-col items-center text-center space-y-6 transform-style-3d">

                            {/* Avatar with Ring */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="relative group translate-z-20"
                                style={{ transform: "translateZ(20px)" }}
                            >
                                <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500`} />
                                <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-40 animate-pulse`} />
                                <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ${isLightMode ? 'ring-white' : 'ring-black/50'}`}>
                                    <img
                                        src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.username}&background=8b5cf6&color=fff&size=256`}
                                        alt={profile?.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Name & Username */}
                            <div className="space-y-1 translate-z-10" style={{ transform: "translateZ(10px)" }}>
                                <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                                    {profile?.displayName || profile?.username}
                                </h1>
                                <p className={`text-base font-medium ${isLightMode ? 'text-purple-600' : 'text-purple-400'}`}>
                                    @{profile?.username}
                                </p>
                            </div>

                            {/* Project Intro Badge */}
                            {profile?.projectIntro && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`
                                    inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
                                    ${isLightMode
                                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200/50'
                                            : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/20'
                                        }
                                `}
                                    style={{ transform: "translateZ(15px)" }}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {profile.projectIntro}
                                </motion.div>
                            )}

                            {/* Tech Stacks */}
                            {profile?.stacks && profile.stacks.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-wrap justify-center gap-2 max-w-md transform-style-3d"
                                    style={{ transform: "translateZ(25px)" }}
                                >
                                    {profile.stacks.map((stackValue, idx) => {
                                        const stack = getStack(stackValue);
                                        return (
                                            <motion.img
                                                key={stack.value}
                                                src={getBadgeUrl(stack)}
                                                alt={stack.label}
                                                className="h-6 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + idx * 0.05 }}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                            />
                                        );
                                    })}
                                </motion.div>
                            )}

                            {/* Bio */}
                            {profile?.bio && (
                                <p className={`max-w-sm text-base leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`} style={{ transform: "translateZ(5px)" }}>
                                    {profile.bio}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column (Links + Footer) */}
                <div className="flex-1 w-full min-w-0 flex flex-col gap-6 lg:gap-8">

                    {/* Links Section */}
                    <AnimatePresence>
                        {links.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {links.map((link, idx) => (
                                    <motion.a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + idx * 0.05, duration: 0.4 }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`
                                        group relative flex items-center justify-between p-5 rounded-2xl border overflow-hidden
                                        ${isLightMode
                                                ? 'bg-white/80 border-gray-200/80 hover:border-purple-300 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.2)]'
                                                : 'bg-white/[0.03] border-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)]'
                                            }
                                        backdrop-blur-xl transition-all duration-300
                                    `}
                                    >
                                        {/* Hover Shine Effect */}
                                        <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent ${isLightMode ? 'via-purple-100/50' : 'via-white/[0.03]'} to-transparent pointer-events-none`} />

                                        <div className="flex-1 min-w-0 pr-4">
                                            <h3 className={`font-semibold text-lg truncate ${isLightMode ? 'text-gray-900 group-hover:text-purple-600' : 'text-white group-hover:text-purple-300'} transition-colors`}>
                                                {link.title}
                                            </h3>
                                            {link.description && (
                                                <p className={`text-sm mt-1 line-clamp-1 ${isLightMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    {link.description}
                                                </p>
                                            )}
                                            {link.stacks && link.stacks.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {link.stacks.slice(0, 5).map(stackValue => {
                                                        const stack = getStack(stackValue);
                                                        return (
                                                            <img
                                                                key={stack.value}
                                                                src={getBadgeUrl(stack)}
                                                                alt={stack.label}
                                                                className="h-4 rounded-sm opacity-70 group-hover:opacity-100 transition-opacity"
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div className={`flex-shrink-0 p-2 rounded-full ${isLightMode ? 'bg-gray-100 group-hover:bg-purple-100' : 'bg-white/5 group-hover:bg-purple-500/20'} transition-colors`}>
                                            <ExternalLink className={`w-5 h-5 ${isLightMode ? 'text-gray-400 group-hover:text-purple-600' : 'text-gray-500 group-hover:text-purple-400'} transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {links.length === 0 && (
                        <div className={`text-center py-12 ${isLightMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {t('user_page.no_links')}
                        </div>
                    )}

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className={`mt-16 text-sm ${isLightMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        <a href="/" className="hover:text-purple-500 transition-colors">{t('common.footer')}</a>
                    </motion.footer>
                </div>
            </div>

            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowShareModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`
                                relative w-full max-w-sm rounded-3xl p-6 shadow-2xl
                                ${isLightMode ? 'bg-white' : 'bg-[#1a1a23] border border-white/10'}
                            `}
                        >
                            <button
                                onClick={() => setShowShareModal(false)}
                                className={`absolute top-4 right-4 p-1 rounded-full ${isLightMode ? 'hover:bg-gray-100' : 'hover:bg-white/10'} transition-colors`}
                            >
                                <X className={`w-5 h-5 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </button>

                            <div className="text-center space-y-6">
                                <div className="space-y-1">
                                    <h3 className={`text-xl font-bold ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Share Profile</h3>
                                    <p className={`text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Share {profile?.username}'s Dev-Link</p>
                                </div>

                                <div className="flex justify-center p-4 bg-white rounded-2xl mx-auto w-max">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}&color=000000`}
                                        alt="QR Code"
                                        className="w-40 h-40"
                                    />
                                </div>

                                <div className={`flex items-center gap-2 p-2 rounded-xl border ${isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-black/20 border-white/10'}`}>
                                    <p className={`flex-1 text-xs truncate px-2 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {profileUrl}
                                    </p>
                                    <Button
                                        size="sm"
                                        onClick={copyToClipboard}
                                        className={`${copied ? 'bg-green-500 hover:bg-green-600' : ''} transition-colors min-w-[80px]`}
                                    >
                                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
