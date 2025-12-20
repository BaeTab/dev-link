import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { getUserProfile, updateUserProfile, getUserByUsername } from '@/firebase';

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
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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
        setSuccess(null);
        setIsLoading(true);

        try {
            // Check username uniqueness if changed
            const currentProfile = await getUserProfile(user.uid);
            if (username !== currentProfile?.username) {
                const existingUser = await getUserByUsername(username);
                if (existingUser) {
                    setError(t('profile.msg_username_taken'));
                    setIsLoading(false);
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
            setSuccess(t('profile.msg_update_success'));
        } catch (err) {
            setError(t('profile.msg_update_fail'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('profile.title')}</CardTitle>
                <CardDescription>{t('profile.desc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">{t('profile.username')}</Label>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">devlink.web.app/</span>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                                pattern="[a-zA-Z0-9_-]+"
                                title="Alphanumeric characters, underscores, and dashes only."
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">{t('profile.bio')}</Label>
                        <Input
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder={t('profile.placeholder_bio')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="projectIntro">{t('profile.project_intro')}</Label>
                        <Input
                            id="projectIntro"
                            value={projectIntro}
                            onChange={(e) => setProjectIntro(e.target.value)}
                            placeholder={t('profile.placeholder_project_intro')}
                        />
                    </div>

                    <div className="space-y-2">
                        <StackSelector
                            selectedStacks={stacks}
                            onChange={setStacks}
                            label={t('profile.tech_stack')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="theme">{t('profile.theme')}</Label>
                        <select
                            id="theme"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="dark">{t('profile.theme_dark')}</option>
                            <option value="light">{t('profile.theme_light')}</option>
                            {/* Future: Custom themes */}
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? t('common.saving') : t('common.save')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
