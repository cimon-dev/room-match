export default function ProfileCard({ user, onOpen, onMatch, calculateCompatibility = () => 50 }) {
    const compatibility = Math.round(calculateCompatibility(user))
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const percent = Math.max(0, Math.min(compatibility, 100))
    const dash = (percent / 100) * circumference
    const fallbackAvatarSrc = user.gender === 'male' ? '/images/boy-01.jpg' : '/images/girl-01.jpg'

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden card-hover flex flex-col">
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                onError={e => { e.target.onerror = null; e.target.src = fallbackAvatarSrc; }}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{user.name}, {user.age}</h3>
                            <p className="text-sm text-slate-500">{user.job}</p>
                        </div>
                    </div>
                    <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                            <circle
                                cx="24" cy="24" r="20"
                                stroke="#00CBA9"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${circumference} ${circumference}`}
                                strokeDashoffset={`${circumference - dash}`}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 0.4s' }}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-mint-600">{compatibility}%</span>
                    </div>
                </div>

                <div className="text-sm text-slate-600 mb-3">
                    <span>📍 {user.districtName}</span>
                    <span className="mx-2">•</span>
                    <span>💰 {user.budgetMin}-{user.budgetMax}M</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">{user.sleep === 'early' ? '🌅 Dậy sớm' : '🦉 Cú đêm'}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">{user.social === 'introvert' ? '🤫 Hướng nội' : '🎉 Hướng ngoại'}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">{user.pets === 'has' ? '🐕 Có thú cưng' : user.pets === 'friendly' ? '💕 Thân thiện thú cưng' : '🚫 Không thú cưng'}</span>
                </div>

                <div className="mb-4 flex-1">
                    <p className="text-slate-600 line-clamp-3">{user.bio}</p>
                </div>
            </div>

            <div className="p-5 pt-0">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="font-semibold text-slate-900">{user.avgRating}</span>
                        <span className="text-slate-400 text-sm">({user.reviews?.length || 0} đánh giá)</span>
                    </div>
                    <div className="flex gap-1">
                        {user.badges?.includes('verified') ? <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs">✓</span> : null}
                        {user.badges?.includes('fast_responder') ? <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">⚡</span> : null}
                        {user.badges?.includes('top_rated') ? <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs">🏆</span> : null}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button onClick={onOpen} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-medium">Xem</button>
                    <button onClick={onMatch} className="flex-1 btn-primary text-white px-4 py-2 rounded-xl font-medium">Kết nối</button>
                </div>
            </div>
        </div>
    )
}
