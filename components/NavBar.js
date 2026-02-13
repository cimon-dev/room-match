

import { useState, useRef, useEffect } from 'react';

export default function NavBar() {
    const { currentUser, openCurrentUserProfile } = useAppDataContext();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
        }
        if (showMenu) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMenu]);

    function handleMenu(action) {
        setShowMenu(false);
        if (action === 'profile') openCurrentUserProfile();
    }

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
                        <Link href="/" className="text-slate-600 hover:text-mint-500">Trang chủ</Link>
                        <Link href="/discover" className="text-slate-600 hover:text-mint-500">Khám phá</Link>
                        <Link href="/messages" className="text-slate-600 hover:text-mint-500">Tin nhắn</Link>
                    </div>
                    <div className="flex items-center gap-3 relative">
                        <button
                            className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-mint-400"
                            title="Hồ sơ của tôi"
                            onClick={() => setShowMenu(v => !v)}
                        >
                            <img
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                alt="avatar nam"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </button>
                        {showMenu && (
                            <div ref={menuRef} className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-slate-100 min-w-[180px] z-50 transition-all duration-75">
                                <button className="block w-full text-left px-4 py-3 hover:bg-mint-50" onClick={() => handleMenu('profile')}>👤 Xem thông tin</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

import Link from 'next/link';
import { useAppDataContext } from '../context/AppDataContext';
