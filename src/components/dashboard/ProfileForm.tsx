import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { getUserProfile, updateUserProfile, getUserByUsername } from '@/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Globe, FileText, Layout, Save, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StackSelector } from '@/components/ui/stack-selector';

interface ProfileFormProps {
    user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [projectIntro, setProjectIntro] = useState('');
    const [stacks, setStacks] = useState<string[]>([]);
    const [theme, setTheme] = useState('dark'); // 'dark', 'light', 'custom'
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.uid) {
                const profile = await getUserProfile(user.uid);
                if (profile) {
                    setUsername(profile.username || '');
                    setBio(profile.bio || '');
                    setProjectIntro(profile.projectIntro || '');
                    setStacks(profile.stacks || []);
                    setTheme(profile.theme || 'dark');
                }
            }
            setIsLoading(false);
        };
        fetchProfile();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsSaving(true);

        try {
            const currentProfile = await getUserProfile(user.uid);
            if (username !== currentProfile?.username) {
                const existingUser = await getUserByUsername(username);
                if (existingUser) {
                    setError(t('profile.msg_username_taken'));
                    setIsSaving(false);
                    return;
                }
            }

            await updateUserProfile(user.uid, {
                username,
                bio,
                projectIntro,
                stacks,
                theme,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(t('profile.msg_update_fail'));
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="glass-panel border-none shadow-xl overflow-hidden">
                <CardHeader className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <UserIcon className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                            {t('profile.title')}
                        </CardTitle>
                    </div>
                    <CardDescription>{t('profile.desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="username" className="text-sm font-semibold flex items-center gap-2 ml-1">
                                <Globe className="w-4 h-4 text-purple-500" />
                                {t('profile.username')}
                            </Label>
                            <div className="flex items-center gap-0 group">
                                <div className="h-11 px-4 flex items-center bg-gray-100 dark:bg-gray-800 border border-r-0 rounded-l-xl text-xs font-medium text-muted-foreground transition-colors group-focus-within:border-purple-500/50">
                                    dev-link.web.app/
                                </div>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="username"
                                    pattern="[a-zA-Z0-9_-]+"
                                    title="Alphanumeric characters, underscores, and dashes only."
                                    required
                                    className="rounded-l-none bg-white/50 dark:bg-gray-950/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="bio" className="text-sm font-semibold flex items-center gap-2 ml-1">
                                <FileText className="w-4 h-4 text-purple-500" />
                                {t('profile.bio')}
                            </Label>
                            <Input
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder={t('profile.placeholder_bio')}
                                className="bg-white/50 dark:bg-gray-950/50 h-11"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="projectIntro" className="text-sm font-semibold flex items-center gap-2 ml-1">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                {t('profile.project_intro')}
                            </Label>
                            <Input
                                id="projectIntro"
                                value={projectIntro}
                                onChange={(e) => setProjectIntro(e.target.value)}
                                placeholder={t('profile.placeholder_project_intro')}
                                className="bg-white/50 dark:bg-gray-950/50 h-11"
                            />
                        </div>

                        <div className="space-y-3">
                            <StackSelector
                                selectedStacks={stacks}
                                onChange={setStacks}
                                label={t('profile.tech_stack')}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="theme" className="text-sm font-semibold flex items-center gap-2 ml-1">
                                <Layout className="w-4 h-4 text-purple-500" />
                                {t('profile.theme')}
                            </Label>
                            <select
                                id="theme"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="flex h-11 w-full rounded-xl border border-input bg-white/50 dark:bg-gray-950/50 px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                            >
                                <option value="dark">{t('profile.theme_dark')}</option>
                                <option value="light">{t('profile.theme_light')}</option>
                            </select>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-lg"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-500/10 p-3 rounded-lg"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    {t('profile.msg_update_success')}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]"
                        >
                            {isSaving ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>{t('common.saving')}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    <span>{t('common.save')}</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
