import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        background: 'linear-gradient(180deg, #8B3A3A 0%, #6B2C2C 100%)',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '24px', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#FFE8D6' }}>AARK ERP</h1>
        </div>

        <nav style={{ marginTop: '24px', paddingRight: '16px', paddingLeft: '16px' }}>
          <NavLink to="/dashboard">📊 Invoice Dashboard</NavLink>
          <NavLink to="/products">📦 Products</NavLink>
          <NavLink to="/invoices">📄 Invoices</NavLink>
          <NavLink to="/payments">💳 Payments</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '32px',
            paddingRight: '32px',
            paddingTop: '16px',
            paddingBottom: '16px'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              AARK Packaging Industries
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#1f2937', fontWeight: '600' }}>
                  {profile?.full_name || user?.email}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280', textTransform: 'capitalize' }}>
                  {profile?.role || 'User'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#8B3A3A',
                  color: 'white',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#6B2C2C'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8B3A3A'}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}

function NavLink({ to, children }) {
  const isActive = location.pathname === to
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '12px',
        borderRadius: '8px',
        marginBottom: '8px',
        textDecoration: 'none',
        color: isActive ? 'white' : '#FFE8D6',
        backgroundColor: isActive ? '#6B2C2C' : 'transparent',
        transition: 'all 0.2s',
        fontSize: '15px',
        fontWeight: '500'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#A64A4A'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {children}
    </Link>
  )
}
