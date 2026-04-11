import { useState, useEffect } from 'react'
import { productService } from '../services/supabaseService'
import { useAuth } from '../context/AuthContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    unit_price: '',
    quantity: '',
    reorder_level: '',
    unit: 'PCS',
    supplier: '',
  })
  const { user } = useAuth()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAll()
      setProducts(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await productService.update(editingId, formData)
      } else {
        await productService.create({
          ...formData,
          unit_price: parseFloat(formData.unit_price),
          quantity: parseInt(formData.quantity),
          reorder_level: parseInt(formData.reorder_level),
          created_by: user.id,
        })
      }
      setFormData({
        name: '',
        sku: '',
        description: '',
        category: '',
        unit_price: '',
        quantity: '',
        reorder_level: '',
        unit: 'PCS',
        supplier: '',
      })
      setEditingId(null)
      setShowForm(false)
      await fetchProducts()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productService.delete(id)
        await fetchProducts()
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const handleEdit = (product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowForm(true)
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>⏳ Loading Products...</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>📦 Products & Inventory</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({
              name: '',
              sku: '',
              description: '',
              category: '',
              unit_price: '',
              quantity: '',
              reorder_level: '',
              unit: 'PCS',
              supplier: '',
            })
          }}
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
          {showForm ? '❌ Cancel' : '✚ Add Product'}
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
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              type="text"
              placeholder="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={formData.unit_price}
              onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
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
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
              type="number"
              placeholder="Reorder Level"
              value={formData.reorder_level}
              onChange={(e) => setFormData({ ...formData, reorder_level: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none',
                gridColumn: '1 / -1',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              rows="3"
            />
            <input
              type="text"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
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
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D4A574'}
          >
            {editingId ? '✎ Update' : '✓ Create'} Product
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
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Product</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>SKU</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Category</th>
              <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Price</th>
              <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Qty</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: '#1f2937' }}>{product.name}</td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{product.sku}</td>
                <td style={{ padding: '16px', color: '#4b5563' }}>{product.category || '-'}</td>
                <td style={{ padding: '16px', textAlign: 'right', color: '#1f2937', fontWeight: '600' }}>₹{product.unit_price}</td>
                <td style={{ padding: '16px', textAlign: 'right', color: '#1f2937' }}>{product.quantity}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  {product.quantity <= product.reorder_level ? (
                    <span style={{
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      ⚠️ Low Stock
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#15803d',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      ✓ In Stock
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      color: '#8B3A3A',
                      background: 'none',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginRight: '12px'
                    }}
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      color: '#8B3A3A',
                      background: 'none',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
          📭 No products found. Click "✚ Add Product" to get started!
        </div>
      )}
    </div>
  )
}
