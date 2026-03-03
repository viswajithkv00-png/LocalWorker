import { useNavigate } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, category }) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/request?category=${encodeURIComponent(category || title)}`)
    }

    return (
        <div
            onClick={handleClick}
            className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 text-center"
        >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
    )
}
