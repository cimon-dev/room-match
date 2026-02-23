export default function HowItWorks() {
    const steps = [
        { title: 'Đo độ tương thích', text: 'Lọc theo lối sống, ngân sách, khu vực và nhận gợi ý bạn cùng phòng có mức phù hợp cao.', icon: '🔍' },
        { title: 'Kết nối an toàn', text: 'Xem hồ sơ có đánh giá xác thực, gửi yêu cầu kết nối và trò chuyện trước khi quyết định.', icon: '🛡️' },
        { title: 'Ở ghép yên tâm', text: 'So sánh hồ sơ, thống nhất kỳ vọng sống chung và bắt đầu cuộc sống hòa hợp hơn.', icon: '🏠' }
    ]

    return (
        <section data-tour="how-it-works" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cách RoomMatch hoạt động</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ưu tiên phù hợp và an toàn trong từng bước kết nối</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 gradient-mint rounded-2xl flex items-center justify-center text-4xl shadow-lg">{s.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                            <p className="text-slate-600">{s.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
