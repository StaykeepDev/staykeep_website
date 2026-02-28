'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OTAS = [
    { name: 'Airbnb', color: '#e94560', initial: 'A' },
    { name: 'Bkg.com', color: '#003580', initial: 'B' },
    { name: 'MMT', color: '#e74c3c', initial: 'M' },
    { name: 'Agoda', color: '#6d3cc4', initial: 'Ag' },
];

export default function ChannelOrbit() {
    const [syncPulse, setSyncPulse] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setSyncPulse((p) => p + 1), 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
            {/* Center node */}
            <div
                className="absolute w-12 h-12 rounded-full flex items-center justify-center z-10"
                style={{
                    background: 'linear-gradient(135deg, #e94560, #9b5de5)',
                    boxShadow: '0 0 20px rgba(233,69,96,0.4)',
                }}
            >
                <span className="text-white text-xs font-bold">SK</span>
            </div>

            {/* Pulse rings */}
            {[1, 2, 3].map((ring) => (
                <motion.div
                    key={ring}
                    className="absolute rounded-full border border-[rgba(233,69,96,0.2)]"
                    style={{ width: ring * 44, height: ring * 44 }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, delay: ring * 0.5, repeat: Infinity }}
                />
            ))}

            {/* Orbiting OTAs */}
            {OTAS.map((ota, i) => {
                const angle = (i / OTAS.length) * Math.PI * 2 - Math.PI / 4;
                const radius = 70;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                    <motion.div
                        key={ota.name}
                        className="absolute w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{
                            left: `calc(50% + ${x}px - 18px)`,
                            top: `calc(50% + ${y}px - 18px)`,
                            background: ota.color,
                            boxShadow: `0 0 12px ${ota.color}60`,
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                    >
                        {ota.initial}
                    </motion.div>
                );
            })}
        </div>
    );
}
