import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('owner@aark.com')
  const [password, setPassword] = useState('Owner@123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      
      // Check if user is admin/owner
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut()
        setError('❌ Access Denied: Only company owner can access this ERP system')
        return
      }

      navigate('/dashboard')
    } catch (error) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        width: '100%',
        maxWidth: '448px'
      }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '8px'
        }}>AARK ERP</h1>
        
        <p style={{
          textAlign: 'center',
          color: '#4b5563',
          marginBottom: '8px'
        }}>Company Owner Portal</p>
        


        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            borderLeft: '4px solid #dc2626',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '8px'
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@aark.com"
              autoComplete="email"
              style={{
                width: '100%',
                padding: '10px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              disabled={loading}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '8px'
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '10px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              fontSize: '14px'
            }}
          >
            {loading ? '⏳ Signing in...' : '✓ Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#fef3c7',
          borderLeft: '4px solid #d97706',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#4b5563'
        }}>
         {/* <p style={{ fontWeight: '600', marginBottom: '8px' }}>🔐 Owner Credentials (Pre-filled):</p> */}
          {/* <p><strong>Email:</strong> owner@aark.com</p> */}
          {/* <p><strong>Password:</strong> Owner@123456</p> */}
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
            Only authorized company owners can access this system
          </p>
        </div>
      </div>
    </div>
  )
}
