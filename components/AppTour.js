import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Joyride, { STATUS } from 'react-joyride';

const STORAGE_KEY = 'roommatch_basic_tour_seen_v1';

const HOME_STEPS_DESKTOP = [
    {
        target: '[data-tour="nav-main"]',
        title: 'Thanh điều hướng',
        content: 'Đây là menu chính để đi nhanh giữa Trang chủ, Khám phá và Tin nhắn.',
        placement: 'bottom'
    },
    {
        target: '[data-tour="nav-discover"]',
        title: 'Trang Khám phá',
        content: 'Bấm vào Khám phá để xem danh sách hồ sơ, lọc theo nhu cầu và tìm người phù hợp.',
        placement: 'bottom'
    },
    {
        target: '[data-tour="nav-messages"]',
        title: 'Trang Tin nhắn',
        content: 'Bấm vào Tin nhắn để mở hội thoại với các kết nối và trao đổi trực tiếp.',
        placement: 'bottom'
    },
    {
        target: '[data-tour="hero-search"]',
        title: 'Tìm nhanh',
        content: 'Chọn quận và ngân sách để lọc nhanh rồi bấm Tìm kiếm.',
        placement: 'bottom'
    },
    {
        target: '[data-tour="top-carousel"]',
        title: 'Gợi ý nổi bật',
        content: 'Các hồ sơ nổi bật hiển thị ở đây, bấm vào thẻ để xem chi tiết.',
        placement: 'top'
    },
    {
        target: '[data-tour="how-it-works"]',
        title: 'Quy trình sử dụng',
        content: 'Xem 3 bước cốt lõi để bắt đầu kết nối bạn cùng phòng.',
        placement: 'top'
    }
];

const HOME_STEPS_MOBILE = [
    {
        target: '[data-tour="nav-mobile-toggle"]',
        title: 'Mở menu',
        content: 'Bấm nút 3 gạch để mở menu điều hướng.',
        placement: 'bottom'
    },
    {
        target: '[data-tour="hero-search"]',
        title: 'Tìm nhanh',
        content: 'Chọn quận và ngân sách để lọc nhanh rồi bấm Tìm kiếm.',
        placement: 'bottom'
    },
    {
        target: '[data-tour="top-carousel"]',
        title: 'Gợi ý nổi bật',
        content: 'Các hồ sơ nổi bật hiển thị ở đây, bấm vào thẻ để xem chi tiết.',
        placement: 'top'
    },
    {
        target: '[data-tour="how-it-works"]',
        title: 'Quy trình sử dụng',
        content: 'Xem 3 bước cốt lõi để bắt đầu kết nối bạn cùng phòng.',
        placement: 'top'
    }
];

const STEPS_BY_ROUTE = {
    '/': HOME_STEPS_DESKTOP,
    '/discover': [
        {
            target: '[data-tour="discover-page"]',
            title: 'Trang Khám phá',
            content: 'Đây là nơi bạn xem toàn bộ hồ sơ phù hợp theo điều kiện lọc.',
            placement: 'top'
        },
        {
            target: '[data-tour="discover-header"]',
            title: 'Kết quả lọc',
            content: 'Số lượng kết quả được cập nhật theo bộ lọc hiện tại.',
            placement: 'bottom'
        },
        {
            target: '[data-tour="discover-grid"]',
            title: 'Danh sách hồ sơ',
            content: 'Mở hồ sơ để xem độ phù hợp và gửi yêu cầu kết nối.',
            placement: 'top'
        }
    ],
    '/messages': [
        {
            target: '[data-tour="messages-page"]',
            title: 'Trang Tin nhắn',
            content: 'Nơi quản lý toàn bộ cuộc trò chuyện với các kết nối của bạn.',
            placement: 'top'
        },
        {
            target: '[data-tour="messages-layout"]',
            title: 'Bố cục chat',
            content: 'Chọn một người ở danh sách để mở khung hội thoại và bắt đầu nhắn tin.',
            placement: 'top'
        }
    ]
};

export default function AppTour() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [run, setRun] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const steps = useMemo(
        () => {
            const baseSteps = router.pathname === '/' ? (isMobile ? HOME_STEPS_MOBILE : HOME_STEPS_DESKTOP) : (STEPS_BY_ROUTE[router.pathname] || []);
            return baseSteps.map(step => ({ ...step, disableBeacon: true }));
        },
        [router.pathname, isMobile]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const updateViewport = () => setIsMobile(window.innerWidth < 768);
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    useEffect(() => {
        if (!mounted || typeof window === 'undefined') return;
        const seen = window.localStorage.getItem(STORAGE_KEY) === 'true';
        if (!seen && steps.length > 0) {
            setRun(true);
        } else {
            setRun(false);
        }
    }, [mounted, steps]);

    useEffect(() => {
        if (!mounted || typeof window === 'undefined') return;
        const restartTour = () => {
            if (steps.length === 0) return;
            setRun(false);
            window.setTimeout(() => setRun(true), 60);
        };
        window.addEventListener('roommatch:start-tour', restartTour);
        return () => window.removeEventListener('roommatch:start-tour', restartTour);
    }, [mounted, steps]);

    const handleCallback = (data) => {
        const finished = data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED;
        if (!finished) return;
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, 'true');
        }
        setRun(false);
    };

    if (!mounted || steps.length === 0) return null;

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showSkipButton
            showProgress
            disableCloseOnEsc={false}
            disableOverlayClose={false}
            spotlightClicks={false}
            callback={handleCallback}
            locale={{
                back: 'Quay lại',
                close: 'Đóng',
                last: 'Hoàn tất',
                next: 'Tiếp theo',
                skip: 'Bỏ qua'
            }}
            styles={{
                options: {
                    zIndex: 10000,
                    primaryColor: '#00CBA9'
                }
            }}
        />
    );
}
