export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 gradient-mint rounded-xl flex items-center justify-center">RM</div>
                        <span className="text-xl font-bold">RoomMatch Hà Nội</span>
                    </div>
                    <div className="text-slate-400 text-sm">© 2026 RoomMatch. Sản phẩm dành cho người Hà Nội 💚</div>
                </div>
            </div>
        </footer>
    )
}
