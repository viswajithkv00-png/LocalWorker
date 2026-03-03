export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-3">About LocalWorker</h3>
                        <p className="text-sm leading-relaxed">
                            We connect you with trusted, verified local workers for all your
                            home service needs — from plumbing and electrical to painting and
                            carpentry.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/request" className="hover:text-white transition-colors">Request Service</a></li>
                            <li><a href="/admin" className="hover:text-white transition-colors">Admin Dashboard</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-3">Contact Us</h3>
                        <p className="text-sm">
                            📧{' '}
                            <a
                                href="mailto:support@localworker.com"
                                className="hover:text-white transition-colors"
                            >
                                support@localworker.com
                            </a>
                        </p>
                        <p className="text-sm mt-1">📞 +91 98765 43210</p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm">
                    © {new Date().getFullYear()} LocalWorker. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
