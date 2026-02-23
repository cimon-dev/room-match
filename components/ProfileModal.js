import { useState } from 'react';

// Fake data cho reviews tổng quan (nhiều hơn, đa dạng)
const fakeReviewSummaries = [
    { id: 1, reviewer: 'Ẩn danh', rating: 5, summary: 'Bạn cùng phòng tuyệt vời, rất gọn gàng và tôn trọng.', date: '01/2026' },
    { id: 2, reviewer: 'Minh', rating: 4, summary: 'Hòa đồng, dễ nói chuyện, hợp tác tốt.', date: '12/2025' },
    { id: 3, reviewer: 'Linh', rating: 4, summary: 'Sạch sẽ, thân thiện, yêu thú cưng.', date: '10/2025' },
    { id: 4, reviewer: 'Quang', rating: 5, summary: 'Rất chu đáo, luôn giúp đỡ bạn cùng phòng.', date: '09/2025' },
    { id: 5, reviewer: 'Vy', rating: 5, summary: 'Không gian sống luôn sạch sẽ, thoải mái.', date: '08/2025' },
    { id: 6, reviewer: 'Nam', rating: 3, summary: 'Đôi khi hơi ồn ào nhưng rất tốt bụng.', date: '07/2025' },
    { id: 7, reviewer: 'Mai', rating: 4, summary: 'Nấu ăn ngon, thân thiện, dễ gần.', date: '06/2025' },
    { id: 8, reviewer: 'Bình', rating: 5, summary: 'Rất năng động, luôn tạo không khí vui vẻ.', date: '05/2025' },
    { id: 9, reviewer: 'Phúc', rating: 4, summary: 'Tôn trọng không gian riêng tư, lịch sự.', date: '04/2025' },
    { id: 10, reviewer: 'Trang', rating: 5, summary: 'Bạn cùng phòng lý tưởng, luôn hỗ trợ khi cần.', date: '03/2025' },
    { id: 11, reviewer: 'Lan', rating: 4, summary: 'Thích âm nhạc, sống tích cực.', date: '02/2025' },
    { id: 12, reviewer: 'Đức', rating: 5, summary: 'Giữ gìn vệ sinh chung rất tốt.', date: '01/2025' },
    { id: 13, reviewer: 'Hương', rating: 5, summary: 'Rất chu đáo và quan tâm.', date: '12/2024' },
    { id: 14, reviewer: 'Thảo', rating: 4, summary: 'Sáng tạo, vui vẻ, hòa đồng.', date: '11/2024' },
    { id: 15, reviewer: 'Hải', rating: 3, summary: 'Đôi khi về muộn nhưng luôn giữ trật tự.', date: '10/2024' },
    { id: 16, reviewer: 'Mai', rating: 5, summary: 'Bạn cùng phòng tuyệt vời, rất đáng tin cậy.', date: '09/2024' },
    { id: 17, reviewer: 'Ẩn danh', rating: 4, summary: 'Thân thiện, dễ gần, hợp tác tốt.', date: '08/2024' },
    { id: 18, reviewer: 'Minh', rating: 5, summary: 'Luôn giúp đỡ mọi người, rất nhiệt tình.', date: '07/2024' },
    { id: 19, reviewer: 'Vy', rating: 4, summary: 'Không gian sống thoải mái, sạch sẽ.', date: '06/2024' },
    { id: 20, reviewer: 'Quang', rating: 5, summary: 'Bạn cùng phòng mẫu mực.', date: '05/2024' }
];

import { useAppDataContext } from '../context/AppDataContext';

