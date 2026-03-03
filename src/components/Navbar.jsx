import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'

const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/request', label: 'Request Service' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(
        () => localStorage.getItem('isAdminLoggedIn') === 'true'
    )

    const syncAuth = useCallback(() => {
        setLoggedIn(localStorage.getItem('isAdminLoggedIn') === 'true')
    }, [])

    useEffect(() => {
        window.addEventListener('storage', syncAuth)
        return () => window.removeEventListener('storage', syncAuth)
    }, [syncAuth])

    const navLinks = [
        ...baseLinks,
        loggedIn
            ? { to: '/admin', label: 'Admin Dashboard' }
            : { to: '/admin-login', label: 'Admin Login' },
    ]

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">🔧</span>
                        <span className="text-xl font-bold text-blue-600 tracking-tight">
                            LocalWorker
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
                        aria-label="Toggle navigation"
                    >
                        {open ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-2 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
