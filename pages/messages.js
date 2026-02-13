import React, { useState, useMemo, useEffect, useRef } from 'react';
import useAppData from '../hooks/useAppData';
import ProfileModal from '../components/ProfileModal';
import NavBar from '../components/NavBar';
import { fakeConversations } from '../data/fakeConversations';

export default function Messages() {
    const app = useAppData()
    const [activeChatUserId, setActiveChatUserId] = useState(null)
    const [profileModalUser, setProfileModalUser] = useState(null)
    // Lấy danh sách user có trong fakeConversations để hiển thị nhiều cuộc trò chuyện
    const matchedUsers = useMemo(() => {
        const ids = fakeConversations.map(c => c.userId)
        return app.users.filter(u => ids.includes(u.id))
    }, [app.users])

    function openChat(userId) {
        setActiveChatUserId(userId)
    }
    function openUserProfile(userId) {
        const u = app.users.find(x => x.id === userId)
        setProfileModalUser(u || null)
    }

    function send() {
        const input = document.getElementById('message-input')
        if (!input) return
        app.sendMessage(activeChatUserId, input.value)
        input.value = ''
    }

    // Lấy tin nhắn giả lập từ fakeConversations
    let chatMessages = []
    if (activeChatUserId) {
        const conv = fakeConversations.find(c => c.userId === activeChatUserId)
        if (conv) {
            chatMessages = conv.messages.map((m, idx) => ({
                id: idx + '-' + activeChatUserId,
                user_id: m.from,
                target_id: activeChatUserId,
                message: m.text,
                timestamp: m.time
            }))
        }
    }

    // Tự động cuộn xuống dưới cùng khi đổi cuộc trò chuyện hoặc có tin nhắn mới
    const messagesEndRef = useRef(null)
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
        }
    }, [activeChatUserId, chatMessages.length])

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <main className="pt-16">
                <div className="flex h-[calc(100vh-5rem)]">
                    {/* Sidebar cố định, có thanh cuộn nếu nhiều user */}
                    <aside className="w-80 bg-white border-r border-slate-200 h-full flex-shrink-0 flex flex-col">
                        <div className="p-4 border-b border-slate-200">
                            <h2 className="text-lg font-bold">Tin nhắn</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-hide">
                            {matchedUsers.map(u => {
                                const conv = fakeConversations.find(c => c.userId === u.id)
                                const lastMsg = conv && conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].text : ''
                                const compatibility = Math.round(app.calculateCompatibility(u))
                                return (
                                    <div key={u.id} className={`p-4 hover:bg-slate-50 cursor-pointer ${activeChatUserId === u.id ? 'bg-mint-50' : ''}`} onClick={() => openChat(u.id)}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                                <img
                                                    src={u.avatarUrl}
                                                    alt={u.name}
                                                    className="w-full h-full object-cover"
                                                    onError={e => { e.target.onerror = null; e.target.src = u.gender === 'male' ? 'https://randomuser.me/api/portraits/men/1.jpg' : 'https://randomuser.me/api/portraits/women/1.jpg'; }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-slate-900 cursor-pointer" onClick={e => { e.stopPropagation(); openUserProfile(u.id) }}>{u.name}</h3>
                                                    <div className="ml-2 flex items-center">
                                                        <div className="relative w-10 h-10 p-1 mr-2">
                                                            <svg viewBox="0 0 40 40" className="w-8 h-8">
                                                                <circle cx="20" cy="20" r="18" fill="#F1F5F9" />
                                                                <circle
                                                                    cx="20" cy="20" r="18"
                                                                    fill="none"
                                                                    stroke="#00CBA9"
                                                                    strokeWidth="4"
                                                                    strokeDasharray={Math.PI * 36}
                                                                    strokeDashoffset={Math.PI * 36 * (1 - compatibility / 100) - Math.PI * 9}
                                                                    transform="rotate(-90 20 20)"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900">
                                                                {compatibility}%
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-slate-500 truncate max-w-[160px]">{lastMsg || 'Nhấn để bắt đầu trò chuyện'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </aside>

                    {/* Khối chat bên phải */}
                    <div className="flex-1 flex flex-col bg-slate-50 h-full relative">
                        {activeChatUserId ? (
                            <div className="flex flex-col h-full w-full">
                                {/* Header cố định trên cùng */}
                                <div className="bg-white border-b border-slate-200 p-4 flex items-center gap-3 sticky top-0 z-10">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center cursor-pointer" onClick={() => openUserProfile(activeChatUserId)}>
                                        <img
                                            src={app.users.find(u => u.id === activeChatUserId)?.avatarUrl}
                                            alt={app.users.find(u => u.id === activeChatUserId)?.name}
                                            className="w-full h-full object-cover"
                                            onError={e => {
                                                const user = app.users.find(u => u.id === activeChatUserId);
                                                e.target.onerror = null;
                                                e.target.src = user?.gender === 'male' ? 'https://randomuser.me/api/portraits/men/1.jpg' : 'https://randomuser.me/api/portraits/women/1.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900 cursor-pointer" onClick={() => openUserProfile(activeChatUserId)}>{app.users.find(u => u.id === activeChatUserId)?.name}</h3>
                                        <p className="text-sm text-green-500">Online</p>
                                    </div>
                                </div>
                                {/* Khung tin nhắn cuộn, mặc định cuộn xuống dưới cùng */}
                                <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
                                    {chatMessages.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="text-4xl mb-4">👋</div>
                                            <p className="text-slate-500">Start the conversation! Say hello.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {chatMessages.map(m => (
                                                <div key={m.id} className={`flex ${m.user_id === 1 ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`${m.user_id === 1 ? 'message-bubble-sent text-white' : 'message-bubble-received text-slate-800'} px-4 py-2 rounded-2xl max-w-xs`}>{m.message}</div>
                                                </div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </>
                                    )}
                                </div>
                                {/* Input chat cố định dưới cùng */}
                                <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-10">
                                    <div className="flex gap-3">
                                        <input id="message-input" type="text" placeholder="Type a message..." className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                                        <button onClick={send} className="btn-primary text-white px-6 py-3 rounded-xl font-semibold">Send</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center bg-slate-50">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-28 h-28 mb-6 flex items-center justify-center">
                                        <svg width="80" height="80" fill="none" viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" fill="#F1F5F9" /><path d="M40 25c-10.493 0-19 6.86-19 15.313 0 4.13 2.47 7.82 6.32 10.28-.19.67-.68 2.41-1.01 3.6-.16.57.47 1.04.98.75 2.7-1.5 5.13-2.85 6.01-3.33A25.6 25.6 0 0 0 40 52.5c10.493 0 19-6.86 19-15.313C59 31.86 50.493 25 40 25Z" fill="#CBD5E1" /><circle cx="40" cy="40" r="38" stroke="#E2E8F0" strokeWidth="2" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Chưa chọn cuộc trò chuyện</h3>
                                    <p className="text-slate-500 text-base">Hãy chọn một người ở danh sách bên trái để bắt đầu nhắn tin</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {profileModalUser && (
                <ProfileModal user={profileModalUser} onClose={() => setProfileModalUser(null)} calculateCompatibility={app.calculateCompatibility} />
            )}
            );
        </div>
    );
}