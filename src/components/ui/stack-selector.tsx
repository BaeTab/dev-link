import { useState } from 'react';
import { POPULAR_STACKS } from '@/lib/stacks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StackSelectorProps {
    selectedStacks: string[];
    onChange: (stacks: string[]) => void;
    label?: string;
}

export function StackSelector({ selectedStacks, onChange, label = "Tech Stack" }: StackSelectorProps) {
    const { t } = useTranslation();
    const [customStack, setCustomStack] = useState('');

    const handleToggle = (value: string) => {
        if (selectedStacks.includes(value)) {
            onChange(selectedStacks.filter(s => s !== value));
        } else {
            onChange([...selectedStacks, value]);
        }
    };

    const handleAddCustom = () => {
        if (customStack && !selectedStacks.includes(customStack)) {
            onChange([...selectedStacks, customStack]);
            setCustomStack('');
        }
    };

    const removeStack = (stack: string) => {
        onChange(selectedStacks.filter(s => s !== stack));
    };

    return (
        <div className="space-y-4">
            <Label>{label}</Label>

            {/* Selected Stacks Display */}
            <div className="flex flex-wrap gap-2 min-h-[30px] p-2 bg-muted/20 rounded-md border border-dashed">
                {selectedStacks.length === 0 && <span className="text-xs text-muted-foreground self-center">No stacks selected</span>}
                {selectedStacks.map(stack => {
                    const popular = POPULAR_STACKS.find(s => s.value === stack);
                    const label = popular ? popular.label : stack;
                    return (
                        <span key={stack} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {label}
                            <button type="button" onClick={() => removeStack(stack)} className="hover:text-destructive">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    );
                })}
            </div>

            {/* Custom Input */}
            <div className="flex gap-2">
                <Input
                    value={customStack}
                    onChange={(e) => setCustomStack(e.target.value)}
                    placeholder={t('profile.placeholder_custom_stack')}
                    className="flex-1 h-9 text-sm"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustom();
                        }
                    }}
                />
                <Button type="button" size="sm" variant="secondary" onClick={handleAddCustom}>
                    <Plus className="w-4 h-4 mr-1" /> {t('profile.add_custom')}
                </Button>
            </div>

            {/* Popular Stacks List */}
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                {POPULAR_STACKS.map((stack) => (
                    <button
                        key={stack.value}
                        type="button"
                        onClick={() => handleToggle(stack.value)}
                        className={`
                            px-3 py-1 rounded-full text-xs font-medium transition-all border
                            ${selectedStacks.includes(stack.value)
                                ? 'bg-primary text-primary-foreground border-primary opacity-50 cursor-default'
                                : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                            }
                        `}
                        disabled={selectedStacks.includes(stack.value)}
                    >
                        {stack.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
