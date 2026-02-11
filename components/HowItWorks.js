export default function HowItWorks() {
    const steps = [
        { title: 'Smart Filter', text: 'Use our lifestyle filters to find roommates who match your habits, budget, and location preferences.', icon: '🔍' },
        { title: 'Match & Connect', text: 'Send interest requests, get matched, and start chatting with potential roommates securely.', icon: '💫' },
        { title: 'Move In Happy', text: 'Finalize your roommate agreement and enjoy a harmonious living experience with verified reviews.', icon: '🏠' }
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How RoomMatch Works</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Finding your ideal roommate is as easy as 1-2-3</p>
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
