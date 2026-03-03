import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const categories = [
    'Electrical',
    'Plumbing',
    'Welding',
    'Cleaning',
    'Carpenter',
    'Painting',
]

const initialForm = {
    fullName: '',
    phone: '',
    location: '',
    category: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
}

export default function RequestService({ onSubmit }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    // Auto-select category from URL query param (runs once on mount / param change)
    useEffect(() => {
        const cat = searchParams.get('category')
        if (cat && categories.includes(cat)) {
            setForm((prev) => ({ ...prev, category: cat }))
        }
    }, [searchParams])

    function validate(data) {
        const errs = {}
        if (!data.fullName.trim()) errs.fullName = 'Full name is required.'
        if (!data.phone.trim()) {
            errs.phone = 'Phone number is required.'
        } else if (!/^\d{7,15}$/.test(data.phone.trim())) {
            errs.phone = 'Phone must be a valid numeric value (7‑15 digits).'
        }
        if (!data.location.trim()) errs.location = 'Location is required.'
        if (!data.category) errs.category = 'Please select a service category.'
        if (!data.description.trim()) errs.description = 'Work description is required.'
        if (!data.preferredDate) errs.preferredDate = 'Preferred date is required.'
        if (!data.preferredTime) errs.preferredTime = 'Preferred time is required.'
        return errs
    }

    function handleChange(e) {
        const { name, value } = e.target
        const next = { ...form, [name]: value }
        setForm(next)
        if (touched[name]) {
            setErrors(validate(next))
        }
    }

    function handleBlur(e) {
        const { name } = e.target
        setTouched((t) => ({ ...t, [name]: true }))
        setErrors(validate(form))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const allTouched = Object.keys(initialForm).reduce(
            (acc, k) => ({ ...acc, [k]: true }),
            {}
        )
        setTouched(allTouched)
        const errs = validate(form)
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        onSubmit({ ...form, status: 'Pending' })
        setForm(initialForm)
        setTouched({})
        navigate('/success')
    }

    const hasErrors = Object.keys(validate(form)).length > 0

    const inputCls = (name) =>
        `w-full rounded-lg border ${errors[name] && touched[name]
            ? 'border-red-400 focus:ring-red-400'
            : 'border-gray-300 focus:ring-blue-500'
        } px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition`

    return (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Service</h1>
            <p className="text-gray-500 mb-8">
                Fill out the form below and we'll assign a verified worker for you.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={inputCls('fullName')}
                    />
                    {errors.fullName && touched.fullName && (
                        <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="9876543210"
                        className={inputCls('phone')}
                    />
                    {errors.phone && touched.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="City or area name"
                        className={inputCls('location')}
                    />
                    {errors.location && touched.location && (
                        <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputCls('category')}
                    >
                        <option value="">-- Select a category --</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {errors.category && touched.category && (
                        <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Work Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Describe the work you need done…"
                        className={inputCls('description')}
                    />
                    {errors.description && touched.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                    )}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="preferredDate"
                            value={form.preferredDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={inputCls('preferredDate')}
                        />
                        {errors.preferredDate && touched.preferredDate && (
                            <p className="mt-1 text-xs text-red-500">{errors.preferredDate}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            name="preferredTime"
                            value={form.preferredTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={inputCls('preferredTime')}
                        />
                        {errors.preferredTime && touched.preferredTime && (
                            <p className="mt-1 text-xs text-red-500">{errors.preferredTime}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={hasErrors}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${hasErrors
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    Submit Request
                </button>
            </form>
        </section>
    )
}
