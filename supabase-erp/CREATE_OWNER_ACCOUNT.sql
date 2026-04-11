-- ============================================================================
-- ⚠️ IMPORTANT: Create Owner Account via Supabase UI (Not SQL)
-- ============================================================================
-- The Supabase auth.users table cannot be directly modified via SQL
-- You MUST create the user through the Supabase Dashboard instead
-- ============================================================================

-- STEP 1: CREATE AUTH USER VIA SUPABASE DASHBOARD
-- =====================================================
-- 1. Go to: https://app.supabase.com
-- 2. Select Your Project
-- 3. Go to: Authentication > Users
-- 4. Click: "+ Add user"
-- 5. Fill in:
--    - Email: owner@aark.com
--    - Password: Owner@123456
--    - Confirm Password: Owner@123456
-- 6. Click: "Create user"
-- 7. Return here and run STEP 2

-- STEP 2: RUN THIS SQL AFTER CREATING THE AUTH USER
-- ===================================================
-- After you've created the user via the Supabase Dashboard,
-- come back here and run this query to create the admin profile:

-- First, let's create the profile for the owner
-- This assumes the user 'owner@aark.com' was created via Supabase UI
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  department,
  phone,
  created_at,
  updated_at
)
SELECT 
  id,
  email,
  'AARK Company Owner',
  'admin',
  'Management',
  '+91-9876543210',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'owner@aark.com'
ON CONFLICT (id) DO UPDATE
SET
  role = 'admin',
  full_name = 'AARK Company Owner',
  updated_at = NOW();

-- Verify the admin profile was created
SELECT id, email, full_name, role FROM public.profiles 
WHERE email = 'owner@aark.com';

-- Check the email matches
SELECT id, email FROM auth.users 
WHERE email = 'owner@aark.com';
