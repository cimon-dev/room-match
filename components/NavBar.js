

export default function NavBar() {
    const { currentUser, openCurrentUserProfile } = useAppDataContext();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 gradient-mint rounded-xl flex items-center justify-center text-white">RM</div>
                            <span className="text-xl font-bold gradient-text">RoomMatch</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-slate-600 hover:text-mint-500">Home</Link>
                        <Link href="/discover" className="text-slate-600 hover:text-mint-500">Discover</Link>
                        <Link href="/messages" className="text-slate-600 hover:text-mint-500">Messages</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="w-8 h-8 rounded-full gradient-mint flex items-center justify-center text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-mint-400"
                            title="My Profile"
                            onClick={openCurrentUserProfile}
                        >
                            {currentUser?.avatar || 'ME'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

import Link from 'next/link';
import { useAppDataContext } from '../context/AppDataContext';
