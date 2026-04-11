# 🔧 AARK ERP - Troubleshooting Guide

Solutions for common issues encountered during setup and usage.

---

## 🚨 Setup Issues

### Issue: "Cannot find module 'react-router-dom'"
**Problem**: Dependencies not installed
**Solution**:
```bash
npm install
npm install react-router-dom recharts
```

### Issue: ".env.local not found" or "VITE_SUPABASE_URL is undefined"
**Problem**: Environment variables not configured
**Solution**:
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local
# Add your Supabase URL and API key:
# VITE_SUPABASE_URL=https://xxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJxxx...
```

### Issue: "Cannot connect to Supabase" or "Network error"
**Problem**: Invalid Supabase credentials or URL wrong
**Solution**:
1. **Verify credentials**:
   - Go to Supabase dashboard → Settings → API
   - Copy exact URL and key (no spaces)
   - Paste into `.env.local`

2. **Check URL format**:
   - Should be: `https://xxxxx.supabase.co`
   - Should NOT have trailing slash

3. **Restart dev server**:
   ```bash
   # Stop: Press Ctrl+C
   npm run dev
   ```

### Issue: "Project does not exist" or 404 error
**Problem**: Supabase project not initialized
**Solution**:
1. Log into Supabase
2. Check project is in active state (not paused)
3. Create new project if needed
4. Update credentials

---

## 🗄️ Database Issues

### Issue: "Table 'public.products' does not exist"
**Problem**: Database schema not created
**Solution**:
1. Open Supabase dashboard → **SQL Editor**
2. Click **+ New Query**
3. Copy entire contents of `DATABASE_SCHEMA.sql`
4. Paste into editor
5. Click **Run** button
6. Wait for completion (Shows: "Executed successfully")

### Issue: "Permission denied" errors
**Problem**: Row-level security (RLS) blocking queries
**Solution**:
1. Verify you're logged in (JWT token active)
2. Check RLS policies in Supabase dashboard
3. For testing, temporarily disable RLS on table:
   ```sql
   ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
   ```
4. Re-enable when done:
   ```sql
   ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
   ```

### Issue: "Duplicate key value violates unique constraint"
**Problem**: Trying to create duplicate SKU or Invoice number
**Solution**:
- Each product SKU must be unique
- Each invoice number must be unique
- System generates unique numbers, so this shouldn't happen unless:
  - Manual data entry with duplicates
  - Direct SQL inserts without unique values

**Fix**: Change the value to be unique:
```sql
-- Example: Update duplicate SKU
UPDATE public.products 
SET sku = 'NEW-UNIQUE-SKU' 
WHERE id = 123;
```

### Issue: "Function does not exist" error
**Problem**: Triggers or functions not created
**Solution**:
- Re-run entire `DATABASE_SCHEMA.sql`
- Verify all CREATE FUNCTION statements executed

---

## 🔐 Authentication Issues

### Issue: "Invalid login credentials" but password is correct
**Problem**: Account not activated or email/password mismatch
**Solution**:
1. Check email spelling
2. Reset password: Click "Forgot password" on login
3. Check if you signed up (not just logged in)
4. Verify email verification (if enabled)

### Issue: "Email already exists"
**Problem**: Trying to signup with existing account
**Solution**:
1. Log in instead of signing up
2. Or use different email address
3. Or reset password via "Forgot password"

### Issue: "Invalid token" or "Session expired"
**Problem**: JWT token invalid or expired
**Solution**:
1. Logout and login again
2. Clear browser cookies:
   - Settings → Privacy → Clear site data
   - Select: Cookies
3. Close all browser tabs for site
4. Open fresh in new tab

### Issue: "403 Forbidden" errors
**Problem**: Not authenticated or insufficient permissions
**Solution**:
1. Check if logged in
2. Verify role (admin role may be required for some operations)
3. Make yourself admin:
   ```sql
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'your@email.com';
   ```

---

## 🎨 Frontend Issues

### Issue: "Cannot read property 'map' of undefined"
**Problem**: Data not loaded yet when component renders
**Solution**: Already handled with loading state, but if persisting:
```javascript
// Check in component
{loading && <div>Loading...</div>}
{data && data.map(...)}  // Add null check
```

### Issue: Styles not applied/Tailwind not working
**Problem**: Tailwind CSS not compiled
**Solution**:
```bash
# Restart dev server
npm run dev

# Or rebuild styles
npm run build
```

### Issue: Sidebar or navigation not showing
**Problem**: Layout component error
**Solution**:
1. Check browser console (F12 → Console)
2. Look for error messages
3. Verify `src/pages/Layout.jsx` exists
4. Check imports in `App.jsx`

### Issue: Charts not displaying
**Problem**: Recharts library not loaded or data missing
**Solution**:
```bash
npm install recharts chart.js react-chartjs-2
npm run dev
```

### Issue: OCR button does nothing
**Problem**: Tesseract.js not loaded or file upload issue
**Solution**:
1. Verify `src/components/InvoiceOCR.jsx` exists
2. Install Tesseract:
   ```bash
   npm install tesseract.js
   ```
3. Check browser console for errors
4. Try with clear, high-quality image

---

## 🔌 API & Service Issues

### Issue: "Failed to fetch" or "Network error"
**Problem**: API endpoint not responding
**Solution**:
1. Check Supabase service status: https://status.supabase.com
2. Verify API key is correct
3. Check network tab in DevTools (F12)
4. Restart dev server

