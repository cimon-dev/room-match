export default function Stats() {
    const stats = [
        { value: '10K+', label: 'Active Users' },
        { value: '5K+', label: 'Successful Matches' },
        { value: '12', label: 'Hanoi Districts' },
        { value: '4.8⭐', label: 'Average Rating' }
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
