// Danh sách các cuộc trò chuyện và tin nhắn mẫu (giả lập)
// Mỗi cuộc trò chuyện là giữa user_id: 1 (Minh) và một user khác

export const fakeConversations = [
    {
        userId: 2, // Linh
        messages: [
            { from: 1, text: 'Chào Linh! Bạn thường ngủ lúc mấy giờ vậy?', time: '2026-02-14T08:00:00' },
            { from: 2, text: 'Mình hay ngủ muộn, khoảng 1-2h sáng. Còn bạn?', time: '2026-02-14T08:01:00' },
            { from: 1, text: 'Mình thì hay dậy sớm, nên cũng ngủ sớm. Bạn có thấy phiền không nếu mình dậy sớm?', time: '2026-02-14T08:02:00' },
            { from: 2, text: 'Không sao đâu, miễn là bạn không làm ồn là được!', time: '2026-02-14T08:03:00' },
            { from: 1, text: 'Bạn có nuôi thú cưng không?', time: '2026-02-14T08:04:00' },
            { from: 2, text: 'Mình không nuôi, nhưng mình thích chó mèo.', time: '2026-02-14T08:05:00' },
            { from: 1, text: 'Bạn có hay tụ tập bạn bè ở nhà không?', time: '2026-02-14T08:06:00' },
            { from: 2, text: 'Thỉnh thoảng thôi, chủ yếu là cuối tuần.', time: '2026-02-14T08:07:00' },
            { from: 1, text: 'Bạn có thích dọn dẹp không?', time: '2026-02-14T08:08:00' },
            { from: 2, text: 'Mình ở mức bình thường, không quá kỹ tính.', time: '2026-02-14T08:09:00' },
            { from: 1, text: 'Bạn đang tìm phòng ở khu vực nào?', time: '2026-02-14T08:11:00' },
            { from: 2, text: 'Mình muốn ở gần trung tâm, tầm Hoàn Kiếm hoặc Ba Đình.', time: '2026-02-14T08:12:00' },
            { from: 1, text: 'Ngân sách của bạn khoảng bao nhiêu?', time: '2026-02-14T08:13:00' },
            { from: 2, text: 'Tầm 3-4 triệu/tháng là hợp lý với mình.', time: '2026-02-14T08:14:00' },
            { from: 1, text: 'Mình cũng vậy. Nếu tìm được phòng phù hợp, bạn muốn chuyển vào khi nào?', time: '2026-02-14T08:15:00' },
            { from: 2, text: 'Mình có thể chuyển ngay trong tháng này.', time: '2026-02-14T08:16:00' },
            { from: 1, text: 'Bạn có muốn đi xem phòng cùng mình cuối tuần này không?', time: '2026-02-14T08:17:00' },
            { from: 2, text: 'Được đó! Bạn gửi thông tin phòng cho mình nhé.', time: '2026-02-14T08:18:00' },
            { from: 1, text: 'Ok, mình sẽ gửi link phòng cho bạn.', time: '2026-02-14T08:19:00' },
            { from: 2, text: 'Bạn đã xem phòng nào chưa?', time: '2026-02-14T08:20:00' },
            { from: 1, text: 'Mình có xem một phòng ở Đội Cấn, giá 3.5 triệu/tháng, phòng mới đẹp.', time: '2026-02-14T08:21:00' },
            { from: 2, text: 'Phòng đó có gần chợ không?', time: '2026-02-14T08:22:00' },
            { from: 1, text: 'Cách chợ 5 phút đi bộ, gần cả Vinmart.', time: '2026-02-14T08:23:00' },
            { from: 2, text: 'Tốt quá! Cuối tuần mình đi xem nhé.', time: '2026-02-14T08:24:00' },
            { from: 1, text: 'Ok, chốt lịch sáng thứ 7 nhé.', time: '2026-02-14T08:25:00' },
            { from: 2, text: 'Cảm ơn bạn nhiều!', time: '2026-02-14T08:26:00' },
        ]
    },
    {
        userId: 3, // Hương
        messages: [
            { from: 1, text: 'Chào Hương! Bạn làm ca đêm à?', time: '2026-02-14T09:00:00' },
            { from: 3, text: 'Đúng rồi, mình hay về nhà muộn. Bạn có phiền không?', time: '2026-02-14T09:01:00' },
            { from: 1, text: 'Không đâu, mình ngủ khá sâu. Bạn có nuôi thú cưng à?', time: '2026-02-14T09:02:00' },
            { from: 3, text: 'Có, mình nuôi một chú mèo.', time: '2026-02-14T09:03:00' },
            { from: 1, text: 'Mình cũng thích mèo! Bạn có hay nấu ăn không?', time: '2026-02-14T09:04:00' },
            { from: 3, text: 'Mình nấu ăn mỗi ngày luôn.', time: '2026-02-14T09:05:00' },
            { from: 1, text: 'Bạn thích không gian yên tĩnh hay sôi động?', time: '2026-02-14T09:06:00' },
            { from: 3, text: 'Mình thích yên tĩnh để nghỉ ngơi.', time: '2026-02-14T09:07:00' },
            { from: 1, text: 'Bạn có hay dọn dẹp không?', time: '2026-02-14T09:08:00' },
            { from: 3, text: 'Mình rất gọn gàng.', time: '2026-02-14T09:09:00' },
            { from: 1, text: 'Tuyệt quá, cảm ơn bạn đã chia sẻ!', time: '2026-02-14T09:10:00' },
        ]
    },
    {
        userId: 4, // Đức
        messages: [
            { from: 1, text: 'Chào Đức! Bạn làm nghề gì vậy?', time: '2026-02-14T10:00:00' },
            { from: 4, text: 'Mình là nhà thiết kế đồ họa.', time: '2026-02-14T10:01:00' },
            { from: 1, text: 'Bạn có hay làm việc ở nhà không?', time: '2026-02-14T10:02:00' },
            { from: 4, text: 'Có, mình làm remote.', time: '2026-02-14T10:03:00' },
            { from: 1, text: 'Bạn có thích không gian yên tĩnh không?', time: '2026-02-14T10:04:00' },
            { from: 4, text: 'Rất thích, mình cần tập trung.', time: '2026-02-14T10:05:00' },
            { from: 1, text: 'Bạn có hút thuốc không?', time: '2026-02-14T10:06:00' },
            { from: 4, text: 'Không, mình không hút thuốc.', time: '2026-02-14T10:07:00' },
            { from: 1, text: 'Bạn có hay mời bạn bè về nhà không?', time: '2026-02-14T10:08:00' },
            { from: 4, text: 'Rất ít khi, mình thích yên tĩnh.', time: '2026-02-14T10:09:00' },
            { from: 1, text: 'Cảm ơn Đức nhé!', time: '2026-02-14T10:10:00' },
        ]
    },
    {
        userId: 5, // Nam
        messages: [
            { from: 1, text: 'Chào Nam! Bạn có hay tập thể dục không?', time: '2026-02-14T11:00:00' },
            { from: 5, text: 'Mình tập gym mỗi sáng.', time: '2026-02-14T11:01:00' },
            { from: 1, text: 'Bạn có thích nấu ăn không?', time: '2026-02-14T11:02:00' },
            { from: 5, text: 'Mình thích nấu các món healthy.', time: '2026-02-14T11:03:00' },
            { from: 1, text: 'Bạn có hay dọn dẹp không?', time: '2026-02-14T11:04:00' },
            { from: 5, text: 'Mình khá gọn gàng.', time: '2026-02-14T11:05:00' },
            { from: 1, text: 'Bạn có thích nuôi thú cưng không?', time: '2026-02-14T11:06:00' },
            { from: 5, text: 'Mình thích chó, nhưng chưa có điều kiện nuôi.', time: '2026-02-14T11:07:00' },
            { from: 1, text: 'Bạn có hay tụ tập bạn bè không?', time: '2026-02-14T11:08:00' },
            { from: 5, text: 'Chủ yếu là đi chơi ngoài, ít khi về nhà.', time: '2026-02-14T11:09:00' },
            { from: 1, text: 'Cảm ơn Nam nhé!', time: '2026-02-14T11:10:00' },
        ]
    },
    // Thêm nhiều cuộc trò chuyện và tin nhắn hơn nếu muốn...
    {
        userId: 6, // Nam (user mới)
        messages: [
            { from: 1, text: 'Chào Nam! Bạn làm tự do à?', time: '2026-02-14T12:00:00' },
            { from: 6, text: 'Đúng rồi, mình làm freelancer nên thời gian linh hoạt.', time: '2026-02-14T12:01:00' },
            { from: 1, text: 'Bạn có hay ở nhà không?', time: '2026-02-14T12:02:00' },
            { from: 6, text: 'Mình ở nhà khá nhiều, chủ yếu làm việc online.', time: '2026-02-14T12:03:00' },
            { from: 1, text: 'Bạn có nuôi thú cưng không?', time: '2026-02-14T12:04:00' },
            { from: 6, text: 'Có, mình nuôi một chú chó nhỏ.', time: '2026-02-14T12:05:00' },
            { from: 1, text: 'Bạn có phiền nếu bạn cùng phòng không nuôi thú cưng?', time: '2026-02-14T12:06:00' },
            { from: 6, text: 'Không đâu, miễn là mọi người vui vẻ là được.', time: '2026-02-14T12:07:00' },
            { from: 1, text: 'Bạn dự định ở lâu dài hay ngắn hạn?', time: '2026-02-14T12:08:00' },
            { from: 6, text: 'Mình muốn ở ít nhất 1 năm.', time: '2026-02-14T12:09:00' },
            { from: 1, text: 'Ngân sách của bạn khoảng bao nhiêu?', time: '2026-02-14T12:10:00' },
            { from: 6, text: 'Tầm 3-4 triệu/tháng là hợp lý.', time: '2026-02-14T12:11:00' },
            { from: 1, text: 'Bạn có muốn đi xem phòng cùng mình không?', time: '2026-02-14T12:12:00' },
            { from: 6, text: 'Cuối tuần này mình rảnh, đi được nhé!', time: '2026-02-14T12:13:00' },
            { from: 1, text: 'Ok, mình sẽ gửi thông tin phòng cho bạn.', time: '2026-02-14T12:14:00' },
            { from: 6, text: 'Cảm ơn bạn nhiều!', time: '2026-02-14T12:15:00' },
        ]
    },
    {
        userId: 7, // Quang (user mới)
        messages: [
            { from: 1, text: 'Chào Quang! Bạn làm giáo viên à?', time: '2026-02-14T13:00:00' },
            { from: 7, text: 'Đúng rồi, mình dạy cấp 3.', time: '2026-02-14T13:01:00' },
            { from: 1, text: 'Bạn thích không gian yên tĩnh đúng không?', time: '2026-02-14T13:02:00' },
            { from: 7, text: 'Mình thích yên tĩnh để đọc sách và chuẩn bị bài.', time: '2026-02-14T13:03:00' },
            { from: 1, text: 'Bạn có hút thuốc không?', time: '2026-02-14T13:04:00' },
            { from: 7, text: 'Không, mình không hút thuốc.', time: '2026-02-14T13:05:00' },
            { from: 1, text: 'Bạn dự định ở bao lâu?', time: '2026-02-14T13:06:00' },
            { from: 7, text: 'Mình muốn ở ổn định lâu dài.', time: '2026-02-14T13:07:00' },
            { from: 1, text: 'Ngân sách của bạn là bao nhiêu?', time: '2026-02-14T13:08:00' },
            { from: 7, text: 'Khoảng 4-5 triệu/tháng.', time: '2026-02-14T13:09:00' },
            { from: 1, text: 'Bạn có muốn đi xem phòng cùng mình cuối tuần này không?', time: '2026-02-14T13:10:00' },
            { from: 7, text: 'Được, bạn gửi thông tin phòng nhé.', time: '2026-02-14T13:11:00' },
            { from: 1, text: 'Ok, mình sẽ gửi link phòng cho bạn.', time: '2026-02-14T13:12:00' },
            { from: 7, text: 'Cảm ơn bạn!', time: '2026-02-14T13:13:00' },
        ]
    },
    {
        userId: 8, // Mai (user mới)
        messages: [
            { from: 1, text: 'Chào Mai! Bạn làm đầu bếp à?', time: '2026-02-14T14:00:00' },
            { from: 8, text: 'Đúng rồi, mình thích nấu ăn cho bạn cùng phòng.', time: '2026-02-14T14:01:00' },
            { from: 1, text: 'Bạn có hay tụ tập bạn bè ở nhà không?', time: '2026-02-14T14:02:00' },
            { from: 8, text: 'Thỉnh thoảng, chủ yếu là mời bạn bè ăn tối.', time: '2026-02-14T14:03:00' },
            { from: 1, text: 'Bạn có phiền nếu bạn cùng phòng không thích đông người?', time: '2026-02-14T14:04:00' },
            { from: 8, text: 'Không đâu, mình tôn trọng không gian riêng.', time: '2026-02-14T14:05:00' },
            { from: 1, text: 'Bạn dự định ở bao lâu?', time: '2026-02-14T14:06:00' },
            { from: 8, text: 'Mình muốn ở ít nhất 1 năm.', time: '2026-02-14T14:07:00' },
            { from: 1, text: 'Ngân sách của bạn là bao nhiêu?', time: '2026-02-14T14:08:00' },
            { from: 8, text: 'Khoảng 5-6 triệu/tháng.', time: '2026-02-14T14:09:00' },
            { from: 1, text: 'Bạn có muốn đi xem phòng cùng mình không?', time: '2026-02-14T14:10:00' },
            { from: 8, text: 'Cuối tuần này mình rảnh, đi được nhé!', time: '2026-02-14T14:11:00' },
            { from: 1, text: 'Ok, mình sẽ gửi thông tin phòng cho bạn.', time: '2026-02-14T14:12:00' },
            { from: 8, text: 'Cảm ơn bạn nhiều!', time: '2026-02-14T14:13:00' },
        ]
    },
]
