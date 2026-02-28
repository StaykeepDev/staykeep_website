'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Star } from 'lucide-react';

type BookingStatus = 'confirmed' | 'pending' | 'review';

interface Booking {
    name: string;
    room: string;
    date: string;
    status: BookingStatus;
}

const BOOKINGS: Booking[] = [
    { name: 'Arjun Sharma', room: 'Deluxe Suite', date: 'Mar 15', status: 'confirmed' },
    { name: 'Priya Menon', room: 'Beach Villa', date: 'Mar 16', status: 'pending' },
    { name: 'Rahul Gupta', room: 'Garden Cottage', date: 'Mar 17', status: 'confirmed' },
    { name: 'Anjali Singh', room: 'Pool Room', date: 'Mar 18', status: 'pending' },
];

const STATUS_COLORS: Record<BookingStatus, string> = {
    confirmed: 'text-[#06d6a0]',
    pending: 'text-[#f77f00]',
    review: 'text-[#ffd60a]',
};

const StatusIcon = ({ status }: { status: BookingStatus }) => {
    if (status === 'confirmed') return <CheckCircle size={12} className="text-[#06d6a0]" />;
    if (status === 'pending') return <Clock size={12} className="text-[#f77f00]" />;
    return <Star size={12} className="text-[#ffd60a]" />;
};

export default function DashboardMockup() {
    const [revenue, setRevenue] = useState(0);
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        // Animate revenue counter
        let start = 0;
        const target = 45200;
        const step = target / 60;
        const interval = setInterval(() => {
            start = Math.min(start + step, target);
            setRevenue(Math.round(start));
            if (start >= target) clearInterval(interval);
        }, 30);

        // Stagger in booking rows
        const timer = setInterval(() => {
            setVisible((v) => Math.min(v + 1, BOOKINGS.length));
        }, 600);

        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, []);

    return (
        <div
            className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden"
            style={{
                background: 'rgba(13,13,21,0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(233,69,96,0.08)',
                backdropFilter: 'blur(20px)',
            }}
        >
            {/* Header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div className="ml-4 flex-1 h-6 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                    <span className="text-xs text-[#444455]">staykeep.app/dashboard</span>
                </div>
            </div>

            <div className="p-5">
                {/* Stats cards */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                    {[
                        { label: "Today's Check-ins", value: '12', color: '#06d6a0', suffix: '' },
                        { label: 'Revenue', value: `₹${(revenue / 1000).toFixed(1)}K`, color: '#e94560', suffix: '↑' },
                        { label: 'Occupancy', value: '78%', color: '#9b5de5', suffix: '' },
                        { label: 'Pending', value: '5', color: '#f77f00', suffix: '' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="rounded-xl p-3"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <div className="text-[10px] text-[#555555] mb-1.5 leading-tight">{stat.label}</div>
                            <div className="font-bold text-lg text-white font-mono" style={{ color: stat.color }}>
                                {stat.value} <span className="text-xs">{stat.suffix}</span>
                            </div>
                            {/* Mini sparkline */}
                            <div className="flex items-end gap-0.5 mt-2 h-6">
                                {[2, 5, 3, 7, 4, 8, 6].map((h, j) => (
                                    <motion.div
                                        key={j}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ delay: i * 0.1 + j * 0.05 + 0.4 }}
                                        style={{
                                            height: `${h * 3}px`,
                                            background: stat.color,
                                            opacity: 0.5,
                                            transformOrigin: 'bottom',
                                        }}
                                        className="flex-1 rounded-sm"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Bookings */}
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <span className="text-xs font-semibold text-[#888888]">Recent Bookings</span>
                        <span className="text-[10px] text-[#e94560]">View all →</span>
                    </div>
                    <div className="divide-y divide-[rgba(255,255,255,0.03)]">
                        <AnimatePresence>
                            {BOOKINGS.slice(0, visible).map((booking, i) => (
                                <motion.div
                                    key={booking.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex items-center gap-3 px-4 py-3"
                                >
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                        style={{ background: `rgba(233,69,96,0.15)`, color: '#e94560' }}
                                    >
                                        {booking.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-white truncate">{booking.name}</div>
                                        <div className="text-[10px] text-[#555555]">{booking.room} · {booking.date}</div>
                                    </div>
                                    <div className={`flex items-center gap-1 text-[10px] font-medium ${STATUS_COLORS[booking.status]}`}>
                                        <StatusIcon status={booking.status} />
                                        <span className="capitalize">{booking.status}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
