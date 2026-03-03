import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

const services = [
    {
        icon: '⚡',
        title: 'Electrical',
        description:
            'Wiring, repairs, installations & troubleshooting by certified electricians.',
    },
    {
        icon: '🔧',
        title: 'Plumbing',
        description:
            'Leak fixes, pipe fitting, bathroom fittings & drainage solutions.',
    },
    {
        icon: '🔥',
        title: 'Welding',
        description:
            'Metal fabrication, gate welding, grille work & structural repairs.',
    },
    {
        icon: '🧹',
        title: 'Cleaning',
        description:
            'Deep cleaning, move-in/out cleaning, kitchen & bathroom sanitation.',
    },
    {
        icon: '🪚',
        title: 'Carpenter',
        description:
            'Furniture assembly, door/window fitting, custom woodwork & repairs.',
    },
    {
        icon: '🎨',
        title: 'Painting',
        description:
            'Interior & exterior painting, wall textures, waterproofing & polishing.',
    },
]

export default function Home() {
    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        Find Trusted Local Workers
                        <br />
                        <span className="text-blue-200">Easily &amp; Quickly</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100 leading-relaxed">
                        Need a plumber, electrician, or painter? Submit a service request and
                        we'll connect you with verified local professionals — no phone number
                        hunting required.
                    </p>
                    <Link
                        to="/request"
                        className="mt-8 inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
                    >
                        Request a Service
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Services */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Our Services
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                        We offer a wide range of home services performed by experienced,
                        background-verified workers in your locality.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s) => (
                        <ServiceCard
                            key={s.title}
                            icon={s.icon}
                            title={s.title}
                            description={s.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
