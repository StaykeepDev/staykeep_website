'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS = [
    { name: 'Arjun S.', room: 'Deluxe Suite', source: 'Airbnb', color: '#e94560' },
    { name: 'Priya M.', room: 'Beach Villa', source: 'Direct', color: '#06d6a0' },
    { name: 'Walk-In', room: 'Standard Room', source: 'Walk-in', color: '#f77f00' },
];

export default function BookingCardStack() {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx((i) => (i + 1) % CARDS.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full px-2 py-3">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-xl p-3 flex items-center gap-3"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}
                >
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `${CARDS[activeIdx].color}20`, color: CARDS[activeIdx].color }}
                    >
                        {CARDS[activeIdx].name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white">{CARDS[activeIdx].name}</div>
                        <div className="text-[10px] text-[#555555]">{CARDS[activeIdx].room}</div>
                    </div>
                    <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${CARDS[activeIdx].color}20`, color: CARDS[activeIdx].color }}
                    >
                        {CARDS[activeIdx].source}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-2">
                {CARDS.map((_, i) => (
                    <div
                        key={i}
                        className="w-1 h-1 rounded-full transition-all"
                        style={{
                            background: i === activeIdx ? CARDS[activeIdx].color : 'rgba(255,255,255,0.15)',
                            width: i === activeIdx ? 12 : 4,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
