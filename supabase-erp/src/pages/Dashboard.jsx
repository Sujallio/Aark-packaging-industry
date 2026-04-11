import { useState, useEffect } from 'react'
import { dashboardService } from '../services/supabaseService'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [orderStatusData, setOrderStatusData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')
        
        // Fetch stats with better error handling
        let statsData = {}
        try {
          statsData = await dashboardService.getStats()
        } catch (e) {
          console.error('Stats error:', e)
          setError(`Failed to load stats: ${e.message}`)
          statsData = { totalOrders: 0, completedOrders: 0, totalRevenue: 0, pendingPayments: 0, lowStockCount: 0 }
        }

        // Fetch revenue chart
        let revenueData = []
        try {
          revenueData = await dashboardService.getRevenueChart()
        } catch (e) {
          console.error('Revenue chart error:', e)
        }

        // Fetch order status chart
        let statusData = []
        try {
          statusData = await dashboardService.getOrderStatusChart()
        } catch (e) {
          console.error('Order status error:', e)
        }

        setStats(statsData || { totalOrders: 0, completedOrders: 0, totalRevenue: 0, pendingPayments: 0, lowStockCount: 0 })
        setRevenueData(revenueData)
        setOrderStatusData(statusData)
      } catch (error) {
        console.error('Dashboard error:', error)
        setError(`Error loading dashboard: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '20px',
        color: '#6b7280'
      }}>
        ⏳ Loading Dashboard...
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          color: '#7f1d1d',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #fecaca',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>📊 Invoice Dashboard</h1>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px'
      }}>
        <KPICard title="Total Orders" value={stats?.totalOrders || 0} icon="📦" color="#F5E6DC" accent="#8B3A3A" />
        <KPICard title="Completed Orders" value={stats?.completedOrders || 0} icon="✅" color="#E8F0E8" accent="#4A7C59" />
        <KPICard title="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} icon="💰" color="#FFF4E6" accent="#D4A574" />
        <KPICard title="Pending Payments" value={`₹${(stats?.pendingPayments || 0).toLocaleString()}`} icon="⏳" color="#F5E6DC" accent="#8B3A3A" />
        <KPICard title="Low Stock Items" value={stats?.lowStockCount || 0} icon="⚠️" color="#FFF4E6" accent="#C68642" />
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '24px'
      }}>
        {/* Revenue Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>📈 Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>🔄 Order Status</h2>
          {orderStatusData && orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={orderStatusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
              No order data available
            </div>
          )}
        </div>
      </div>

      {/* Summary Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>📋 Quick Summary</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <SummaryItem label="Total Orders" value={stats?.totalOrders || 0} />
            <SummaryItem label="Completed" value={stats?.completedOrders || 0} />
            <SummaryItem label="Pending Orders" value={(stats?.totalOrders || 0) - (stats?.completedOrders || 0)} />
            <SummaryItem label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} />
            <SummaryItem label="Pending Payments" value={`₹${(stats?.pendingPayments || 0).toLocaleString()}`} />
            <SummaryItem label="Low Stock Items" value={stats?.lowStockCount || 0} />
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, icon, color, accent }) {
  return (
    <div style={{
      backgroundColor: color,
      border: `2px solid ${accent}`,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#4b5563', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: accent }}>{value}</p>
        </div>
        <div style={{ fontSize: '32px', marginLeft: '12px' }}>{icon}</div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      backgroundColor: '#f9fafb'
    }}>
      <p style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>{label}</p>
      <p style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>{value}</p>
    </div>
  )
}
