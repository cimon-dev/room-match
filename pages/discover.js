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
    const [compareMode, setCompareMode] = useState(false);
    const [selectedCompareIds, setSelectedCompareIds] = useState([]);
    const [showCompareDialog, setShowCompareDialog] = useState(false);
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

    function toggleCompareMode() {
        setCompareMode(prev => {
            const next = !prev;
            if (!next) {
                setSelectedCompareIds([]);
                setShowCompareDialog(false);
            }
            return next;
        });
    }

    function handleProfileCompareClick(userId) {
        if (!compareMode) return;
        setSelectedCompareIds(prev => {
            if (prev.includes(userId)) {
                const next = prev.filter(id => id !== userId);
                if (next.length < 2) setShowCompareDialog(false);
                return next;
            }
            if (prev.length === 0) return [userId];

            const next = [prev[0], userId];
            setShowCompareDialog(true);
            return next;
        });
    }

    const compareUsers = useMemo(() => {
        const [leftId, rightId] = selectedCompareIds;
        const left = app?.users?.find(u => u.id === leftId);
        const right = app?.users?.find(u => u.id === rightId);
        return [left, right];
    }, [selectedCompareIds, app?.users]);

    const [leftUser, rightUser] = compareUsers;

    function formatLifestyle(user, key) {
        if (!user) return '-';
        const map = {
            sleep: user.sleep === 'early' ? 'Dậy sớm' : 'Cú đêm',
            social: user.social === 'introvert' ? 'Hướng nội' : 'Hướng ngoại',
            clean: user.clean === 'neat' ? 'Rất gọn gàng' : 'Bình thường',
            pets: user.pets === 'has' ? 'Có thú cưng' : user.pets === 'friendly' ? 'Thân thiện thú cưng' : 'Không nuôi thú cưng',
            smoking: user.smoking === 'no' ? 'Không hút' : user.smoking === 'occasionally' ? 'Thỉnh thoảng' : 'Có hút',
            noise: user.noise === 'quiet' ? 'Yên tĩnh' : user.noise === 'normal' ? 'Bình thường' : 'Sôi động',
            guests: user.guests === 'rare' ? 'Hiếm khi' : user.guests === 'sometimes' ? 'Thỉnh thoảng' : 'Thường xuyên'
        };
        return map[key] || '-';
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
                                onClick={toggleCompareMode}
                                className={`px-4 py-2 rounded-xl border font-semibold transition-all ${compareMode ? 'bg-mint-300 text-slate-900 border-mint-400 ring-2 ring-mint-200 shadow-lg shadow-mint-200' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                            >
                                {compareMode ? 'Đang so sánh' : 'So sánh'}
                            </button>
                            <button
                                onClick={openSavedDialog}
                                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50"
                            >
                                Hồ sơ đã lưu
                            </button>
                        </div>
                    </div>
                    {compareMode && (
                        <div className="mb-4 rounded-xl bg-mint-50 border border-mint-100 px-4 py-3 text-sm text-mint-700">
                            Chế độ so sánh đang bật. Chọn 2 hồ sơ để so sánh. Bấm lại vào hồ sơ đã chọn để bỏ chọn.
                        </div>
                    )}
                    <div data-tour="discover-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {profiles.map(u => (
                            <div
                                key={u.id}
                                onClick={() => handleProfileCompareClick(u.id)}
                                className={`group rounded-2xl transition-colors ${compareMode ? 'cursor-pointer hover:ring-2 hover:ring-mint-300' : ''} ${selectedCompareIds.includes(u.id) ? 'ring-2 ring-mint-500 shadow-sm shadow-mint-200/60' : ''}`}
                            >
                                <ProfileCard
                                    user={u}
                                    onOpen={() => { if (!compareMode) app.openProfile(u.id); }}
                                    onMatch={() => { if (!compareMode) app.sendMatchRequest(u.id); }}
                                    calculateCompatibility={app.calculateCompatibility}
                                    disableHoverEffect={compareMode}
                                    className={`${compareMode ? 'group-hover:bg-mint-50/60' : ''} ${selectedCompareIds.includes(u.id) ? '!bg-mint-50/70' : ''}`}
                                />
                            </div>
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

            {showCompareDialog && leftUser && rightUser && (
                <div className="fixed inset-0 z-[75] flex items-start sm:items-center justify-center px-3 sm:px-4 py-4">
                    <div className="absolute inset-0 bg-black/45" onClick={() => setShowCompareDialog(false)}></div>
                    <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">So sánh hồ sơ</h2>
                            <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-600" onClick={() => setShowCompareDialog(false)}>✕</button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-5">
                            {[leftUser, rightUser].map(user => {
                                const compatibility = Math.round(app.calculateCompatibility(user));
                                const radius = 20;
                                const circumference = 2 * Math.PI * radius;
                                const percent = Math.max(0, Math.min(compatibility, 100));
                                const dash = (percent / 100) * circumference;

                                return (
                                    <div key={user.id} className="rounded-2xl border border-slate-200 p-3 sm:p-4 bg-slate-50 min-w-0">
                                        <div className="hidden sm:flex items-start sm:items-center justify-between gap-2 sm:gap-3 min-w-0">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                                    {user.avatarUrl ? (
                                                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full gradient-mint text-white font-bold text-lg flex items-center justify-center">
                                                            {(user.name || '?').trim().charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-slate-900 text-lg leading-tight break-words">{user.name}, {user.age}</h3>
                                                    <p className="text-sm text-slate-600 break-words">{user.job}</p>
                                                </div>
                                            </div>
                                            <div className="relative w-12 h-12 shrink-0">
                                                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                                                    <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                                                    <circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        stroke="#00CBA9"
                                                        strokeWidth="4"
                                                        fill="none"
                                                        strokeDasharray={`${circumference} ${circumference}`}
                                                        strokeDashoffset={`${circumference - dash}`}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-mint-600">{compatibility}%</span>
                                            </div>
                                        </div>
                                        <div className="sm:hidden flex flex-col items-center text-center gap-2">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                                {user.avatarUrl ? (
                                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full gradient-mint text-white font-bold text-lg flex items-center justify-center">
                                                        {(user.name || '?').trim().charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-slate-900 text-base leading-tight break-words">{user.name}, {user.age}</h3>
                                                <p className="text-xs text-slate-600 break-words leading-tight">{user.job}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: 'Phù hợp', left: `${Math.round(app.calculateCompatibility(leftUser))}%`, right: `${Math.round(app.calculateCompatibility(rightUser))}%`, mobileOnly: true },
                                { label: 'Khu vực', left: leftUser.districtName, right: rightUser.districtName },
                                { label: 'Khoảng giá', left: `${leftUser.budgetMin}-${leftUser.budgetMax} triệu`, right: `${rightUser.budgetMin}-${rightUser.budgetMax} triệu` },
                                { label: 'Giờ ngủ', left: formatLifestyle(leftUser, 'sleep'), right: formatLifestyle(rightUser, 'sleep') },
                                { label: 'Tính cách xã hội', left: formatLifestyle(leftUser, 'social'), right: formatLifestyle(rightUser, 'social') },
                                { label: 'Mức độ sạch sẽ', left: formatLifestyle(leftUser, 'clean'), right: formatLifestyle(rightUser, 'clean') },
                                { label: 'Thú cưng', left: formatLifestyle(leftUser, 'pets'), right: formatLifestyle(rightUser, 'pets') },
                                { label: 'Hút thuốc', left: formatLifestyle(leftUser, 'smoking'), right: formatLifestyle(rightUser, 'smoking') },
                                { label: 'Mức độ ồn ào', left: formatLifestyle(leftUser, 'noise'), right: formatLifestyle(rightUser, 'noise') },
                                { label: 'Tiếp khách tại nhà', left: formatLifestyle(leftUser, 'guests'), right: formatLifestyle(rightUser, 'guests') },
                                { label: 'Đánh giá', left: `${leftUser.avgRating} ★`, right: `${rightUser.avgRating} ★` }
                            ].map(item => (
                                <div key={item.label} className={`rounded-xl border border-slate-200 p-3 ${item.mobileOnly ? 'sm:hidden' : ''}`}>
                                    <div className="mb-2 flex justify-center sm:hidden">
                                        <div className="text-xs text-slate-500 px-2 py-1 bg-slate-100 rounded-full">{item.label}</div>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
                                        <div className="font-medium text-slate-700 text-left min-w-0 break-words">{item.left}</div>
                                        <div className="hidden sm:inline-flex text-xs sm:text-sm text-slate-500 px-2 py-1 bg-slate-100 rounded-full justify-center">{item.label}</div>
                                        <div className="font-medium text-slate-700 text-right min-w-0 break-words">{item.right}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
