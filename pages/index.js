import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import { useAppDataContext } from '../context/AppDataContext'
import Carousel from '../components/Carousel'
import Toast from '../components/Toast'
import HowItWorks from '../components/HowItWorks'

import Stats from '../components/Stats'

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
                <section className="max-w-7xl mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Top Rated Roommates (demo)</h2>
                    <p className="text-slate-600">This app mirrors the single-file prototype with components and state.</p>
                </section>
            </main>
            <Toast toast={app.toast} />
            <Footer />
        </div>
    )
}
