import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import { useAppDataContext } from '../context/AppDataContext'
import Carousel from '../components/Carousel'
import Toast from '../components/Toast'
import HowItWorks from '../components/HowItWorks'
import Stats from '../components/Stats'
import TopRatedRoommates from '../components/TopRatedRoommates'
import Footer from '../components/Footer'

export default function Home() {
    const app = useAppDataContext();

    return (
        <div className="min-h-screen bg-slate-50">
            <NavBar />
            <main className="pt-16">
                <Hero />
                <Carousel users={app.users} onOpenProfile={app.openProfile} />
                <HowItWorks />
                <Stats />
                <TopRatedRoommates />
            </main>
            <Toast toast={app.toast} />
            <Footer />
        </div>
    )
}
