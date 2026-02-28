'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FadeInOnScrollProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'none';
    className?: string;
    duration?: number;
}

export default function FadeInOnScroll({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    duration = 0.6,
}: FadeInOnScrollProps) {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 30 : 0,
            x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
