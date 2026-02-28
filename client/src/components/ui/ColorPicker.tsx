import React from 'react';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
    const colors = [
        '#6366f1', // Indigo
        '#22d3ee', // Cyan
        '#ec4899', // Pink
        '#f59e0b', // Amber
        '#10b981', // Emerald
        '#8b5cf6', // Violet
    ];

    return (
        <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
                {label}
            </label>
            <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => onChange(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${value === color ? 'border-foreground scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                            }`}
                        style={{ backgroundColor: color }}
                    />
                ))}
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 glass-hover">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-x-[-10px] inset-y-[-10px] w-[200%] h-[200%] cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
