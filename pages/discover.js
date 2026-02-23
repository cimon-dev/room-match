import NavBar from '../components/NavBar'
import FiltersSidebar from '../components/FiltersSidebar'
import ProfileCard from '../components/ProfileCard'
import { useAppDataContext } from '../context/AppDataContext'

import { useMemo, useState } from 'react';

export default function Discover() {
    const app = useAppDataContext();
    const profiles = app?.getFilteredUsers ? app.getFilteredUsers() : [];
    const [showFilters, setShowFilters] = useState(false);
    const [showSavedDialog, setShowSavedDialog] = useState(false);
    const savedProfiles = useMemo(() => {
        const manualSaved = app?.savedProfiles || [];
        if (manualSaved.length > 0) {
            return [...manualSaved].sort((a, b) => a.id - b.id).slice(0, 12);
        }
        const sourceUsers = (app?.users || [])
            .filter(user => user.id !== app?.currentUser?.id)
            .sort((a, b) => a.id - b.id);
        return sourceUsers.slice(0, Math.min(12, sourceUsers.length));
    }, [app?.savedProfiles, app?.users, app?.currentUser?.id]);

    function openSavedDialog() {
        setShowSavedDialog(true);
    }

    function openSavedProfile(userId) {
        if (!app?.openProfile) return;
        app.openProfile(userId);
        setShowSavedDialog(false);
    }

    if (!app) {
        return (
            <div className="min-h-screen bg-slate-50">
                <NavBar />
                <div className="pt-20 px-6 text-slate-500">Đang tải dữ liệu...</div>
            </div>
        );
    }

    return (
        <div data-tour="discover-page" className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-16 lg:flex">
                {/* Sidebar for desktop, offcanvas for mobile */}
                <aside>
                    <div className="lg:hidden flex justify-end px-4 mb-2">
                        <button
                            className="px-4 py-2 rounded-lg bg-mint-500 text-black border font-semibold shadow-md"
                            onClick={() => setShowFilters(true)}
                        >Bộ lọc</button>
                    </div>
                    {/* Offcanvas sidebar for mobile */}
                    {showFilters && (
                        <div className="fixed inset-0 z-50 flex">
                            <div className="bg-white w-80 max-w-full h-full shadow-xl p-4 overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-black">Bộ lọc</h2>
                                    <button className="text-mint-500 text-xl font-bold" onClick={() => setShowFilters(false)}>&times;</button>
                                </div>
                                <FiltersSidebar app={app} />
                            </div>
                            <div className="flex-1 bg-black/30" onClick={() => setShowFilters(false)}></div>
                        </div>
                    )}
                    {/* Sidebar for desktop */}
                    <div
                        className="hidden lg:block lg:w-80"
                        style={{
                            position: 'fixed',
                            top: 64,
                            left: 0,
                            height: 'calc(100vh - 64px)',
                            zIndex: 30,
                            overflowY: 'auto',
                            background: 'white',
                            borderRight: '1px solid #e2e8f0',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                        }}
                    >
                        <FiltersSidebar app={app} />
                    </div>
                </aside>
                <main className="flex-1 p-4 sm:p-6 lg:ml-[320px]">
                    <div data-tour="discover-header" className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                        <h1 className="text-2xl font-bold">Khám phá</h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="text-slate-500">Hiển thị <span className="font-semibold text-mint-600">{profiles.length}</span> kết quả</div>
                            <button
                                onClick={openSavedDialog}
                                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50"
                            >
                                Hồ sơ đã lưu
                            </button>
                        </div>
                    </div>
                    <div data-tour="discover-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {profiles.map(u => (
                            <ProfileCard
                                key={u.id}
                                user={u}
                                onOpen={() => app.openProfile(u.id)}
                                onMatch={() => app.sendMatchRequest(u.id)}
                                calculateCompatibility={app.calculateCompatibility}
                            />
                        ))}
                    </div>
                </main>
            </div>

            {showSavedDialog && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowSavedDialog(false)}></div>
                    <div className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Hồ sơ đã lưu</h2>
                            <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-600" onClick={() => setShowSavedDialog(false)}>✕</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedProfiles.map(user => (
                                <div key={user.id} className="border border-slate-200 rounded-xl p-4 bg-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                            {user.avatarUrl ? (
                                                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full gradient-mint text-white font-bold text-lg flex items-center justify-center">
                                                    {(user.name || '?').trim().charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{user.name}, {user.age}</h3>
                                            <p className="text-sm text-slate-500">{user.job}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 mb-3">📍 {user.districtName} • 💰 {user.budgetMin}-{user.budgetMax} triệu</p>
                                    <button
                                        onClick={() => openSavedProfile(user.id)}
                                        className="w-full btn-primary text-white px-4 py-2 rounded-lg font-semibold"
                                    >
                                        Xem hồ sơ
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
