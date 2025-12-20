import { useEffect, useState } from 'react';
import { auth, logout } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LanguageToggle from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileForm from '@/components/dashboard/ProfileForm';
import LinksManager from '@/components/dashboard/LinksManager';
import { LogOut, ExternalLink } from 'lucide-react';
import { getUserProfile } from '@/firebase';

export default function Dashboard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (!u) {
                navigate('/');
            } else {
                setUser(u);
                const profile = await getUserProfile(u.uid);
                if (profile?.username) {
                    setUsername(profile.username);
                }
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">{t('common.loading')}</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <SEO title={t('dashboard.title')} />
            <LanguageToggle />

            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
                        <p className="text-muted-foreground">{t('dashboard.welcome', { name: user.displayName })}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {username && (
                            <Button variant="outline" onClick={() => {
                                window.open(`/${username}`, '_blank');
                                window.open('https://deg.kr/799c1ba', '_blank');
                            }}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {t('common.view_page')}
                            </Button>
                        )}
                        <Button variant="destructive" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            {t('common.logout')}
                        </Button>
                    </div>
                </header>

                <main>
                    <Tabs defaultValue="links" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="links">{t('dashboard.tab_links')}</TabsTrigger>
                            <TabsTrigger value="profile">{t('dashboard.tab_profile')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="links">
                            <LinksManager user={user} />
                        </TabsContent>
                        <TabsContent value="profile">
                            <ProfileForm user={user} />
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}
