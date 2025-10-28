-- Supabase Update Statement for Avery Heights
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'Avery Heights',
  location = 'Hartford, CT',
  address = '705 New Britain Avenue, Hartford, CT 06106',
  description = 'Greater Hartford''s premier rental-only CCRC nestled atop Cedar Mountain on a scenic 43-acre site, serving the area for over 50 years. Owned by not-for-profit Church Homes, Inc., Avery Heights uniquely offers full continuum care with NO buy-in fees. Features spacious apartments, New England-style cottages, state-of-the-art wellness center, and priority access to home health, assisted living, memory care, rehabilitation, and skilled nursing—all on a park-like campus.',
  community_type = 'CCRC (Continuing Care Retirement Community) - Rental Model',
  resident_count = 175,
  star_rating = NULL,
  monthly_cost_min = 3000,
  monthly_cost_max = 12927,
  phone = '(860) 953-1201',
  website = 'https://averyheights.org/',
  care_levels = ARRAY[
    'Independent Living',
    'Home Health Care',
    'Assisted Living',
    'Memory Care',
    'Short-Term Rehabilitation',
    'Long-Term Skilled Nursing Care'
  ]::text[],
  housing_options = ARRAY[
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments',
    'New England-Style Cottages',
    'Assisted Living Residences',
    'Skilled Nursing Rooms'
  ]::text[],
  amenities = ARRAY[
    '43-Acre Cedar Mountain Campus',
    'State-of-the-Art Wellness Center',
    'New England-Style Cottages',
    'Spacious One & Two-Bedroom Apartments',
    'Game Room',
    'Library',
    'Scenic Walking Paths',
    'Business Room',
    'Beauty Salon and Barber Shop',
    'Fitness Room with Equipment',
    'Garden Spaces',
    'Spa/Wellness Room',
    'Fitness Programs',
    'Movie Nights',
    'Resident-Run Activities',
    'Scheduled Daily Activities',
    'Community-Sponsored Activities',
    'Music Programs',
    'Priority Access to Healthcare Continuum',
    'Park-Like Setting'
  ]::text[],
  financials_summary = 'Avery Heights uniquely operates as a rental-only CCRC with NO buy-in fees, offering independent living from approximately $3,000-$6,000/month, assisted living from $3,000-$7,000/month, and skilled nursing from $3,975-$12,927/month, with priority access to the full care continuum without entrance fee requirements.',
  care_summary = 'As a Church Homes, Inc. not-for-profit CCRC serving Greater Hartford for over 50 years, Avery Heights provides priority continuum access from independent living through skilled nursing, including home health, assisted living, memory care, and short-term rehabilitation, all available without buy-in fees.',
  housing_summary = 'The 43-acre Cedar Mountain campus offers spacious one and two-bedroom apartments plus charming New England-style cottages, all featuring fully equipped kitchens, in-unit washer/dryers, cable hookups, and private balconies or patios within a park-like setting.',
  community_summary = 'Developed in the 1950s by Hartford business executives and clergy atop Cedar Mountain''s scenic 43 acres, this Church Homes, Inc. not-for-profit CCRC features a state-of-the-art wellness center, library, game room, gardens, walking paths, and is the only rental-only CCRC in the area with no entrance fees required.',
  updated_at = NOW()
WHERE name = 'Avery Heights'
  OR address LIKE '%705 New Britain Avenue%';

-- Alternative: INSERT new record (if community doesn't exist)
-- Uncomment and use if this is a new community not yet in database

/*
INSERT INTO communities (
  name,
  location,
  address,
  description,
  community_type,
  resident_count,
  star_rating,
  monthly_cost_min,
  monthly_cost_max,
  phone,
  website,
  care_levels,
  housing_options,
  amenities,
  financials_summary,
  care_summary,
  housing_summary,
  community_summary,
  created_at,
  updated_at
) VALUES (
  'Avery Heights',
  'Hartford, CT',
  '705 New Britain Avenue, Hartford, CT 06106',
  'Greater Hartford''s premier rental-only CCRC nestled atop Cedar Mountain on a scenic 43-acre site, serving the area for over 50 years. Owned by not-for-profit Church Homes, Inc., Avery Heights uniquely offers full continuum care with NO buy-in fees. Features spacious apartments, New England-style cottages, state-of-the-art wellness center, and priority access to home health, assisted living, memory care, rehabilitation, and skilled nursing—all on a park-like campus.',
  'CCRC (Continuing Care Retirement Community) - Rental Model',
  175,
  NULL,
  3000,
  12927,
  '(860) 953-1201',
  'https://averyheights.org/',
  ARRAY[
    'Independent Living',
    'Home Health Care',
    'Assisted Living',
    'Memory Care',
    'Short-Term Rehabilitation',
    'Long-Term Skilled Nursing Care'
  ]::text[],
  ARRAY[
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments',
    'New England-Style Cottages',
    'Assisted Living Residences',
    'Skilled Nursing Rooms'
  ]::text[],
  ARRAY[
    '43-Acre Cedar Mountain Campus',
    'State-of-the-Art Wellness Center',
    'New England-Style Cottages',
    'Spacious One & Two-Bedroom Apartments',
    'Game Room',
    'Library',
    'Scenic Walking Paths',
    'Business Room',
    'Beauty Salon and Barber Shop',
    'Fitness Room with Equipment',
    'Garden Spaces',
    'Spa/Wellness Room',
    'Fitness Programs',
    'Movie Nights',
    'Resident-Run Activities',
    'Scheduled Daily Activities',
    'Community-Sponsored Activities',
    'Music Programs',
    'Priority Access to Healthcare Continuum',
    'Park-Like Setting'
  ]::text[],
  'Avery Heights uniquely operates as a rental-only CCRC with NO buy-in fees, offering independent living from approximately $3,000-$6,000/month, assisted living from $3,000-$7,000/month, and skilled nursing from $3,975-$12,927/month, with priority access to the full care continuum without entrance fee requirements.',
  'As a Church Homes, Inc. not-for-profit CCRC serving Greater Hartford for over 50 years, Avery Heights provides priority continuum access from independent living through skilled nursing, including home health, assisted living, memory care, and short-term rehabilitation, all available without buy-in fees.',
  'The 43-acre Cedar Mountain campus offers spacious one and two-bedroom apartments plus charming New England-style cottages, all featuring fully equipped kitchens, in-unit washer/dryers, cable hookups, and private balconies or patios within a park-like setting.',
  'Developed in the 1950s by Hartford business executives and clergy atop Cedar Mountain''s scenic 43 acres, this Church Homes, Inc. not-for-profit CCRC features a state-of-the-art wellness center, library, game room, gardens, walking paths, and is the only rental-only CCRC in the area with no entrance fees required.',
  NOW(),
  NOW()
);
*/

-- Verification Query
-- Run this after the update to confirm changes
SELECT
  name,
  location,
  address,
  phone,
  community_type,
  monthly_cost_min,
  monthly_cost_max,
  star_rating,
  array_length(care_levels, 1) as num_care_levels,
  array_length(housing_options, 1) as num_housing_options,
  array_length(amenities, 1) as num_amenities,
  updated_at
FROM communities
WHERE name = 'Avery Heights'
  OR address LIKE '%705 New Britain Avenue%';

-- Expected Results:
-- name: Avery Heights
-- location: Hartford, CT
-- phone: (860) 953-1201
-- community_type: CCRC (Continuing Care Retirement Community) - Rental Model
-- monthly_cost_min: 3000
-- monthly_cost_max: 12927
-- star_rating: NULL
-- num_care_levels: 6
-- num_housing_options: 5
-- num_amenities: 20
