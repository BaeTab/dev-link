import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { subscribeToLinks, addLink, deleteLink, updateLink } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GripVertical, Trash2, Plus, Pencil, X, Check, ChevronUp, Link as LinkIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { StackSelector } from '@/components/ui/stack-selector';
import GitHubRepoSelector from '@/components/dashboard/GitHubRepoSelector';

interface Link {
    id: string;
    title: string;
    url: string;
    description?: string;
    stacks?: string[];
    order: number;
}

interface LinksManagerProps {
    user: User;
}

export default function LinksManager({ user }: LinksManagerProps) {
    const { t } = useTranslation();
    const [links, setLinks] = useState<Link[]>([]);
    const [newLinkTitle, setNewLinkTitle] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const [newLinkDesc, setNewLinkDesc] = useState('');
    const [newLinkStacks, setNewLinkStacks] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editUrl, setEditUrl] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editStacks, setEditStacks] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user?.uid) {
            const unsubscribe = subscribeToLinks(user.uid, (data) => {
                setLinks(data as Link[]);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLinkTitle || !newLinkUrl) return;

        setIsAdding(true);
        try {
            await addLink(user.uid, {
                title: newLinkTitle,
                url: newLinkUrl,
                description: newLinkDesc,
                stacks: newLinkStacks,
                order: links.length
            });
            setNewLinkTitle('');
            setNewLinkUrl('');
            setNewLinkDesc('');
            setNewLinkStacks([]);
        } catch (error) {
            console.error("Error adding link:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm(t('common.confirm_delete'))) {
            await deleteLink(user.uid, id);
            if (editingId === id) {
                setEditingId(null);
            }
        }
    };

    // Handle bulk adding links from GitHub repos
    const handleBulkAddLinks = async (linksToAdd: { title: string; url: string; description: string; stacks: string[]; order: number }[]) => {
        for (const linkData of linksToAdd) {
            await addLink(user.uid, linkData);
        }
    };

    // Start editing a link
    const startEditing = (link: Link) => {
        if (editingId === link.id) {
            // Toggle off if already editing
            setEditingId(null);
            return;
        }
        setEditingId(link.id);
        setEditTitle(link.title);
        setEditUrl(link.url);
        setEditDesc(link.description || '');
        setEditStacks(link.stacks || []);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingId(null);
    };

    // Save edited link
    const saveEdit = async () => {
        if (!editingId || !editTitle || !editUrl) return;

        setIsSaving(true);
        try {
            await updateLink(user.uid, editingId, {
                title: editTitle,
                url: editUrl,
                description: editDesc,
                stacks: editStacks,
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating link:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="glass-panel overflow-hidden border-none shadow-xl">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                <LinkIcon className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                                {t('links.title')}
                            </CardTitle>
                        </div>
                        <CardDescription>{t('links.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <GitHubRepoSelector
                            user={user}
                            onAddLinks={handleBulkAddLinks}
                            currentLinksCount={links.length}
                        />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground font-medium">
                                    {t('common.or')}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleAddLink} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-semibold ml-1">
                                        {t('links.label_title')}
                                    </Label>
                                    <Input
                                        id="title"
                                        value={newLinkTitle}
                                        onChange={(e) => setNewLinkTitle(e.target.value)}
                                        placeholder={t('links.placeholder_title')}
                                        required
                                        className="bg-white/50 dark:bg-gray-950/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="url" className="text-sm font-semibold ml-1">
                                        {t('links.label_url')}
                                    </Label>
                                    <Input
                                        id="url"
                                        value={newLinkUrl}
                                        onChange={(e) => setNewLinkUrl(e.target.value)}
                                        placeholder={t('links.placeholder_url')}
                                        type="url"
                                        required
                                        className="bg-white/50 dark:bg-gray-950/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="desc" className="text-sm font-semibold ml-1">
                                    {t('links.label_description')}
                                </Label>
                                <Input
                                    id="desc"
                                    value={newLinkDesc}
                                    onChange={(e) => setNewLinkDesc(e.target.value)}
                                    placeholder={t('links.placeholder_description')}
                                    className="bg-white/50 dark:bg-gray-950/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <StackSelector
                                    selectedStacks={newLinkStacks}
                                    onChange={setNewLinkStacks}
                                    label={t('links.label_stack')}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isAdding}
                                className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]"
                            >
                                {isAdding ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t('common.adding')}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        <span>{t('common.add')}</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        {t('links.my_links')}
                        <span className="text-xs font-normal text-muted-foreground ml-1">
                            ({links.length})
                        </span>
                    </h3>
                </div>

                <AnimatePresence mode="popLayout">
                    {links.map((link, index) => (
                        <motion.div
                            key={link.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <div
                                className={`
                                    group glass-panel rounded-2xl transition-all duration-300 overflow-hidden
                                    ${editingId === link.id ? 'ring-2 ring-purple-500 shadow-xl shadow-purple-500/10' : 'hover:shadow-md hover:translate-y-[-2px]'}
                                `}
                            >
                                <div
                                    className="flex items-center gap-4 p-5 cursor-pointer"
                                    onClick={() => startEditing(link)}
                                >
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-purple-500 transition-colors">
                                        <GripVertical className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="font-bold truncate text-gray-900 dark:text-gray-100">{link.title}</h4>
                                            {link.stacks && link.stacks.length > 0 && (
                                                <div className="flex gap-1 overflow-hidden">
                                                    {link.stacks.slice(0, 3).map(stack => (
                                                        <span key={stack} className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate font-mono opacity-80">{link.url}</p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-purple-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                startEditing(link);
                                            }}
                                        >
                                            {editingId === link.id ? <ChevronUp className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(link.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {editingId === link.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-t border-gray-100 dark:border-gray-800 p-6 bg-gray-50/50 dark:bg-gray-900/50 space-y-5">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-semibold ml-1">{t('links.label_title')}</Label>
                                                        <Input
                                                            value={editTitle}
                                                            onChange={(e) => setEditTitle(e.target.value)}
                                                            placeholder={t('links.placeholder_title')}
                                                            className="bg-white dark:bg-gray-950"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-semibold ml-1">{t('links.label_url')}</Label>
                                                        <Input
                                                            value={editUrl}
                                                            onChange={(e) => setEditUrl(e.target.value)}
                                                            placeholder={t('links.placeholder_url')}
                                                            type="url"
                                                            className="bg-white dark:bg-gray-950"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-sm font-semibold ml-1">{t('links.label_description')}</Label>
                                                    <Input
                                                        value={editDesc}
                                                        onChange={(e) => setEditDesc(e.target.value)}
                                                        placeholder={t('links.placeholder_description')}
                                                        className="bg-white dark:bg-gray-950"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <StackSelector
                                                        selectedStacks={editStacks}
                                                        onChange={setEditStacks}
                                                        label={t('links.label_stack')}
                                                    />
                                                </div>

                                                <div className="flex justify-end gap-3 pt-4">
                                                    <Button variant="outline" size="sm" onClick={cancelEditing} className="h-10 rounded-xl px-4">
                                                        <X className="w-4 h-4 mr-2" />
                                                        {t('github.cancel')}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={saveEdit}
                                                        disabled={isSaving || !editTitle || !editUrl}
                                                        className="h-10 rounded-xl px-6 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                                                    >
                                                        {isSaving ? (
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Check className="w-4 h-4 mr-2" />
                                                                {t('common.save')}
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                    {links.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800"
                        >
                            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-fit mx-auto mb-4">
                                <LinkIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">{t('links.empty')}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
