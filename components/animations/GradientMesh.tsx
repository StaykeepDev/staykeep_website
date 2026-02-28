'use client';

export default function GradientMesh({ className = '' }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Animated gradient blobs */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse at 20% 30%, rgba(233,69,96,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 10%, rgba(155,93,229,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(6,214,160,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 80%, rgba(247,127,0,0.06) 0%, transparent 40%)
          `,
                    animation: 'meshShift 20s ease-in-out infinite',
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Dark gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,10,15,0.6) 100%)',
                }}
            />
        </div>
    );
}