### Issue: "Payload too large"
**Problem**: Trying to upload large file
**Solution**:
1. Reduce file size
2. Compress image before upload
3. Check Supabase storage limits

### Issue: Data not syncing between browser windows
**Problem**: Real-time subscriptions not setup
**Solution**:
- Refresh page to get latest data
- Real-time is optional, not required

### Issue: "Column does not exist" errors
**Problem**: Database schema missing column
**Solution**:
1. Re-run `DATABASE_SCHEMA.sql`
2. Or add missing column:
   ```sql
   ALTER TABLE public.products 
   ADD COLUMN new_column VARCHAR(255);
   ```

---

## 📦 Delivery & Stock Issues

### Issue: Stock goes negative
**Problem**: More items sold than in stock
**Solution**:
1. Check initial quantity was correct
2. Check order quantities
3. Manually fix stock:
   ```sql
   UPDATE public.products 
   SET quantity = 100 
   WHERE id = 5;
   ```

### Issue: Low stock alerts not showing
**Problem**: Threshold not met or query issue
**Solution**:
1. Check reorder_level is set (not null)
2. Check quantity is actually below threshold
3. Refresh page
4. Check browser console for errors

---

## 💾 Data Issues

### Issue: Data saved but not showing
**Problem**: Page not refreshed after save
**Solution**:
1. Manually refresh page (F5 or Cmd+R)
2. Or automatically reload after mutation (code improvement needed)

### Issue: Cannot delete product (gets error)
**Problem**: Product referenced in orders
**Solution**:
- With foreign keys, deletion might be restricted
- Solution: Add null check or cascade delete
- Or archive product instead of deleting

### Issue: "Row violates row-level security policy"
**Problem**: Trying to access another user's data
**Solution**:
1. Check `created_by` field matches current user
2. Or update RLS policy to allow access
3. Admin users can see all

---

## 🚀 Performance Issues

### Issue: App is slow/laggy
**Problem**: Too many records or inefficient queries
**Solution**:
1. Add pagination to tables:
   ```javascript
   const [page, setPage] = useState(0)
   // Fetch with LIMIT and OFFSET
   .limit(10)
   .offset(page * 10)
   ```
2. Add indexes on search columns
3. Avoid N+1 queries

### Issue: Charts take too long to load
**Problem**: Large dataset being processed
**Solution**:
1. Filter data by date range
2. Use aggregated views
3. Pre-calculate stats in database

### Issue: File upload is slow
**Problem**: Large file size
**Solution**:
1. Compress before uploading
2. Use smaller images (max 5MB)
3. Show progress bar

---

## 🌐 Deployment Issues

### Issue: "Build failed" on Vercel/Netlify
**Problem**: Missing environment variables
**Solution**:
1. Add to deployment platform:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
2. Redeploy
3. Wait 2-3 minutes for build

### Issue: "404 Not Found" in production
**Problem**: Routing issue with SPA
**Solution**:
1. **Vercel**: Auto-fixed with React
2. **Netlify**: Create `public/_redirects` file:
   ```
   /* /index.html 200
   ```

### Issue: Images not loading in production
**Problem**: Supabase storage URL wrong or no access
**Solution**:
1. Verify storage bucket is public
2. Check full URL path correct
3. Check CORS settings

### Issue: "CORS error" in production
**Problem**: Cross-origin request blocked
**Solution**:
This shouldn't happen with Supabase (they handle CORS)
- If persisting, check browser console for actual error
- May be a different issue disguised as CORS

---

## 🔍 Debugging Tips

### Enable Debug Logging
```javascript
// In supabaseClient.js
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  { 
    // Enable debug mode
    headers: { 'x-debug': 'true' }
  }
)
```

### Check Browser Console
```javascript
// F12 → Console tab
// Look for red errors
// Check network tab for failed requests
```

### Check Supabase Logs
1. Go to Supabase dashboard
2. Click "Functions" (if using)
3. Or go to "Logs" in project settings

### Test with Curl
```bash
# Get products
curl -H "apikey: your-anon-key" \
  "https://xxx.supabase.co/rest/v1/products"
```

### Use Postman
1. Create new request
2. Add header: `apikey: your-anon-key`
3. Test endpoints

---

## ✅ Verification Checklist

Before reporting a bug:
- [ ] Node.js v16+ installed
- [ ] All dependencies installed (`npm install`)
- [ ] `.env.local` created with correct values
- [ ] Database schema SQL executed in Supabase
- [ ] Logged in successfully
- [ ] Browser console has no red errors (F12)
- [ ] Dev server restarted (`npm run dev`)
- [ ] Cleared browser cache (Ctrl+Shift+Delete)

---

## 📞 Getting Help

1. **Check this guide** first
2. **Read error messages** carefully
3. **Check Supabase status**: https://status.supabase.com
4. **Search Supabase docs**: https://supabase.com/docs
5. **Check browser console**: F12 → Console

---

## 📝 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot find module" | Missing dependency | `npm install` |
| "Cannot connect" | Wrong Supabase URL | Check `.env.local` |
| "Table does not exist" | Schema not created | Run `DATABASE_SCHEMA.sql` |
| "Permission denied" | RLS blocking | Log in or update policy |
| "Network error" | No internet/offline | Check connection |
| "Invalid token" | JWT expired | Log in again |
| "CORS error" | Cross-origin issue | Check Supabase CORS |
| "Duplicate key" | Unique constraint | Use unique value |

---

**Still stuck? Check the SETUP_GUIDE.md for step-by-step instructions!** 🎯
