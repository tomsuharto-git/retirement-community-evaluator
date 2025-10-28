-- Check what tables exist in the database
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- If communities table exists, check its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'communities'
ORDER BY ordinal_position;

-- If communities table exists, check how many records
SELECT COUNT(*) as total_communities
FROM public.communities;

-- Check if there's any data
SELECT id, name, location, visited, star_rating, resident_count
FROM public.communities
LIMIT 5;
