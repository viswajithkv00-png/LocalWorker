import { Link } from 'react-router-dom'

export default function Success() {
    return (
        <section className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Request Submitted!
                </h1>
                <p className="text-gray-500 mb-8">
                    Your service request has been submitted successfully. Our team will
                    review it and assign a trusted worker shortly.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                    </svg>
                    Go Home
                </Link>
            </div>
        </section>
    )
}
