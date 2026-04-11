import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Invoices from './pages/Invoices'
import Payments from './pages/Payments'

// Styles
import './styles/index.css'

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth()

  // Show loading screen
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>⏳ Loading AARK ERP...</h1>
          <div style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '4px solid #2563eb',
            borderTop: '4px solid #e5e7eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  // If not authenticated, always show login page
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  // If authenticated, show dashboard and protected routes
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
      <Route path="/payments" element={<Layout><Payments /></Layout>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}
