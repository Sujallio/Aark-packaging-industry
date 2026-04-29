# 🚀 Vercel ERP Deployment Setup

This guide explains how to set up the ERP system on Vercel with Supabase credentials.

## Prerequisites

- Supabase project created at https://supabase.com
- Vercel account with project deployed
- Access to Supabase API credentials

---

## Step 1: Get Supabase Credentials

1. **Go to your Supabase Project**
   - Visit https://supabase.com
   - Open your AARK project

2. **Navigate to Settings > API**
   - Click Settings in the left sidebar
   - Click API
   - You'll see:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (looks like: `eyJhbGc...`)

3. **Copy these values** - you'll need them next

---

## Step 2: Add to Vercel Environment Variables

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your ERP project (`aark-packaging-industry-erp`)

2. **Click Settings → Environment Variables**

3. **Add Two Variables:**

   **Variable 1:**
   ```
   Name: VITE_SUPABASE_URL
   Value: <Your Supabase Project URL>
   Environments: Production, Preview, Development
   ```

   **Variable 2:**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: <Your Supabase Anon Key>
   Environments: Production, Preview, Development
   ```

4. **Click "Save"**

### Option B: Using Vercel CLI

```bash
vercel env add VITE_SUPABASE_URL
# Enter your Supabase URL when prompted

vercel env add VITE_SUPABASE_ANON_KEY
# Enter your Supabase Anon Key when prompted
```

---

## Step 3: Redeploy on Vercel

1. **After adding environment variables**, Vercel will automatically redeploy
2. **Or manually trigger redeploy:**
   - Go to Deployments
   - Click the three dots on the latest deployment
   - Select "Redeploy"

3. **Wait for deployment** to complete (usually 2-3 minutes)

4. **Visit your ERP domain** to verify it's working:
   - https://aark-packaging-industry-erp.vercel.app/

---

## Step 4: Test the Connection

1. Open the ERP login page
2. Try logging in with your credentials:
   - Email: `owner@aark.com` (or your created user)
   - Password: Your password

3. If it works, you'll see the Dashboard

4. If still getting errors:
   - Check browser console for specific error message
   - Verify environment variable names exactly match (case-sensitive)
   - Verify values don't have extra spaces
   - Re-redeploy after making changes

---

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Cause:** Environment variables not set in Vercel

**Solution:**
- Follow Step 2 above
- Ensure variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Redeploy after adding variables

### Error: "Failed to connect to Supabase"

**Cause:** Invalid credentials or database not accessible

**Solution:**
- Verify credentials are copied correctly from Supabase dashboard
- Check Supabase project is active and not paused
- Verify database schema is set up with `DATABASE_SCHEMA.sql`

### Error: "CORS error"

**Cause:** Supabase CORS settings not configured for your domain

**Solution:**
1. Go to Supabase Project Settings
2. Click "API" in left sidebar
3. Under CORS, add your Vercel domain:
   - Add: `https://aark-packaging-industry-erp.vercel.app`

---

## Local Development

For local testing, create `.env.local` in the `supabase-erp` folder:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=AARK ERP System
```

Then run:
```bash
cd supabase-erp
npm run dev
```

---

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to GitHub (it's in `.gitignore`)
- Use Vercel Environment Variables for production credentials
- The "anon public" key is safe to expose (it's public)
- User authentication is protected by Supabase's security rules

---

**Last Updated:** April 29, 2026
**Status:** Ready for Production
