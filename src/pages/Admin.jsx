import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Assigned: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
}

export default function Admin({ requests, onStatusChange }) {
    const navigate = useNavigate()
    const [filterCategory, setFilterCategory] = useState('')
    const [filterLocation, setFilterLocation] = useState('')

    const categories = useMemo(
        () => [...new Set(requests.map((r) => r.category))],
        [requests]
    )
    const locations = useMemo(
        () => [...new Set(requests.map((r) => r.location))],
        [requests]
    )

    const filtered = useMemo(() => {
        return requests.filter((r) => {
            if (filterCategory && r.category !== filterCategory) return false
            if (
                filterLocation &&
                !r.location.toLowerCase().includes(filterLocation.toLowerCase())
            )
                return false
            return true
        })
    }, [requests, filterCategory, filterLocation])

    function handleLogout() {
        localStorage.removeItem('isAdminLoggedIn')
        window.dispatchEvent(new Event('storage'))
        navigate('/')
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Manage all incoming service requests from one place.
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 self-start sm:self-auto"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
                    </svg>
                    Logout
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Filter by location…"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {(filterCategory || filterLocation) && (
                    <button
                        onClick={() => {
                            setFilterCategory('')
                            setFilterLocation('')
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium self-center"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <svg
                        className="mx-auto w-12 h-12 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-lg font-medium">No requests found</p>
                    <p className="text-sm">
                        {requests.length === 0
                            ? 'No service requests have been submitted yet.'
                            : 'Try adjusting your filters.'}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    'Name',
                                    'Phone',
                                    'Location',
                                    'Category',
                                    'Description',
                                    'Date',
                                    'Time',
                                    'Status',
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((r, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                                        {r.fullName}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                        {r.phone}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                        {r.location}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                        {r.category}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                                        {r.description}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                        {r.preferredDate}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                        {r.preferredTime}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <select
                                            value={r.status}
                                            onChange={(e) => onStatusChange(i, e.target.value)}
                                            className={`text-xs font-semibold rounded-full px-3 py-1 focus:outline-none cursor-pointer ${statusColors[r.status] || ''
                                                }`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Assigned">Assigned</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <p className="mt-4 text-xs text-gray-400 text-right">
                Showing {filtered.length} of {requests.length} requests
            </p>
        </section>
    )
}
