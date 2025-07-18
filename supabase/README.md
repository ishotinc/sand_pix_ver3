# Database Setup Instructions

## Prerequisites
1. Create a Supabase account at https://supabase.com
2. Create a new project

## Setup Steps

### 1. Run the Schema
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `schema.sql`
4. Click "Run" to execute the schema

### 2. Apply RLS Policies
1. Still in SQL Editor
2. Copy and paste the contents of `rls-policies.sql`
3. Click "Run" to apply the RLS policies

### 3. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. From your Supabase Dashboard:
   - Go to Settings > API
   - Copy the Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy the service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Enable Authentication
1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates as needed

### 5. Storage Setup (Optional for Phase 1)
1. Go to Storage
2. Create a bucket named `swipe-images`
3. Set it to public if you want to serve images directly

## Important Notes
- The schema assumes Supabase Auth is already set up (auth.users table)
- RLS policies ensure users can only access their own data
- The public can view published projects
- All tables have automatic updated_at triggers

## Testing
After setup, you can test by:
1. Creating a user through Supabase Auth
2. Inserting test data into the tables
3. Verifying RLS policies work correctly