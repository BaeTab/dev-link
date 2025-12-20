import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { subscribeToLinks, addLink, deleteLink, updateLink } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GripVertical, Trash2, Plus, Pencil, X, Check, ChevronUp } from 'lucide-react';

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
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('links.title')}</CardTitle>
                    <CardDescription>{t('links.desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <GitHubRepoSelector
                        user={user}
                        onAddLinks={handleBulkAddLinks}
                        currentLinksCount={links.length}
                    />
                    <form onSubmit={handleAddLink} className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">{t('links.label_title')}</Label>
                                <Input
                                    id="title"
                                    value={newLinkTitle}
                                    onChange={(e) => setNewLinkTitle(e.target.value)}
                                    placeholder={t('links.placeholder_title')}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="url">{t('links.label_url')}</Label>
                                <Input
                                    id="url"
                                    value={newLinkUrl}
                                    onChange={(e) => setNewLinkUrl(e.target.value)}
                                    placeholder={t('links.placeholder_url')}
                                    type="url"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">{t('links.label_description')}</Label>
                            <Input
                                id="desc"
                                value={newLinkDesc}
                                onChange={(e) => setNewLinkDesc(e.target.value)}
                                placeholder={t('links.placeholder_description')}
                            />
                        </div>

                        <div className="space-y-2">
                            <StackSelector
                                selectedStacks={newLinkStacks}
                                onChange={setNewLinkStacks}
                                label={t('links.label_stack')}
                            />
                        </div>

                        <Button type="submit" disabled={isAdding} className="w-full md:w-auto md:self-end">
                            <Plus className="w-4 h-4 mr-2" /> {t('common.add')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-3">
                {links.map((link) => (
                    <div
                        key={link.id}
                        className={`
                            bg-white dark:bg-gray-800 border rounded-lg shadow-sm overflow-hidden transition-all
                            ${editingId === link.id ? 'ring-2 ring-purple-500' : ''}
                        `}
                    >
                        {/* Link Header - Always visible */}
                        <div
                            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            onClick={() => startEditing(link)}
                        >
                            <GripVertical className="text-gray-400 cursor-move flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold truncate">{link.title}</h4>
                                <p className="text-sm text-gray-500 truncate">{link.url}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startEditing(link);
                                    }}
                                >
                                    {editingId === link.id ? (
                                        <ChevronUp className="w-4 h-4 text-gray-500" />
                                    ) : (
                                        <Pencil className="w-4 h-4 text-gray-500" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(link.id);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        </div>

                        {/* Edit Form - Collapsible */}
                        {editingId === link.id && (
                            <div className="border-t p-4 bg-gray-50 dark:bg-gray-800/50 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('links.label_title')}</Label>
                                        <Input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder={t('links.placeholder_title')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('links.label_url')}</Label>
                                        <Input
                                            value={editUrl}
                                            onChange={(e) => setEditUrl(e.target.value)}
                                            placeholder={t('links.placeholder_url')}
                                            type="url"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t('links.label_description')}</Label>
                                    <Input
                                        value={editDesc}
                                        onChange={(e) => setEditDesc(e.target.value)}
                                        placeholder={t('links.placeholder_description')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <StackSelector
                                        selectedStacks={editStacks}
                                        onChange={setEditStacks}
                                        label={t('links.label_stack')}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button variant="outline" size="sm" onClick={cancelEditing}>
                                        <X className="w-4 h-4 mr-1" />
                                        {t('github.cancel')}
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={saveEdit}
                                        disabled={isSaving || !editTitle || !editUrl}
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        <Check className="w-4 h-4 mr-1" />
                                        {t('common.save')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {links.length === 0 && (
                    <p className="text-center text-gray-500 py-8">{t('links.empty')}</p>
                )}
            </div>
        </div>
    );
}
