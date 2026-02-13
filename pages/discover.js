import NavBar from '../components/NavBar'
import FiltersSidebar from '../components/FiltersSidebar'
import ProfileCard from '../components/ProfileCard'
import ProfileModal from '../components/ProfileModal'
import { useAppDataContext } from '../context/AppDataContext'

export default function Discover() {
    const app = useAppDataContext();
    const profiles = app.getFilteredUsers();

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <div className="pt-16 lg:flex">
                <aside
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
                </aside>
                <main className="flex-1 p-6" style={{ marginLeft: 320 }}>
                    <div className="flex items-center justify-between mb-6">
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
