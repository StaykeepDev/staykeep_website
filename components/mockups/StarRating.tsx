'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_STARS = 5;
const TARGET_RATING = 4.8;

export default function StarRating() {
    const [filledCount, setFilledCount] = useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        let starsAdded = 0;
        const interval = setInterval(() => {
            if (starsAdded < TOTAL_STARS) {
                starsAdded++;
                setFilledCount(starsAdded);
            } else {
                // Count up rating
                setRating((prev) => {
                    if (prev >= TARGET_RATING) {
                        clearInterval(interval);
                        return prev;
                    }
                    return Math.min(prev + 0.1, TARGET_RATING);
                });
            }
        }, 250);

        // After full loop, reset and loop
        const reset = setInterval(() => {
            setFilledCount(0);
            setRating(0);
            starsAdded = 0;
        }, 6000);

        return () => {
            clearInterval(interval);
            clearInterval(reset);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-2 py-2">
            <div className="flex items-center gap-1">
                {Array.from({ length: TOTAL_STARS }, (_, i) => (
                    <motion.span
                        key={i}
                        animate={{
                            scale: i < filledCount ? [1, 1.3, 1] : 1,
                            opacity: i < filledCount ? 1 : 0.2,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl"
                        style={{ color: '#ffd60a', filter: i < filledCount ? 'drop-shadow(0 0 4px #ffd60a)' : 'none' }}
                    >
                        ★
                    </motion.span>
                ))}
            </div>
            <motion.div
                className="font-mono font-bold text-2xl text-white"
                animate={{ opacity: 1 }}
            >
                {rating.toFixed(1)}
            </motion.div>
            <div className="text-xs text-[#555555]">Average rating</div>
        </div>
    );
}
