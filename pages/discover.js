import NavBar from '../components/NavBar'
import FiltersSidebar from '../components/FiltersSidebar'
import ProfileCard from '../components/ProfileCard'
import ProfileModal from '../components/ProfileModal'
import { useAppDataContext } from '../context/AppDataContext'

import { useState } from 'react';

export default function Discover() {
    const app = useAppDataContext();
    const profiles = app.getFilteredUsers();
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                        <h1 className="text-2xl font-bold">Khám phá</h1>
                        <div className="text-slate-500">Hiển thị <span className="font-semibold text-mint-600">{profiles.length}</span> kết quả</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            {app.profileModalUser && <ProfileModal user={app.profileModalUser} onClose={app.closeProfile} onMatch={app.sendMatchRequest} calculateCompatibility={app.calculateCompatibility} />}
        </div>
    )
}
