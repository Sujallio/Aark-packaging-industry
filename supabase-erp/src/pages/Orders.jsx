import { useState, useEffect } from 'react'
import { orderService, customerService, productService } from '../services/supabaseService'
import { useAuth } from '../context/AuthContext'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    customer_id: '',
    order_date: new Date().toISOString().split('T')[0],
    items: [{ product_id: '', quantity: '', unit_price: '' }],
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [ordersData, customersData, productsData] = await Promise.all([
          orderService.getAll(),
          customerService.getAll(),
          productService.getAll(),
        ])
        setOrders(ordersData)
        setCustomers(customersData)
        setProducts(productsData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const totalAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price || 0), 0)
      
      const order = await orderService.create({
        order_number: `ORD-${Date.now()}`,
        customer_id: parseInt(formData.customer_id),
        total_amount: totalAmount,
        status: 'pending',
        order_date: formData.order_date,
        created_by: user.id,
      })

      await orderService.addItems(order.id, formData.items.map(item => ({
        product_id: parseInt(item.product_id),
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(item.unit_price),
      })))

      setFormData({
        customer_id: '',
        order_date: new Date().toISOString().split('T')[0],
        items: [{ product_id: '', quantity: '', unit_price: '' }],
      })
      setShowForm(false)
      await orderService.getAll().then(setOrders)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>⏳ Loading Orders...</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>📋 Orders</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: showForm ? '#6b7280' : '#8B3A3A',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {showForm ? '❌ Cancel' : '✚ New Order'}
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          ❌ {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <select
              value={formData.customer_id}
              onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={formData.order_date}
              onChange={(e) => setFormData({ ...formData, order_date: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '12px', color: '#1f2937' }}>📦 Order Items</label>
            {formData.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <select
                  value={item.product_id}
                  onChange={(e) => {
                    const prod = products.find(p => p.id === parseInt(e.target.value))
                    const newItems = [...formData.items]
                    newItems[idx] = { ...item, product_id: e.target.value, unit_price: prod?.unit_price || '' }
                    setFormData({ ...formData, items: newItems })
                  }}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    flex: 1
                  }}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...formData.items]
                    newItems[idx].quantity = e.target.value
                    setFormData({ ...formData, items: newItems })
                  }}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    width: '80px'
                  }}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.unit_price}
                  onChange={(e) => {
                    const newItems = [...formData.items]
                    newItems[idx].unit_price = e.target.value
                    setFormData({ ...formData, items: newItems })
                  }}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    width: '100px'
                  }}
                  required
                />
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            style={{
              backgroundColor: '#D4A574',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C08860'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D4A574'}
          >
            ✓ Create Order
          </button>
        </form>
      )}

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Order #</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Customer</th>
              <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{order.order_number}</td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{order.customer_id?.name || 'N/A'}</td>
                <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>₹{order.total_amount}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-block',
                    backgroundColor: order.status === 'completed' ? '#dcfce7' : order.status === 'pending' ? '#FFF4E6' : '#f3f4f6',
                    color: order.status === 'completed' ? '#15803d' : order.status === 'pending' ? '#D4A574' : '#6b7280'
                  }}>
                    {order.status === 'completed' ? '✓' : order.status === 'pending' ? '⏳' : '⊘'} {order.status}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{order.order_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
          📭 No orders found. Click "✚ New Order" to get started!
        </div>
      )}
    </div>
  )
}
