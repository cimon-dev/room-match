export default function ProfileModal({ user, onClose = () => { }, onMatch = () => { }, calculateCompatibility = () => 0 }) {
    if (!user) return null

    const compatibility = calculateCompatibility(user)

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
                <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90%] overflow-y-auto animate-fadeInUp">
                    <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center z-10">
                        ✕
                    </button>
                    <div className="gradient-mint p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center text-5xl">{user.avatar}</div>
                            <div className="text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                    <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
                                </div>
                                <p className="text-mint-100">{user.job} • {user.districtName}</p>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                    <span className="text-amber-300">★</span>
                                    <span className="font-semibold">{user.avgRating}</span>
                                </div>
                            </div>
                            <div className="md:ml-auto text-center">
                                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-2">
                                    <span className="text-2xl font-bold">{compatibility}%</span>
                                </div>
                                <span className="text-sm text-mint-100">Match Score</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-3">About</h3>
                            <p className="text-slate-600 leading-relaxed">{user.bio}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-2">💰 Budget Range</h4>
                                <p className="text-2xl font-bold text-mint-600">{user.budgetMin}M - {user.budgetMax}M VND</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-2">📍 Preferred Area</h4>
                                <p className="text-2xl font-bold text-mint-600">{user.districtName}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Living DNA</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.sleep === 'early' ? '🌅' : '🦉'}</div>
                                    <div className="font-medium text-slate-900">{user.sleep === 'early' ? 'Early Bird' : 'Night Owl'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.social === 'introvert' ? '🤫' : '🎉'}</div>
                                    <div className="font-medium text-slate-900">{user.social === 'introvert' ? 'Introvert' : 'Extrovert'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.clean === 'neat' ? '✨' : '😌'}</div>
                                    <div className="font-medium text-slate-900">{user.clean === 'neat' ? 'Super Neat' : 'Casual'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.pets === 'has' ? '🐕' : user.pets === 'friendly' ? '💕' : '🚫'}</div>
                                    <div className="font-medium text-slate-900">{user.pets === 'has' ? 'Has Pet' : user.pets === 'friendly' ? 'Pet Friendly' : 'No Pets'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Ratings</h3>
                            <div className="space-y-3">
                                {renderRatingBar('🔒 Privacy', user.ratings?.privacy ?? 4)}
                                {renderRatingBar('🧹 Hygiene', user.ratings?.hygiene ?? 4)}
                                {renderRatingBar('💳 Finance', user.ratings?.finance ?? 4)}
                                {renderRatingBar('💬 Communication', user.ratings?.communication ?? 4)}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Reviews from Past Roommates</h3>
                            <div className="space-y-4 max-h-64 overflow-y-auto">
                                {(user.reviews || []).map((r, i) => (
                                    <div key={i} className="bg-slate-50 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-slate-900">{r.anonymous ? 'Anonymous' : r.reviewer}</span>
                                            <div className="flex items-center gap-1"><span className="text-amber-500">★</span><span className="text-slate-600">{r.rating}</span></div>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-2">"{r.text}"</p>
                                        <span className="text-xs text-slate-400">{r.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={onClose} className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold">Close</button>
                            <button onClick={() => { onMatch(user.id); onClose() }} className="flex-1 btn-primary text-white px-6 py-3 rounded-xl font-semibold">Send Match Request 💫</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderRatingBar(label, value) {
    const percentage = (value / 5) * 100
    const color = value >= 4 ? 'bg-mint-500' : value >= 3 ? 'bg-amber-500' : 'bg-red-500'
    return (
        <div className="flex items-center gap-3" key={label}>
            <span className="w-36 text-sm text-slate-600">{label}</span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full`} style={{ width: `${percentage}%` }} />
            </div>
            <span className="w-10 text-sm font-medium text-slate-900">{value}</span>
        </div>
    )
}
