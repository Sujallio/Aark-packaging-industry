# 🚀 AARK ERP - Complete Setup Guide (Owner-Only Access)

This is a **company owner-only ERP system**. Only authorized owners with admin credentials can access and manage the system.

---

## 📋 Pre-Setup Checklist

- ✅ Node.js installed
- ✅ Supabase account created
- ✅ Supabase project URL: `https://kifxpiixjtxpuexroxyc.supabase.co`
- ✅ Publishable API Key: `sb_publishable_dKCfSayCX7mmLddDkdQVRQ_Z_QNzd0y`
- ✅ Environment variables configured in `.env.local`

---

## 📌 STEP 1: Execute Database Schema (5 minutes)

### 1.1 Open Supabase SQL Editor
1. Go to **https://app.supabase.com**
2. Select your project: **Aark Packaging Industries**
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### 1.2 Copy & Execute Database Schema
1. Open file: `DATABASE_SCHEMA.sql` (already fixed with SQL comments)
2. **Copy the entire content**
3. Paste into the Supabase SQL Editor
4. Click **"Run"** button
5. You should see: ✅ **Tables created successfully**

**Tables Created:**
- `profiles` - User accounts with roles
- `products` - Inventory management
- `customers` - Customer information
- `orders` - Purchase orders
- `order_items` - Order line items
- `invoices` - Invoice records
- `invoice_items` - Invoice details
- `payments` - Payment tracking
- `stock_movements` - Inventory movements

---

## 🔑 STEP 2: Create Owner Account (3 minutes)

### 2.1 Execute Owner Creation Script
1. In the same **SQL Editor**, open a **New Query**
2. Open file: `CREATE_OWNER_ACCOUNT.sql`
3. **Copy the entire content**
4. Paste into the SQL Editor
5. Click **"Run"**
6. You should see: ✅ **Owner account created successfully!**

### 2.2 Owner Credentials
```
📧 Email:    owner@aark.com
🔐 Password: Owner@123456
👤 Role:     Admin (Company Owner)
```

**⚠️ IMPORTANT:** Change this password after first login!

#### To Change Password After Login:
1. In the Dashboard, look for a "Settings" menu (will be added in updates)
2. Or go to Supabase Dashboard > Authentication > Users > Edit Owner Account

---

## 💻 STEP 3: Install & Run Frontend (5 minutes)

### 3.1 Open PowerShell/Terminal
```powershell
cd "c:\Users\sujal\Desktop\Aark-Packaging-Industry\supabase-erp"
```

### 3.2 Install Dependencies
```powershell
npm install
```

This will install:
- React 18.2
- Vite (fast build tool)
- Tailwind CSS
- Recharts (charts)
- Supabase JS SDK
- Tesseract.js (OCR)
- And 8+ more dependencies

⏱️ **Expected time:** 2-3 minutes

### 3.3 Start Development Server
```powershell
npm run dev
```

