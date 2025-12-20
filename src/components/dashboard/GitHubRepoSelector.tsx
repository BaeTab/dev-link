import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { getUserProfile } from '@/firebase';
import { fetchUserRepos, mapRepoToLink, type GitHubRepo } from '@/services/github';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Star, Loader2, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GitHubRepoSelectorProps {
    user: User;
    onAddLinks: (links: { title: string; url: string; description: string; stacks: string[]; order: number }[]) => Promise<void>;
    currentLinksCount: number;
}

export default function GitHubRepoSelector({ user, onAddLinks, currentLinksCount }: GitHubRepoSelectorProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadRepos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const profile = await getUserProfile(user.uid);
            const accessToken = profile?.githubAccessToken;

            if (!accessToken) {
                setError(t('github.relogin'));
                return;
            }

            const fetchedRepos = await fetchUserRepos(accessToken);
            setRepos(fetchedRepos);
        } catch (err) {
            console.error('Failed to fetch repos:', err);
            setError(t('github.error'));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && repos.length === 0) {
            loadRepos();
        }
    }, [isOpen]);

    const toggleRepo = (repoId: number) => {
        const newSelected = new Set(selectedRepos);
        if (newSelected.has(repoId)) {
            newSelected.delete(repoId);
        } else {
            newSelected.add(repoId);
        }
        setSelectedRepos(newSelected);
    };

    const handleAddSelected = async () => {
        if (selectedRepos.size === 0) return;

        setIsAdding(true);
        try {
            const linksToAdd = repos
                .filter(repo => selectedRepos.has(repo.id))
                .map((repo, idx) => mapRepoToLink(repo, currentLinksCount + idx));

            await onAddLinks(linksToAdd);
            setSelectedRepos(new Set());
            setIsOpen(false);
        } catch (err) {
            console.error('Failed to add links:', err);
        } finally {
            setIsAdding(false);
        }
    };

    if (!isOpen) {
        return (
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="w-full mb-4 border-dashed border-2 hover:border-purple-500/50 hover:bg-purple-500/5"
            >
                <Github className="w-4 h-4 mr-2" />
                {t('github.import_button')}
            </Button>
        );
    }

    return (
        <Card className="mb-4 border-purple-500/20">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        {t('github.select_repos')}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                        {t('github.cancel')}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                        <span className="ml-2 text-muted-foreground">{t('github.loading')}</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-8 text-red-500">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                ) : repos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        {t('github.no_repos')}
                    </div>
                ) : (
                    <>
                        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                            <AnimatePresence>
                                {repos.map((repo) => (
                                    <motion.div
                                        key={repo.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`
                                            p-3 rounded-lg border cursor-pointer transition-all
                                            ${selectedRepos.has(repo.id)
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-purple-500/50'
                                            }
                                        `}
                                        onClick={() => toggleRepo(repo.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium truncate">{repo.name}</h4>
                                                    {repo.language && (
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                </div>
                                                {repo.description && (
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                        {repo.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-3 h-3" />
                                                        {repo.stargazers_count}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`
                                                w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3
                                                ${selectedRepos.has(repo.id)
                                                    ? 'bg-purple-500 border-purple-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                                }
                                            `}>
                                                {selectedRepos.has(repo.id) && (
                                                    <Check className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={handleAddSelected}
                                disabled={selectedRepos.size === 0 || isAdding}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {isAdding ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : null}
                                {t('github.add_selected')} ({selectedRepos.size})
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
