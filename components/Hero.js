import { useState } from 'react'
import { useRouter } from 'next/router'
import { districts } from '../data/districts'

export default function Hero() {
    const router = useRouter()
    const [district, setDistrict] = useState('')
    const [budget, setBudget] = useState('')

    function openGuide() {
        if (typeof window === 'undefined') return
        window.dispatchEvent(new Event('roommatch:start-tour'))
    }

    function search() {
        const params = new URLSearchParams()
        if (district) params.set('district', district)
        if (budget) params.set('budget', budget)
        router.push(`/discover?${params.toString()}`)
    }

    function GuideCard({ mobile = false }) {
        return (
            <div className={`relative bg-white rounded-3xl shadow-2xl ${mobile ? 'p-6 mb-6 lg:hidden' : 'p-8'}`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-mint flex items-center justify-center text-white text-2xl">👥</div>
                    <div>
                        <h3 className="font-bold text-slate-900">Ghép đôi theo độ tương thích + mức độ an toàn</h3>
                        <p className="text-slate-500 text-sm">Tương thích đến 98% • Hồ sơ đánh giá xác thực</p>
                    </div>
                </div>
                <button
                    data-tour="hero-guide-button"
                    onClick={openGuide}
                    className="btn-primary w-full lg:w-auto text-white font-semibold py-3 px-5 rounded-xl"
                >
                    Click vào đây để tìm hiểu về RoomMatch
                </button>
            </div>
        )
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-mint-50 to-sky-50 pt-10 pb-20 lg:py-32">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-mint-100 rounded-full text-mint-700 font-medium text-sm mb-6">Tương thích cao • Xác thực an toàn • 10.000+ người tin dùng</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">Tìm bạn ở ghép tương thích cao, an toàn ngay tại Hà Nội</h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg">RoomMatch ưu tiên ghép đôi theo lối sống và mức độ phù hợp, kết hợp hồ sơ xác thực để bạn kết nối an tâm hơn.</p>
                        <GuideCard mobile />
                        <div data-tour="hero-search" className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-xl">
                            <div className="grid md:grid-cols-3 gap-4">
                                <select value={district} onChange={e => setDistrict(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <option value="">Tất cả quận</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.name}>{d.emoji} {d.name}</option>
                                    ))}
                                </select>
                                <select value={budget} onChange={e => setBudget(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <option value="">Mức giá bất kỳ</option>
                                    <option value="0-3">Dưới 3 triệu</option>
                                    <option value="3-5">3 - 5 triệu</option>
                                    <option value="5-7">5 - 7 triệu</option>
                                    <option value="7-10">7 - 10 triệu</option>
                                    <option value="10+">Trên 10 triệu</option>
                                </select>
                                <button onClick={search} className="btn-primary text-white font-semibold py-3 px-6 rounded-xl">Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <GuideCard />
                    </div>
                </div>
            </div>
        </section>
    )
}
