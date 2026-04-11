import { useState, useEffect } from 'react'
import { paymentService, invoiceService } from '../services/supabaseService'
import { useAuth } from '../context/AuthContext'

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    invoice_id: '',
    amount: '',
    payment_mode: 'cash',
    payment_date: new Date().toISOString().split('T')[0],
    reference_number: '',
    notes: '',
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [paymentsData, invoicesData] = await Promise.all([
          paymentService.getAll(),
          invoiceService.getAll(),
        ])
        setPayments(paymentsData)
        setInvoices(invoicesData)
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
      await paymentService.create({
        ...formData,
        payment_number: `PAY-${Date.now()}`,
        invoice_id: parseInt(formData.invoice_id),
        amount: parseFloat(formData.amount),
        status: 'completed',
        created_by: user.id,
      })

      setFormData({
        invoice_id: '',
        amount: '',
        payment_mode: 'cash',
        payment_date: new Date().toISOString().split('T')[0],
        reference_number: '',
        notes: '',
      })
      setShowForm(false)
      const updatedPayments = await paymentService.getAll()
      setPayments(updatedPayments)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>⏳ Loading Payments...</div>
  }

  const paymentModes = ['cash', 'upi', 'bank', 'cheque', 'credit_card']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>💳 Payments</h1>
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
          {showForm ? '❌ Cancel' : '✚ Record Payment'}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <select
              value={formData.invoice_id}
              onChange={(e) => setFormData({ ...formData, invoice_id: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            >
              <option value="">Select Invoice</option>
              {invoices.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoice_number} - ₹{inv.total_amount}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
            <select
              value={formData.payment_mode}
              onChange={(e) => setFormData({ ...formData, payment_mode: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            >
              {paymentModes.map(mode => (
                <option key={mode} value={mode}>{mode.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
            <input
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              placeholder="Reference Number (optional)"
              value={formData.reference_number}
              onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <textarea
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
                gridColumn: '1 / -1'
              }}
              rows="2"
            />
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
            ✓ Record Payment
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
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Payment #</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Invoice</th>
              <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Mode</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{payment.payment_number}</td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{payment.invoice_id?.invoice_number || 'N/A'}</td>
                <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>₹{payment.amount}</td>
                <td style={{ padding: '16px', color: '#4b5563', textTransform: 'capitalize' }}>{payment.payment_mode?.replace('_', ' ')}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-block',
                    backgroundColor: '#dcfce7',
                    color: '#15803d'
                  }}>
                    ✓ {payment.status}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{payment.payment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
          📭 No payments recorded. Click "✚ Record Payment" to get started!
        </div>
      )}
    </div>
  )
}
