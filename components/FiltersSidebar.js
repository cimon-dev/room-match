import { useMemo } from 'react'

export default function FiltersSidebar({ app }) {
    const counts = useMemo(() => ({ results: app ? app.getFilteredUsers().length : 0 }), [app && app.users, app && app.activeFilters])

    if (!app) return null

    const districts = Array.from(new Set(app.users.map(u => u.districtName))).slice(0, 12)

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
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button onClick={() => app.resetFilters()} className="text-sm text-mint-500">Reset</button>
            </div>
            <div className="bg-mint-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2"><span className="text-3xl font-bold text-mint-600">{counts.results}</span> <span className="text-slate-600">matches found</span></div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Districts</h3>
                <div id="district-filters" className="space-y-2 max-h-48 overflow-y-auto">
                    {districts.map(d => (
                        <label key={d} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input type="checkbox" value={d} className="w-4 h-4 text-mint-500" checked={app.activeFilters.districts.includes(d)} onChange={toggleDistrict} />
                            <span className="text-slate-600">{d}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Budget Range</h3>
                <div id="budget-filters" className="space-y-2">
                    {['', '0-3', '3-5', '5-7', '7-10', '10+'].map(v => (
                        <label key={v} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input type="radio" name="budget" value={v} className="w-4 h-4 text-mint-500" checked={app.activeFilters.budget === v} onChange={onBudgetChange} />
                            <span className="text-slate-600">{v === '' ? 'Any Budget' : v === '10+' ? 'Above 10M VND' : `${v.replace('-', 'M - ')}M VND`}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Sleep Schedule</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('sleep', 'early')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.sleep === 'early' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🌅 Early Bird</button>
                    <button onClick={() => toggleChip('sleep', 'night')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.sleep === 'night' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🦉 Night Owl</button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Social Style</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('social', 'introvert')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.social === 'introvert' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🤫 Introvert</button>
                    <button onClick={() => toggleChip('social', 'extrovert')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.social === 'extrovert' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🎉 Extrovert</button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Cleanliness</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('clean', 'neat')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.clean === 'neat' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>✨ Super Neat</button>
                    <button onClick={() => toggleChip('clean', 'casual')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.clean === 'casual' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>😌 Casual</button>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Pet Policy</h3>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleChip('pets', 'has')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.pets === 'has' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🐕 Has Pet</button>
                    <button onClick={() => toggleChip('pets', 'friendly')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.pets === 'friendly' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>💕 Pet Friendly</button>
                    <button onClick={() => toggleChip('pets', 'no')} className={`filter-chip px-4 py-2 rounded-full ${app.activeFilters.pets === 'no' ? 'filter-chip active' : 'bg-slate-100 text-slate-600'}`}>🚫 No Pets</button>
                </div>
            </div>
        </div>
    )
}
