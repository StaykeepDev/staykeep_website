'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
    glowColor?: string;
}

export default function TiltCard({
    children,
    className = '',
    maxTilt = 8,
    glowColor = 'rgba(233,69,96,0.15)',
}: TiltCardProps) {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateX = ((y - cy) / cy) * -maxTilt;
        const rotateY = ((x - cx) / cx) * maxTilt;

        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        setRotate({ x: rotateX, y: rotateY });
        setGlowPos({ x: glowX, y: glowY });
    }, [maxTilt]);

    const handleMouseLeave = useCallback(() => {
        setRotate({ x: 0, y: 0 });
        setGlowPos({ x: 50, y: 50 });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className={`relative ${className}`}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-inherit pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor} 0%, transparent 60%)`,
                    borderRadius: 'inherit',
                }}
            />
            {children}
        </motion.div>
    );
}
