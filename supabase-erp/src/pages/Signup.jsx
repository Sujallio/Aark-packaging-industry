import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Signup() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to login after 3 seconds
    const timer = setTimeout(() => navigate('/login'), 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">AARK ERP</h1>
        
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
          <p className="font-bold text-lg mb-2">⛔ Access Denied</p>
          <p className="text-sm">This system is restricted to authorized company owners only.</p>
          <p className="text-sm mt-2">Manual user creation is required by the administrator.</p>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-200"
        >
          Back to Login
        </button>

        <p className="text-gray-600 text-sm mt-4">Redirecting in 3 seconds...</p>
      </div>
    </div>
  )
}
