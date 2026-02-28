'use client';

export default function GlowOrbs({ className = '' }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Orb 1 — coral */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 400,
                    height: 400,
                    left: '10%',
                    top: '20%',
                    background: 'radial-gradient(circle, rgba(233,69,96,0.12) 0%, transparent 70%)',
                    animation: 'orb-float-1 18s ease-in-out infinite',
                    filter: 'blur(40px)',
                }}
            />
            {/* Orb 2 — purple */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 350,
                    height: 350,
                    right: '10%',
                    top: '10%',
                    background: 'radial-gradient(circle, rgba(155,93,229,0.1) 0%, transparent 70%)',
                    animation: 'orb-float-2 22s ease-in-out infinite',
                    filter: 'blur(40px)',
                }}
            />
            {/* Orb 3 — mint */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 300,
                    height: 300,
                    left: '50%',
                    bottom: '10%',
                    background: 'radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%)',
                    animation: 'orb-float-3 25s ease-in-out infinite',
                    filter: 'blur(40px)',
                }}
            />
        </div>
    );
}
