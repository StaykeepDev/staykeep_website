'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DATA = [40, 65, 45, 80, 60, 90, 70];
const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

export default function ChartAnimations() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[10px] font-semibold text-[#888888] mb-3">Monthly Revenue</div>
            {/* Bar chart */}
            <div className="flex items-end gap-2 h-20 mb-2">
                {DATA.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <motion.div
                            className="w-full rounded-sm"
                            style={{ background: 'linear-gradient(to top, #e94560, #9b5de5)' }}
                            initial={{ height: 0 }}
                            animate={{ height: animated ? `${val}%` : 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                        />
                        <span className="text-[8px] text-[#444]">{MONTHS[i]}</span>
                    </div>
                ))}
            </div>
            {/* Mini stats */}
            <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.04)]">
                <div className="text-[10px] text-[#555555]">Avg ADR</div>
                <div className="text-[10px] font-mono font-bold text-[#06d6a0]">₹3,850</div>
            </div>
        </div>
    );
}
