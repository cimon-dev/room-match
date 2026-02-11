export default function Toast({ toast }) {
    if (!toast || !toast.visible) return null
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slideIn">
                <span>{toast.icon}</span>
                <span>{toast.message}</span>
            </div>
        </div>
    )
}
