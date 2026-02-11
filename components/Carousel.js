export default function Carousel({ users = [], onOpenProfile = () => { } }) {
    const top = users.filter(u => u.avgRating >= 4.5).slice(0, 8)
    const items = [...top, ...top]

    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-6 overflow-hidden">
                    <div className="flex gap-6" style={{ width: 'max-content' }}>
                        {items.map(u => (
                            <div key={u.id + Math.random()} className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg p-5 card-hover cursor-pointer" onClick={() => onOpenProfile(u.id)}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl gradient-mint flex items-center justify-center text-2xl">{u.avatar}</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{u.name}, {u.age}</h3>
                                        <p className="text-sm text-slate-500">{u.districtName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1 text-amber-500">{'★'.repeat(Math.floor(u.avgRating))}{u.avgRating % 1 >= 0.5 ? '½' : ''}</div>
                                    <span className="text-slate-600 text-sm">{u.avgRating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
