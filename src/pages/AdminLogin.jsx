import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!form.username.trim() || !form.password.trim()) {
            setError('Both fields are required.')
            return
        }

        if (form.username === 'admin' && form.password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true')
            window.dispatchEvent(new Event('storage'))
            navigate('/admin')
        } else {
            setError('Invalid username or password.')
        }
    }

    return (
        <section className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
                            <svg
                                className="w-7 h-7 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Enter your credentials to access the dashboard.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="admin"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
