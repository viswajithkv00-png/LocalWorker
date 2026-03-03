import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RequestService from './pages/RequestService'
import Success from './pages/Success'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'
  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />
  }
  return children
}

export default function App() {
  const [requests, setRequests] = useState([])

  function handleNewRequest(data) {
    setRequests((prev) => [...prev, data])
  }

  function handleStatusChange(index, newStatus) {
    setRequests((prev) =>
      prev.map((r, i) => (i === index ? { ...r, status: newStatus } : r))
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/request"
            element={<RequestService onSubmit={handleNewRequest} />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin
                  requests={requests}
                  onStatusChange={handleStatusChange}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
