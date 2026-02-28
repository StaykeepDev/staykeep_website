'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function AnimatedCounter({
    from = 0,
    to,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
}: AnimatedCounterProps) {
    const [count, setCount] = useState(from);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (inView && !hasAnimated.current) {
            hasAnimated.current = true;
            startTimeRef.current = null;

            const animate = (timestamp: number) => {
                if (!startTimeRef.current) startTimeRef.current = timestamp;
                const elapsed = (timestamp - startTimeRef.current) / 1000;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(from + (to - from) * eased));

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [inView, from, to, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString('en-IN')}{suffix}
        </span>
    );
}
