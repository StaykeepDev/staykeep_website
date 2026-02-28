'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROOM_COUNT = 12;
const STATUS_COLORS = ['#06d6a0', '#e94560', '#ffd60a', '#555555'];
const STATUS_LABELS = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];

function getInitialStatuses() {
    return Array.from({ length: ROOM_COUNT }, (_, i) => {
        if (i < 4) return 0;
        if (i < 8) return 1;
        if (i < 10) return 2;
        return 3;
    });
}

export default function RoomGrid() {
    const [statuses, setStatuses] = useState(getInitialStatuses);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatuses((prev) => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * ROOM_COUNT);
                next[idx] = ((next[idx] + 1) % 4) as 0 | 1 | 2 | 3;
                return next;
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-xs font-semibold text-[#888888] mb-3">Room Status Board</div>
            <div className="grid grid-cols-4 gap-2 mb-3">
                {statuses.map((status, i) => (
                    <motion.div
                        key={i}
                        className="relative rounded-lg p-2 flex flex-col items-center gap-1"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                        <motion.div
                            className="w-3 h-3 rounded-full"
                            animate={{ backgroundColor: STATUS_COLORS[status] }}
                            transition={{ duration: 0.5 }}
                            style={{ boxShadow: `0 0 6px ${STATUS_COLORS[status]}` }}
                        />
                        <span className="text-[9px] text-[#555555]">R{String(i + 101)}</span>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-1">
                {STATUS_COLORS.map((color, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-[10px] text-[#555555]">{STATUS_LABELS[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
