import NavBar from '../components/NavBar'
import useAppData from '../hooks/useAppData'
import { useState, useMemo } from 'react'

export default function Messages() {
    const app = useAppData()
    const [activeChatUserId, setActiveChatUserId] = useState(null)
    const matchedUsers = useMemo(() => app.users.slice(1, 6), [app.users])

    function openChat(userId) {
        setActiveChatUserId(userId)
    }

    function send() {
        const input = document.getElementById('message-input')
        if (!input) return
        app.sendMessage(activeChatUserId, input.value)
        input.value = ''
    }

    const chatMessages = app.messages.filter(m => (m.user_id === 1 && m.target_id === (activeChatUserId || 0)) || (m.user_id === (activeChatUserId || 0) && m.target_id === 1))

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <main className="pt-16">
                <div className="flex h-[calc(100vh-5rem)]">
                    <aside className="w-80 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
                        <div className="p-4 border-b border-slate-200">
                            <h2 className="text-lg font-bold">Messages</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {matchedUsers.map(u => (
                                <div key={u.id} className={`p-4 hover:bg-slate-50 cursor-pointer ${activeChatUserId === u.id ? 'bg-mint-50' : ''}`} onClick={() => openChat(u.id)}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full gradient-mint flex items-center justify-center text-xl">{u.avatar}</div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900">{u.name}</h3>
                                            <p className="text-sm text-slate-500 truncate">Click to start chatting</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <div className="flex-1 flex flex-col">
                        {activeChatUserId ? (
                            <div className="flex-1 flex flex-col bg-slate-50">
                                <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full gradient-mint flex items-center justify-center text-white font-semibold">{app.users.find(u => u.id === activeChatUserId)?.avatar}</div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{app.users.find(u => u.id === activeChatUserId)?.name}</h3>
                                            <p className="text-sm text-green-500">Online</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {chatMessages.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="text-4xl mb-4">👋</div>
                                            <p className="text-slate-500">Start the conversation! Say hello.</p>
                                        </div>
                                    ) : (
                                        chatMessages.map(m => (
                                            <div key={m.id} className={`flex ${m.user_id === 1 ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`${m.user_id === 1 ? 'message-bubble-sent text-white' : 'message-bubble-received text-slate-800'} px-4 py-2 rounded-2xl max-w-xs`}>{m.message}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <div className="flex gap-3">
                                        <input id="message-input" type="text" placeholder="Type a message..." className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                                        <button onClick={send} className="btn-primary text-white px-6 py-3 rounded-xl font-semibold">Send</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-mint-100 rounded-full flex items-center justify-center text-5xl">💬</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No conversation selected</h3>
                                    <p className="text-slate-600">Choose a chat from the sidebar to start messaging</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
