'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
    { side: 'left', text: 'Hi! Is the pool villa available for March 15?', delay: 0 },
    { side: 'right', text: 'Yes! It\'s available. Would you like to book?', delay: 1.5 },
    { side: 'left', text: 'Amazing! How many guests can it host?', delay: 3.2 },
    { side: 'right', text: 'Up to 6 guests. Shall I block the dates?', delay: 5 },
];

export default function ChatBubbles() {
    const [visible, setVisible] = useState(0);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];

        const showMessages = () => {
            setVisible(0);
            MESSAGES.forEach((msg, i) => {
                const t1 = setTimeout(() => setTyping(true), msg.delay * 1000);
                const t2 = setTimeout(() => {
                    setTyping(false);
                    setVisible(i + 1);
                }, (msg.delay + 0.8) * 1000);
                timeouts.push(t1, t2);
            });

            // Reset after all messages
            const reset = setTimeout(() => showMessages(), 8000);
            timeouts.push(reset);
        };

        showMessages();
        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col gap-2 px-2 py-2 min-h-[120px]">
            {MESSAGES.slice(0, visible).map((msg, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.side === 'left' ? -20 : 20, y: 5 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className="text-[10px] px-3 py-2 rounded-2xl max-w-[75%] leading-relaxed"
                        style={{
                            background: msg.side === 'left' ? 'rgba(255,255,255,0.06)' : 'rgba(233,69,96,0.2)',
                            color: msg.side === 'left' ? '#ccc' : '#fff',
                            borderBottomLeftRadius: msg.side === 'left' ? 4 : undefined,
                            borderBottomRightRadius: msg.side === 'right' ? 4 : undefined,
                        }}
                    >
                        {msg.text}
                    </div>
                </motion.div>
            ))}
            {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex items-center gap-1 px-3 py-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-[#888888]"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
