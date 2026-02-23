export default function Stats() {
    const stats = [
        { value: '10K+', label: 'Người dùng hoạt động' },
        { value: '5K+', label: 'Kết nối tương thích thành công' },
        { value: '98%', label: 'Mức phù hợp tối đa theo hồ sơ' },
        { value: '4.8⭐', label: 'Độ tin cậy từ đánh giá xác thực' }
    ]

    return (
        <section className="py-16 gradient-mint text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s, i) => (
                        <div key={i}>
                            <div className="text-4xl md:text-5xl font-bold mb-2">{s.value}</div>
                            <div className="text-mint-100">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
