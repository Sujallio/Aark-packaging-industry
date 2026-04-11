import { useState, useEffect } from 'react'
import { invoiceService } from '../services/supabaseService'
import { useAuth } from '../context/AuthContext'
import InvoiceOCR from '../components/InvoiceOCR'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showOCR, setShowOCR] = useState(false)
  const [formData, setFormData] = useState({
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    items: [{ description: '', quantity: '', unit_price: '' }],
    subtotal: 0,
    tax_amount: 0,
    discount_amount: 0,
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const invoicesData = await invoiceService.getAll()
        setInvoices(invoicesData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const calculateTotals = (items, tax, discount) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price || 0), 0)
    const total = subtotal + (tax || 0) - (discount || 0)
    return { subtotal, total }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { subtotal, total } = calculateTotals(
        formData.items,
        parseFloat(formData.tax_amount) || 0,
        parseFloat(formData.discount_amount) || 0
      )

      const invoice = await invoiceService.create({
        invoice_number: `INV-${Date.now()}`,
        subtotal,
        tax_amount: parseFloat(formData.tax_amount) || 0,
        discount_amount: parseFloat(formData.discount_amount) || 0,
        total_amount: total,
        status: 'draft',
        invoice_date: formData.invoice_date,
        due_date: formData.due_date,
        created_by: user.id,
      })

      setFormData({
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: '',
        items: [{ description: '', quantity: '', unit_price: '' }],
        subtotal: 0,
        tax_amount: 0,
        discount_amount: 0,
      })
      setShowForm(false)
      const updated = await invoiceService.getAll()
      setInvoices(updated)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>⏳ Loading Invoices...</div>
  }

  const { subtotal, total } = calculateTotals(formData.items, formData.tax_amount, formData.discount_amount)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>📄 Invoices</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowOCR(!showOCR)}
            style={{
              backgroundColor: showOCR ? '#6b7280' : '#D4A574',
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
            {showOCR ? '❌ Cancel' : '📸 OCR'}
          </button>
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
            {showForm ? '❌ Cancel' : '✚ New Invoice'}
          </button>
        </div>
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

      {showOCR && <InvoiceOCR onClose={() => setShowOCR(false)} />}

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
            <input
              type="date"
              value={formData.invoice_date}
              onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '12px', color: '#1f2937' }}>📋 Invoice Items</label>
            {formData.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...formData.items]
                    newItems[idx].description = e.target.value
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
                />
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '16px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Tax Amount</label>
              <input
                type="number"
                value={formData.tax_amount}
                onChange={(e) => setFormData({ ...formData, tax_amount: e.target.value })}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Discount</label>
              <input
                type="number"
                value={formData.discount_amount}
                onChange={(e) => setFormData({ ...formData, discount_amount: e.target.value })}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Total</label>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#8B3A3A' }}>₹{total.toFixed(2)}</div>
            </div>
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
            ✓ Create Invoice
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
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Invoice #</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Customer</th>
              <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{invoice.invoice_number}</td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{invoice.customer_id?.name || 'N/A'}</td>
                <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>₹{invoice.total_amount}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-block',
                    backgroundColor: invoice.status === 'paid' ? '#dcfce7' : invoice.status === 'pending' ? '#FFF4E6' : '#f3f4f6',
                    color: invoice.status === 'paid' ? '#15803d' : invoice.status === 'pending' ? '#D4A574' : '#6b7280'
                  }}>
                    {invoice.status === 'paid' ? '✓' : invoice.status === 'pending' ? '⏳' : '📋'} {invoice.status}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{invoice.invoice_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
          📭 No invoices found. Click "✚ New Invoice" to get started!
        </div>
      )}
    </div>
  )
}
