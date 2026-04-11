# 🚀 AARK ERP System - Setup Guide

Complete step-by-step guide to set up and run the AARK ERP system with Supabase backend.

## 📋 Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Supabase Account** ([Free at supabase.com](https://supabase.com))
- **Git** (optional, for version control)

---

## 🔧 Step 1: Create Supabase Project

### 1.1 Sign up / Log in to Supabase
- Go to [supabase.com](https://supabase.com)
- Sign up with email or GitHub
- Log in to your account

### 1.2 Create a New Project
1. Click **New Project**
2. Fill in project details:
   - **Name**: `aark-erp` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
3. Click **Create new project**
4. Wait for project initialization (2-3 minutes)

### 1.3 Get Your API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. Keep these safe! (You'll need them next)

---

## 🗄️ Step 2: Set Up Database Schema

### 2.1 Run Database SQL
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy **entire contents** of `DATABASE_SCHEMA.sql` from the project
4. Paste into SQL editor
5. Click **Run** (▶️ button)
6. Wait for all queries to execute successfully

### 2.2 Create Storage Bucket (for Invoice Images)
1. Go to **Storage** in Supabase dashboard
2. Click **Create a new bucket**
3. **Name**: `invoices`
4. Toggle **Public bucket** → ON (for easy image access)
5. Click **Create bucket**

Your database is now ready! ✅

---

## 💻 Step 3: Set Up Frontend Project

### 3.1 Install Dependencies
```bash
# Navigate to project directory
cd supabase-erp

# Install packages
npm install
```

### 3.2 Configure Environment Variables
1. Create `.env.local` file in project root:
```bash
# Copy .env.example to .env.local
cp .env.example .env.local
```

2. Edit `.env.local` and replace:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxx...xxxxx
VITE_APP_NAME=AARK ERP System
```

### 3.3 Verify Configuration
```bash
# Check if .env.local is created
cat .env.local
# Should show your Supabase credentials
```

---

## 🏃 Step 4: Run the Application

### 4.1 Start Development Server
```bash
# From project root
npm run dev
```

### 4.2 Application Will Open Automatically
- **Frontend**: http://localhost:3000
- **Backend**: Supabase Cloud (no local setup needed)

---

## 📝 Step 5: Create Test User (First Time Only)

### 5.1 Signup via UI
1. Open http://localhost:3000
2. Click **Sign Up**
3. Enter:
   - **Full Name**: Your Name
   - **Email**: your@email.com
   - **Password**: Your Password (min 6 chars)
4. Click **Sign Up**
5. You'll be redirected to login
6. Enter your credentials to login

### 5.2 Make Your User an Admin (Optional)
1. Go to Supabase **SQL Editor**
2. Run this query:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your@email.com';
```
3. Log out and log in again

---

## 📦 Step 6: Add Sample Data

### 6.1 Create Products
1. Click **Products** in sidebar
2. Click **+ Add Product**
3. Fill in product details:
   - **Name**: Packaging Box A
   - **SKU**: PKG-001
   - **Category**: Packaging
   - **Unit Price**: 150
   - **Quantity**: 500
   - **Reorder Level**: 50
4. Click **Create Product**
5. Add 3-5 more products for testing

### 6.2 Add Customers (For Orders)
Need to add customer creation form? Use this SQL:
```sql
INSERT INTO public.customers (name, email, company_name, phone, address)
VALUES 
  ('ABC Manufacturing', 'contact@abc.com', 'ABC Co.', '9876543210', '123 Industrial St'),
  ('XYZ Distribution', 'sales@xyz.com', 'XYZ Ltd', '9876543211', '456 Trade Hub'),
  ('LMN Retail', 'info@lmn.com', 'LMN Store', '9876543212', '789 Market St');
```

1. Go to **SQL Editor** in Supabase
2. Paste above query
3. Click **Run**

### 6.3 Create Orders
1. Click **Orders** in sidebar
2. Click **+ New Order**
3. Select a customer and add products
4. Click **Create Order**

### 6.4 Create Invoices
1. Click **Invoices** in sidebar
2. Click **+ New Invoice**
3. Enter customer and items
4. Click **Create Invoice**

---

## 🧪 Step 7: Test Key Features

### ✅ Authentication
- [ ] Sign up with new email
- [ ] Login/Logout works
- [ ] Protected routes redirect to login
- [ ] User profile shows correct name/email

### ✅ Dashboard
- [ ] KPI cards display correctly
- [ ] Charts load without errors
- [ ] Stats update when data changes
- [ ] Date filters work

### ✅ Products
- [ ] Can add new product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Low stock badge appears when qty ≤ reorder level
- [ ] Search/filter works

### ✅ Orders
- [ ] Can create order with multiple items
- [ ] Customer dropdown populates correctly
- [ ] Total amount auto-calculates
- [ ] Order status can be updated

### ✅ Invoices
- [ ] Can create invoice
- [ ] Tax and discount calculations work
- [ ] Total amount is correct
- [ ] OCR upload works (Tesseract.js)
- [ ] Extraction shows confidence score

### ✅ Payments
- [ ] Can record payment
- [ ] Payment modes dropdown works
- [ ] Status updates correctly
- [ ] Payment list shows all records

---

## 🔐 Security Setup

### Enable Row Level Security (RLS)
All tables have RLS enabled by default. Verify in Supabase:

1. Go to **SQL Editor**
2. Run:
```sql
-- Check RLS is enabled
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
-- All tables should show in results
```

### Secure Your API Keys
**NEVER share these:**
- Supabase anon key
- Database password
- Service role key

Keep `.env.local` in `.gitignore` ✓

---

## 🚀 Deployment (Optional)

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect GitHub repository
4. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**

Your app will be live at `yourproject.vercel.app`

---

## 🆘 Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution**: 
```bash
npm install @supabase/supabase-js
npm install
```

### Issue: "VITE_SUPABASE_URL is not defined"
**Solution**:
- Check `.env.local` file exists
- Verify keys are correct
- Restart dev server: `npm run dev`

### Issue: "Table 'public.products' does not exist"
**Solution**:
- Run `DATABASE_SCHEMA.sql` in Supabase SQL Editor
- Verify all queries executed without errors

### Issue: "Email not verified" on signup
**Solution**:
- Check Supabase email settings
- Or disable email verification: Auth → Email Settings → Uncheck "Confirm email"

### Issue: OCR not extracting text
**Solution**:
- Ensure image quality is good
- Try English-language invoices
- Check browser console for errors

### Issue: Charts not displaying
**Solution**:
- Clear browser cache: Ctrl+Shift+Delete
- Refresh page
- Check console for errors

### Issue: "Unauthorized" errors
**Solution**:
- Verify you're logged in
- Check JWT token in browser localStorage
- Clear website data and login again

---

## 📚 File Structure

```
supabase-erp/
├── src/
│   ├── pages/           # Page components (Dashboard, Products, etc.)
│   ├── components/      # Reusable components (Layout, OCR, etc.)
│   ├── services/        # Supabase API calls
│   ├── context/         # Auth context
│   ├── lib/             # Supabase client config
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static files
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
├── package.json         # Dependencies
├── .env.example         # Environment template
└── DATABASE_SCHEMA.sql  # Database setup script
```

---

## 🔗 Useful Links

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Chart.js**: https://www.chartjs.org
- **Tesseract.js**: https://tesseract.projectnaptha.com

---

## 📞 Support

If you encounter issues:

1. **Check the Troubleshooting section** above
2. **Review SQL error messages** in Supabase dashboard
3. **Check browser console** (F12 → Console tab)
4. **Verify .env.local** has correct keys
5. **Restart dev server**: Stop (Ctrl+C) and run `npm run dev`

---

## ✅ Next Steps

1. ✅ Complete setup above
2. ✅ Create sample data
3. ✅ Test all features
4. ✅ Customize for your company
5. ✅ Deploy to production

**Enjoy your AARK ERP System! 🎉**
