import { useRef, useEffect } from 'react';

export default function Carousel({ users = [], onOpenProfile = () => { } }) {
    // Lấy top users hoặc tất cả nếu ít hơn 8
    const top = users.filter(u => u.avgRating >= 4.5);
    const items = top.length > 0 ? [...top, ...top] : [...users, ...users];
    const trackRef = useRef(null);

    // Pause animation on hover (optional JS fallback)
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const handleMouseEnter = () => { track.style.animationPlayState = 'paused'; };
        const handleMouseLeave = () => { track.style.animationPlayState = 'running'; };
        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            track.removeEventListener('mouseenter', handleMouseEnter);
            track.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="py-8 bg-white">
            <div className="w-full">
                <div className="overflow-hidden w-full">
                    <div
                        ref={trackRef}
                        className="flex gap-6 carousel-track w-full"
                        style={{ width: 'max-content' }}
                    >
                        {items.map((u, idx) => (
                            <div
                                key={u.id + '-' + idx}
                                className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-xl card-hover cursor-pointer border-[2px] border-slate-100"
                                style={{ boxShadow: 'none' }}
                                onClick={() => onOpenProfile(u.id)}
                            >
                                <div className="flex items-center gap-4 mb-4 p-5 pb-0">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                        <img
                                            src={u.avatarUrl}
                                            alt={u.name}
                                            className="w-full h-full object-cover"
                                            onError={e => { e.target.onerror = null; e.target.src = u.gender === 'male' ? 'https://randomuser.me/api/portraits/men/1.jpg' : 'https://randomuser.me/api/portraits/women/1.jpg'; }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{u.name}, {u.age}</h3>
                                        <p className="text-sm text-slate-500">{u.districtName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3 px-5">
                                    <div className="flex items-center gap-1 text-amber-500">{'★'.repeat(Math.floor(u.avgRating))}{u.avgRating % 1 >= 0.5 ? '½' : ''}</div>
                                    <span className="text-slate-600 text-sm">{u.avgRating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
