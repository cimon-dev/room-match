import Link from 'next/link';
import { useAppDataContext } from '../context/AppDataContext';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';


export default function NavBar() {
    const { currentUser, openCurrentUserProfile } = useAppDataContext();
    const [showMenu, setShowMenu] = useState(false); // user menu (avatar)
    const [showMobileMenu, setShowMobileMenu] = useState(false); // mobile nav menu
    const menuRef = useRef();
    const mobileMenuRef = useRef();
    const router = useRouter();

    // Đóng user menu khi click ngoài
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
        }
        if (showMenu) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMenu]);

    // Đóng mobile menu khi click ngoài
    useEffect(() => {
        function handleClickOutside(e) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setShowMobileMenu(false);
        }
        if (showMobileMenu) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMobileMenu]);

    function handleMenu(action) {
        setShowMenu(false);
        if (action === 'profile') openCurrentUserProfile();
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 px-1 sm:px-0">
                    {/* Logo */}
                    <div className="flex items-center gap-2 min-w-0">
                        <Link href="/" className="flex items-center gap-2 min-w-0">
                            <img
                                src="/images/logo.jpg"
                                alt="RoomMatch logo"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shrink-0"
                            />
                            <span className="text-lg sm:text-xl font-bold gradient-text whitespace-nowrap">RoomMatch</span>
                        </Link>
                    </div>
                    {/* Hamburger menu button for mobile */}
                    <button
                        className="md:hidden flex items-center px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-mint-400"
                        onClick={() => setShowMobileMenu(v => !v)}
                        aria-label="Mở menu"
                    >
                        <svg className="h-6 w-6 text-mint-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {/* Main menu for desktop */}
                    <div className="hidden md:flex items-center gap-4 sm:gap-6">
                        <Link href="/" className="text-slate-600 hover:text-mint-500 whitespace-nowrap">Trang chủ</Link>
                        <Link href="/discover" className="text-slate-600 hover:text-mint-500 whitespace-nowrap">Khám phá</Link>
                        <Link href="/messages" className="text-slate-600 hover:text-mint-500 whitespace-nowrap">Tin nhắn</Link>
                        <div className="flex items-center gap-2 sm:gap-3 relative">
                            <button
                                className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-mint-400"
                                title="Hồ sơ của tôi"
                                onClick={() => setShowMenu(v => !v)}
                            >
                                <img
                                    src={currentUser?.avatarUrl || '/images/boy-10.jpg'}
                                    alt={currentUser?.name || 'avatar'}
                                    className="w-full h-full object-cover rounded-full"
                                    onError={e => { e.target.onerror = null; e.target.src = '/images/boy-10.jpg'; }}
                                />
                            </button>
                            {/* User menu (profile) */}
                            {showMenu && (
                                <div ref={menuRef} className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-slate-100 min-w-[180px] z-50 transition-all duration-75">
                                    <button className="block w-full text-left px-4 py-3 hover:bg-mint-50" onClick={() => handleMenu('profile')}>👤 Xem thông tin</button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu dropdown */}
                    {showMobileMenu && (
                        <div ref={mobileMenuRef} className="md:hidden absolute top-14 left-0 w-full bg-white shadow-lg z-40 flex flex-col items-stretch px-2 py-2 gap-1 sm:gap-2">
                            <button
                                className="w-full text-left text-slate-600 hover:text-mint-500 py-2 rounded"
                                onClick={() => { router.push('/').then(() => setShowMobileMenu(false)); }}
                            >Trang chủ</button>
                            <button
                                className="w-full text-left text-slate-600 hover:text-mint-500 py-2 rounded"
                                onClick={() => { router.push('/discover').then(() => setShowMobileMenu(false)); }}
                            >Khám phá</button>
                            <button
                                className="w-full text-left text-slate-600 hover:text-mint-500 py-2 rounded"
                                onClick={() => { router.push('/messages').then(() => setShowMobileMenu(false)); }}
                            >Tin nhắn</button>
                            <div className="w-full border-t border-slate-200 my-2"></div>
                            <button
                                className="flex flex-col items-center w-full py-2 bg-mint-50 rounded-xl hover:bg-mint-100 transition"
                                onClick={() => { setShowMobileMenu(false); handleMenu('profile'); }}
                            >
                                <img
                                    src={currentUser?.avatarUrl || '/images/boy-10.jpg'}
                                    alt={currentUser?.name || 'avatar'}
                                    className="w-10 h-10 object-cover rounded-full border mb-1"
                                    onError={e => { e.target.onerror = null; e.target.src = '/images/boy-10.jpg'; }}
                                />
                                <span className="font-semibold text-mint-600 mt-1 text-sm">👤 Xem thông tin</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
