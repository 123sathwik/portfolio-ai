import React from 'react';
import { motion } from 'framer-motion';

interface ScoreGaugeProps {
    score: number;
    label: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        className="stroke-white/5 fill-transparent"
                        strokeWidth="10"
                    />
                    <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        className="stroke-primary fill-transparent"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 70}
                        initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                        animate={{ strokeDashoffset: (2 * Math.PI * 70) * (1 - score / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-black italic"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[10px] uppercase font-black text-muted tracking-widest">{label}</span>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;
