import { topRatedRoommates } from '../data/topRatedRoommates'

export default function TopRatedRoommates() {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Bạn cùng phòng được đánh giá cao</h2>
                    <p className="text-lg text-slate-500">Danh sách các bạn cùng phòng nổi bật</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {topRatedRoommates.map(u => (
                        <div key={u.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center mb-3">
                                <img
                                    src={u.avatarUrl}
                                    alt={u.name}
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.onerror = null; e.target.src = u.gender === 'male' ? '/images/boy-01.jpg' : '/images/girl-01.jpg'; }}
                                />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">{u.name}, {u.age}</h3>
                            <p className="text-sm text-slate-500 mb-2">{u.job} • {u.districtName}</p>
                            <div className="flex items-center gap-1 mb-2">
                                <span className="text-amber-500 text-xl">★</span>
                                <span className="font-semibold text-slate-900">{u.avgRating}</span>
                                <span className="text-slate-400 text-sm">({u.reviews} đánh giá)</span>
                            </div>
                            <p className="text-slate-600 text-sm text-center line-clamp-3">{u.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
