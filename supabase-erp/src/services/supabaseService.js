import { supabase } from '../lib/supabaseClient'

// ============ PRODUCTS SERVICE ============
export const productService = {
  // Get all products (limited to 500 for performance)
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    return data
  },

  // Get product by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create product
  async create(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update product
  async update(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete product
  async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get low stock products (limited to 100 for performance)
  async getLowStock() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .lte('quantity', 'reorder_level')
      .limit(100)

    if (error) throw error
    return data
  },

  // Update stock
  async updateStock(id, quantity) {
    const { data, error } = await supabase
      .from('products')
      .update({ quantity })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Record stock movement
  async recordStockMovement(movement) {
    const { data, error } = await supabase
      .from('stock_movements')
      .insert([movement])
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// ============ CUSTOMERS SERVICE ============
export const customerService = {
  async getAll() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(customer) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// ============ ORDERS SERVICE ============
export const orderService = {
  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer_id (id, name, email, phone),
        order_items (id, product_id, quantity, unit_price, total_price)
      `)
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer_id (id, name, email, phone),
        order_items (id, product_id, quantity, unit_price, total_price)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async addItems(orderId, items) {
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price,
    }))

    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()

    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async getStats() {
    const { data: completedOrders } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'completed')

    const totalRevenue = completedOrders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })

    const { count: pendingOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    return {
      totalOrders,
      completedOrders: completedOrders?.length || 0,
      pendingOrders,
      totalRevenue,
    }
  },
}

// ============ INVOICES SERVICE ============
export const invoiceService = {
  async getAll() {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer_id (id, name, email, company_name),
        invoice_items (id, description, quantity, unit_price, total_price)
      `)
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer_id (id, name, email, company_name),
        invoice_items (id, description, quantity, unit_price, total_price)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(invoice) {
    const { data, error } = await supabase
      .from('invoices')
      .insert([invoice])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async addItems(invoiceId, items) {
    const invoiceItems = items.map(item => ({
      invoice_id: invoiceId,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price,
    }))

    const { data, error } = await supabase
      .from('invoice_items')
      .insert(invoiceItems)
      .select()

    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('invoices')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async uploadInvoiceImage(invoiceId, file) {
    const fileName = `invoice-${invoiceId}-${Date.now()}.jpg`
    const { data, error } = await supabase.storage
      .from('invoices')
      .upload(fileName, file)

    if (error) throw error
    return data
  },

  async getInvoiceImageUrl(path) {
    const { data } = supabase.storage
      .from('invoices')
      .getPublicUrl(path)

    return data.publicUrl
  },

  async updateOcrData(id, ocrData) {
    const { data, error } = await supabase
      .from('invoices')
      .update({ ocr_data: ocrData })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// ============ PAYMENTS SERVICE ============
export const paymentService = {
  async getAll() {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        invoice_id (*),
        order_id (*)
      `)
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(payment) {
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async getPaymentsByInvoice(invoiceId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('invoice_id', invoiceId)

    if (error) throw error
    return data
  },

  async getStats() {
    const { data: pendingPayments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'pending')

    const pendingAmount = pendingPayments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

    const { count: totalPayments } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true })

    const { count: completedPayments } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    return {
      totalPayments,
      completedPayments,
      pendingAmount,
    }
  },
}

// ============ DASHBOARD SERVICE ============
export const dashboardService = {
  async getStats() {
    try {
      // Fetch only recent orders to calculate counts (limit to last 1000 for performance)
      const { data: recentOrders, error: ordersError } = await supabase
        .from('orders')
        .select('id, status, total_amount')
        .order('created_at', { ascending: false })
        .limit(1000)

      if (ordersError) {
        console.warn('Orders fetch warning:', ordersError)
        // Don't throw, just log and continue with defaults
      }

      const totalOrders = recentOrders?.length || 0
      const completedOrders = recentOrders?.filter(o => o.status === 'completed').length || 0
      const totalRevenue = recentOrders
        ?.filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

      // Get pending payments (limit query)
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'pending')
        .limit(1000)

      if (paymentError) console.warn('Payments fetch warning:', paymentError)

      const pendingPayments = paymentData?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

      // Get low stock count (limit query)
      const { count: lowStockCount, error: stockError } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true })
        .lte('quantity', 'reorder_level')

      if (stockError) console.warn('Stock fetch warning:', stockError)

      return {
        totalOrders,
        completedOrders,
        totalRevenue,
        pendingPayments,
        lowStockCount: lowStockCount || 0,
      }
    } catch (error) {
      console.error('Dashboard stats error:', error)
      // Return defaults if there's a fatal error
      return {
        totalOrders: 0,
        completedOrders: 0,
        totalRevenue: 0,
        pendingPayments: 0,
        lowStockCount: 0,
      }
    }
  },

  async getRevenueChart() {
    try {
      // Get only last 30 days of completed orders for chart
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const startDate = thirtyDaysAgo.toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('orders')
        .select('order_date, total_amount')
        .eq('status', 'completed')
        .gte('order_date', startDate)
        .order('order_date', { ascending: true })
        .limit(100)

      if (error) {
        console.warn('Revenue chart error:', error)
        return []
      }

      // Group by date
      const grouped = {}
      data?.forEach(order => {
        const date = order.order_date
        grouped[date] = (grouped[date] || 0) + (order.total_amount || 0)
      })

      return Object.keys(grouped).map(date => ({
        date,
        amount: grouped[date],
      }))
    } catch (error) {
      console.error('Revenue chart fetch error:', error)
      return []
    }
  },

  async getOrderStatusChart() {
    try {
      // Get only recent orders for status distribution (limit to last 500)
      const { data, error } = await supabase
        .from('orders')
        .select('status')
        .order('created_at', { ascending: false })
        .limit(500)

      if (error) {
        console.warn('Order status chart error:', error)
        return []
      }

      const statusCounts = {}
      data?.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1
      })

      return Object.keys(statusCounts).map(status => ({
        status,
        count: statusCounts[status],
      }))
    } catch (error) {
      console.error('Order status chart fetch error:', error)
      return []
    }
  },
}
