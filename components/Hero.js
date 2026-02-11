import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Hero() {
    const router = useRouter()
    const [district, setDistrict] = useState('')
    const [budget, setBudget] = useState('')

    function search() {
        const params = new URLSearchParams()
        if (district) params.set('district', district)
        if (budget) params.set('budget', budget)
        router.push(`/discover?${params.toString()}`)
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-mint-50 to-sky-50 py-20 lg:py-32">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-mint-100 rounded-full text-mint-700 font-medium text-sm mb-6">Trusted by 10,000+</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">Find Your <span className="gradient-text">Perfect</span> Roommate in Hanoi</h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg">Smart matching based on lifestyle compatibility. Verified reviews. Real connections.</p>
                        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-xl">
                            <div className="grid md:grid-cols-3 gap-4">
                                <select value={district} onChange={e => setDistrict(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <option value="">All Districts</option>
                                    <option value="Ba Đình">Ba Đình</option>
                                    <option value="Hoàn Kiếm">Hoàn Kiếm</option>
                                    <option value="Tây Hồ">Tây Hồ</option>
                                </select>
                                <select value={budget} onChange={e => setBudget(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <option value="">Any Budget</option>
                                    <option value="0-3">Under 3M VND</option>
                                    <option value="3-5">3M - 5M VND</option>
                                    <option value="5-7">5M - 7M VND</option>
                                    <option value="7-10">7M - 10M VND</option>
                                    <option value="10+">Above 10M VND</option>
                                </select>
                                <button onClick={search} className="btn-primary text-white font-semibold py-3 px-6 rounded-xl">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl gradient-mint flex items-center justify-center text-white text-2xl">👥</div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Perfect Match Found!</h3>
                                    <p className="text-slate-500 text-sm">98% Compatibility</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
