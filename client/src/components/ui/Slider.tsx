import React from 'react';

interface SliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, min, max, value, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">
                    {label}
                </label>
                <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-lg">
                    {value}%
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
        </div>
    );
};

export default Slider;