export default function ProfileModal({ user, onClose = () => { }, onMatch = () => { }, calculateCompatibility = () => 0, onToggleSave = () => { }, isSaved = false }) {
    if (!user) return null;
    const { currentUser } = useAppDataContext?.() || {};
    const isCurrentUser = currentUser && user.id === currentUser.id;
    const compatibility = isCurrentUser ? null : calculateCompatibility(user);
    const [openReviewId, setOpenReviewId] = useState(null);
    // Lấy dữ liệu tổng quan đánh giá (có thể lấy từ user.reviews hoặc fake data)
    const reviewSummaries = fakeReviewSummaries;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-2 sm:px-4 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md sm:max-w-2xl h-[95vh] sm:h-[80vh] overflow-y-auto flex flex-col">
                    <button onClick={onClose} className="absolute top-2 right-2 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center z-10">✕</button>
                    <div className="gradient-mint p-5 sm:p-8 text-white rounded-t-2xl sm:rounded-t-3xl">
                        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/20 flex items-center justify-center">
                                {(isCurrentUser ? currentUser?.avatarUrl : user.avatarUrl) ? (
                                    <img
                                        src={isCurrentUser ? (currentUser?.avatarUrl || '/images/boy-10.jpg') : user.avatarUrl}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={e => {
                                            e.target.onerror = null;
                                            e.target.src = isCurrentUser
                                                ? '/images/boy-10.jpg'
                                                : (user.gender === 'male' ? '/images/boy-01.jpg' : '/images/girl-01.jpg');
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full gradient-mint text-white font-bold text-2xl flex items-center justify-center">
                                        {(user.name || '?').trim().charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                    <h2 className="text-xl sm:text-2xl font-bold">{user.name}, {user.age}</h2>
                                </div>
                                <p className="text-mint-100 text-sm sm:text-base">{user.job} • {user.districtName}</p>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                    <span className="text-amber-300">★</span>
                                    <span className="font-semibold">{user.avgRating}</span>
                                </div>
                            </div>
                            {isCurrentUser ? (
                                <div className="md:ml-auto text-center mt-3 md:mt-0">
                                    <button className="btn-primary px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white bg-mint-600 hover:bg-mint-700 transition text-sm sm:text-base">Chỉnh sửa hồ sơ</button>
                                </div>
                            ) : (
                                <div className="w-full md:w-auto md:ml-auto mt-3 md:mt-0 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center mb-2 mx-auto">
                                        <span className="text-xl sm:text-2xl font-bold">{compatibility}%</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-mint-100">Điểm phù hợp</span>
                                    <div className="mt-2 sm:mt-3 flex flex-col gap-2 w-full">
                                        <button
                                            onClick={() => onToggleSave(user.id)}
                                            className="w-full px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-white/20 hover:bg-white/30"
                                        >
                                            {isSaved ? 'Đã lưu hồ sơ ✓' : 'Lưu hồ sơ'}
                                        </button>
                                        <button onClick={() => { onMatch(user.id); onClose() }} className="btn-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base">Gửi yêu cầu kết nối 💫</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-5 sm:p-8 flex-1 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Giới thiệu</h3>
                            <p className="text-slate-600 leading-relaxed">{user.bio}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-2">💰 Khoảng giá</h4>
                                <p className="text-2xl font-bold text-mint-600">{user.budgetMin} - {user.budgetMax} triệu</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4">
                                <h4 className="font-semibold text-slate-900 mb-2">📍 Khu vực mong muốn</h4>
                                <p className="text-2xl font-bold text-mint-600">{user.districtName}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Phong cách sống</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.sleep === 'early' ? '🌅' : '🦉'}</div>
                                    <div className="font-medium text-slate-900">{user.sleep === 'early' ? 'Dậy sớm' : 'Cú đêm'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.social === 'introvert' ? '🤫' : '🎉'}</div>
                                    <div className="font-medium text-slate-900">{user.social === 'introvert' ? 'Hướng nội' : 'Hướng ngoại'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.clean === 'neat' ? '✨' : '😌'}</div>
                                    <div className="font-medium text-slate-900">{user.clean === 'neat' ? 'Rất gọn gàng' : 'Bình thường'}</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl mb-2">{user.pets === 'has' ? '🐕' : user.pets === 'friendly' ? '💕' : '🚫'}</div>
                                    <div className="font-medium text-slate-900">{user.pets === 'has' ? 'Có thú cưng' : user.pets === 'friendly' ? 'Thân thiện thú cưng' : 'Không thú cưng'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Đánh giá chi tiết với thanh màu trực quan */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Đánh giá chi tiết</h3>
                            <div className="space-y-3">
                                {renderRatingBar('🔒 Riêng tư', user.ratings?.privacy ?? 4)}
                                {renderRatingBar('🧹 Vệ sinh', user.ratings?.hygiene ?? 4)}
                                {renderRatingBar('💳 Tài chính', user.ratings?.finance ?? 4)}
                                {renderRatingBar('💬 Giao tiếp', user.ratings?.communication ?? 4)}
                            </div>
                        </div>

                        {/* Đánh giá tổng quan từ bạn cùng phòng cũ */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Đánh giá từ bạn cùng phòng cũ</h3>
                            <div className="space-y-4">
                                {reviewSummaries.map((r) => (
                                    <div key={r.id} className="bg-slate-50 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-slate-900">{r.reviewer}</span>
                                            <div className="flex items-center gap-1"><span className="text-amber-500">★</span><span className="text-slate-600">{r.rating}</span></div>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-2">{r.summary}</p>
                                        <span className="text-xs text-slate-400">{r.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popup chi tiết đánh giá */}
                        {/* Bỏ popup chi tiết đánh giá */}

                        <div className="flex gap-3 mt-8 sticky bottom-0 bg-white pt-4 pb-2 z-10">
                            <button onClick={onClose} className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function renderRatingBar(label, value) {
    const percentage = (value / 5) * 100;
    let color = 'bg-mint-500';
    if (percentage < 60) color = 'bg-amber-400';
    if (percentage < 40) color = 'bg-red-400';
    return (
        <div className="flex items-center gap-3" key={label}>
            <span className="w-36 text-sm text-slate-600">{label}</span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${percentage}%` }} />
            </div>
            <span className="w-10 text-sm font-medium text-slate-900">{value}</span>
        </div>
    );
}
