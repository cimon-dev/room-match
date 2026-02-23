export default function HowItWorks() {
    const steps = [
        { title: 'Lọc thông minh', text: 'Sử dụng bộ lọc lối sống để tìm bạn cùng phòng phù hợp với thói quen, ngân sách và vị trí mong muốn.', icon: '🔍' },
        { title: 'Kết nối & trò chuyện', text: 'Gửi yêu cầu kết bạn, ghép đôi và bắt đầu trò chuyện an toàn với bạn cùng phòng tiềm năng.', icon: '💫' },
        { title: 'Chuyển vào vui vẻ', text: 'Hoàn tất thỏa thuận và tận hưởng cuộc sống hòa hợp với đánh giá xác thực.', icon: '🏠' }
    ]

    return (
        <section data-tour="how-it-works" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cách RoomMatch hoạt động</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Tìm bạn cùng phòng lý tưởng dễ dàng như 1-2-3</p>
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
