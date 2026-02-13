import { useMemo } from 'react'
import { districts } from '../data/districts'

export default function FiltersSidebar({ app }) {
    const counts = useMemo(() => ({ results: app ? app.getFilteredUsers().length : 0 }), [app && app.users, app && app.activeFilters])

    if (!app) return null

    // districts lấy từ data/districts.js

    function toggleDistrict(e) {
        const value = e.target.value
        const checked = e.target.checked
        const next = checked ? [...app.activeFilters.districts, value] : app.activeFilters.districts.filter(d => d !== value)
        app.applyFilters({ districts: next })
    }

    function onBudgetChange(e) {
        app.applyFilters({ budget: e.target.value })
    }

    function toggleChip(type, value) {
        const current = app.activeFilters[type]
        app.applyFilters({ [type]: current === value ? null : value })
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Bộ lọc</h2>
                <button onClick={() => app.resetFilters()} className="text-sm text-mint-500">Đặt lại</button>
            </div>
            <div className="bg-mint-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2"><span className="text-3xl font-bold text-mint-600">{counts.results}</span> <span className="text-slate-600">kết quả phù hợp</span></div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Quận</h3>
                <div id="district-filters" className="space-y-2 max-h-48 overflow-y-auto">
                    {districts.map(d => (
                        <label key={d.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input type="checkbox" value={d.name} className="w-4 h-4 text-mint-500" checked={app.activeFilters.districts.includes(d.name)} onChange={toggleDistrict} />
                            <span className="text-slate-600">{d.emoji} {d.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Khoảng giá</h3>
                <div id="budget-filters" className="space-y-2">
                    {['', '0-3', '3-5', '5-7', '7-10', '10+'].map(v => (
                        <label key={v} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input type="radio" name="budget" value={v} className="w-4 h-4 text-mint-500" checked={app.activeFilters.budget === v} onChange={onBudgetChange} />
                            <span className="text-slate-600">{v === '' ? 'Mức giá bất kỳ' : v === '10+' ? 'Trên 10 triệu' : `${v.replace('-', ' - ')} triệu`}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Thời gian ngủ</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('sleep', 'early')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.sleep === 'early' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🌅 Dậy sớm</button>
                    <button onClick={() => toggleChip('sleep', 'night')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.sleep === 'night' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🦉 Cú đêm</button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Tính cách xã hội</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('social', 'introvert')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.social === 'introvert' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🤫 Hướng nội</button>
                    <button onClick={() => toggleChip('social', 'extrovert')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.social === 'extrovert' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🎉 Hướng ngoại</button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Sạch sẽ</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('clean', 'neat')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.clean === 'neat' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>✨ Rất gọn gàng</button>
                    <button onClick={() => toggleChip('clean', 'casual')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.clean === 'casual' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>😌 Bình thường</button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Thú cưng</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('pets', 'has')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.pets === 'has' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🐕 Có thú cưng</button>
                    <button onClick={() => toggleChip('pets', 'friendly')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.pets === 'friendly' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>💕 Thân thiện với thú cưng</button>
                    <button onClick={() => toggleChip('pets', 'no')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.pets === 'no' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🚫 Không nuôi thú cưng</button>
                </div>
            </div>
        </div>
    )
}