🎉 You should see:
```
  VITE v4.5.0  ready in XXXms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🔐 STEP 4: Login with Owner Credentials

### 4.1 Open Browser
Navigate to: **http://localhost:5173/**

You'll see the AARK ERP login screen.

### 4.2 Enter Owner Credentials
```
Email:    owner@aark.com
Password: Owner@123456
```

### 4.3 Login Verification
The system will:
1. ✅ Authenticate your email & password
2. ✅ Check your role (must be 'admin')
3. ✅ Grant access to Dashboard
4. ❌ Reject any non-admin users with: **"Access Denied: Only company owner can access this ERP system"**

---

## 🎯 STEP 5: Test Features

Once logged in, you should have access to:

### Dashboard
- 📊 5 KPI Cards (Total Orders, Revenue, Payments, Low Stock, etc.)
- 📈 Revenue Chart (Line chart)
- 🥧 Order Status Chart (Pie chart)
- Summary statistics

### Products Management
- ➕ Add new products with SKU, category, price, quantity
- ✏️ Edit product details
- 🗑️ Delete products
- ⚠️ Low stock alerts (red badge when qty <= reorder level)
- 📦 View stock levels

### Orders
- ➕ Create orders for customers
- 📝 Add multiple items to order
- 💰 Auto-calculate totals
- 📊 Track order status (pending, processing, completed, cancelled)
- 📋 View order history

### Invoices
- 📄 Create invoices from orders
- 🖼️ Invoice OCR (upload image, extract text automatically)
- 💵 Calculate tax, discount, final amount
- 📧 Track invoice status (draft, issued, paid, overdue, cancelled)
- 🔍 View all invoices

### Payments
- 💳 Record payments with multiple modes:
  - 💰 Cash
  - 📱 UPI
  - 🏦 Bank Transfer
  - ✅ Check
  - 💳 Credit Card
- 🔗 Link payments to invoices
- 📊 View payment status and history

---

## 🔒 Security Features

### Owner-Only Access
- ❌ No self-signup allowed
- ✅ Owner creates additional users via Supabase admin panel
- 🔐 Role-based access control (admin role required)
- 🛡️ JWT token-based authentication

### Data Protection
- 🔐 Row-level security (RLS) on all tables
- 🔑 Foreign key constraints
- ✅ Email verification
- 📝 Audit trails (created_at, updated_at on all records)

### How to Add More Owners/Admins
To add another owner account (only an admin can do this):

**Via Supabase Dashboard:**
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Go to SQL Editor and run:
```sql
INSERT INTO public.profiles (
  id, email, full_name, role, department, phone, created_at, updated_at
) 
SELECT id, email, email, 'admin', 'Management', '+91-XXXXXXXXXX', NOW(), NOW()
FROM auth.users 
WHERE email = 'newemail@aark.com'
ON CONFLICT DO NOTHING;
```

---

## 🐛 Troubleshooting

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Database Connection Error
**Solution:**
1. Check your `.env.local` file has correct credentials
2. Verify Supabase project URL and API key
3. Ensure DATABASE_SCHEMA.sql was executed successfully

### Issue: "Access Denied: Only company owner can access"
**Solution:**
1. Verify you're using `owner@aark.com` account
2. Check if your user role in `profiles` table is set to `'admin'`
3. If not, update it via SQL:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-email@aark.com';
```

### Issue: Port 5173 already in use
**Solution:**
```powershell
# Kill the process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Then try npm run dev again
npm run dev
```

### Issue: CORS Error
**Solution:**
1. Go to Supabase Project Settings > API
2. Ensure localhost:5173 is in CORS allowed origins

---

## 📱 Production Deployment

### Build for Production
```powershell
npm run build
```

This creates optimized files in `dist/` folder.

### Deploy to Azure/Netlify/Vercel
Instructions for each platform in `README.md`

---

## 📚 File Structure

```
supabase-erp/
├── src/
│   ├── pages/
│   │   ├── Login.jsx (Owner-only login)
│   │   ├── Signup.jsx (Disabled - shows access denied)
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   ├── Invoices.jsx
│   │   └── Payments.jsx
│   ├── components/
│   │   ├── Layout.jsx (Sidebar navigation)
│   │   ├── InvoiceOCR.jsx (Image upload & text extraction)
│   │   └── ProtectedRoute.jsx (Auth guard)
│   ├── context/
│   │   └── AuthContext.jsx (Authentication state)
│   ├── services/
│   │   └── supabaseService.js (50+ API functions)
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── App.jsx (Router configuration)
│   ├── main.jsx (Entry point)
│   └── styles/
│       └── index.css (Tailwind CSS)
├── public/
├── .env.local (Supabase credentials - NOT in git)
├── .env.example (Template)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── DATABASE_SCHEMA.sql (✅ Fixed - SQL comments)
├── CREATE_OWNER_ACCOUNT.sql (✅ Create admin user)
├── README.md
├── SETUP_GUIDE.md (You are here!)
├── QUICK_START.md
└── START_HERE.md
```

---

## 🎓 Next Steps

1. ✅ Execute `DATABASE_SCHEMA.sql` in Supabase
2. ✅ Execute `CREATE_OWNER_ACCOUNT.sql` in Supabase
3. ✅ Run `npm install` & `npm run dev`
4. ✅ Login with `owner@aark.com` / `Owner@123456`
5. ✅ Test all features on Dashboard
6. 📝 Change default password
7. 📊 Create sample products and orders
8. 💳 Test payment recording
9. 🚀 Deploy to production

---

## 📞 Support

For issues or questions:
1. Check `TROUBLESHOOTING.md` for common problems
2. Review `README.md` for API reference
3. See `QUICK_START.md` for quick commands

---

**Last Updated:** April 11, 2026  
**Version:** 1.0.0 (Owner-Only Edition)  
**Status:** ✅ Ready for Use
