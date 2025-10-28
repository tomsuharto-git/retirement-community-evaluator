-- Supabase Update Statement for River Ridge at Avon
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'River Ridge at Avon',
  location = 'Avon, CT',
  address = '101 Bickford Extension, Avon, CT 06001',
  description = 'Premier assisted living and memory care community operated by Benchmark Senior Living in Farmington Valley near Routes 202 and 44. U.S. News Best Senior Living community for both assisted living and memory care, earning Benchmark''s ''Best Meals and Dining'' award with 24+ years of compassionate care. Features The Harbor Program for memory-impaired residents, chef-prepared seasonal menus with cooking demonstrations, quiet grounds with expansive courtyards, serene walking paths, library, fitness room, landscaped gardens, private dining, salon, farmer''s porch, gazebo social hours, and lively bistro.',
  community_type = 'Assisted Living & Memory Care',
  resident_count = NULL,
  star_rating = NULL,
  monthly_cost_min = 3650,
  monthly_cost_max = 9386,
  phone = 'Contact Benchmark Senior Living',
  website = 'https://www.benchmarkseniorliving.com/senior-living/ct/avon/river-ridge-at-avon/',
  care_levels = ARRAY[
    'Assisted Living',
    'Memory Care (The Harbor Program)',
    'Nursing Home Care',
    'Respite Care'
  ]::text[],
  housing_options = ARRAY[
    'Studio Apartments',
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments'
  ]::text[],
  amenities = ARRAY[
    'Quiet Grounds with Expansive Outdoor Courtyard',
    'Serene Walking Paths',
    'Library',
    'Fitness Room with Equipment',
    'Landscaped Gardens',
    'Wellness and Fitness Centers',
    'Private Dining Room',
    'Full-Service Hair Salon',
    'Recreation Room',
    'Farmer''s Porch',
    'Gazebo with Social Hours',
    'Lively Bistro',
    'Chef-Prepared Seasonal Menus',
    'Cooking Demonstrations',
    'The Harbor Program (Memory Care)',
    '24-Hour Staff Availability',
    'Transportation Services',
    'Emergency Response Systems',
    'Farmington Valley Location (Routes 202 & 44)',
    'Dry Cleaning Services'
  ]::text[],
  financials_summary = 'River Ridge at Avon offers monthly rental pricing from $3,650-$9,386 (average $5,600) with studios starting at $5,100/month and no entrance fees, operated by Benchmark Senior Living''s 28-year-established portfolio of 61 communities.',
  care_summary = 'Recognized as a U.S. News Best Senior Living community for both assisted living and memory care, River Ridge provides 24+ years of compassionate care through Benchmark''s culture of caring, featuring The Harbor Program for advanced dementia support and earning the ''Best Meals and Dining'' award.',
  housing_summary = 'The community offers studio, one-bedroom, and two-bedroom private apartments across assisted living and memory care levels, all featuring various floor plans, emergency systems, and access to quiet grounds and landscaped gardens.',
  community_summary = 'Located in Farmington Valley near Routes 202 and 44, this Benchmark Senior Living community features quiet grounds with expansive courtyards, serene walking paths, library, fitness room, landscaped gardens, private dining, salon, recreation room, farmer''s porch, gazebo social hours, lively bistro, and chef-prepared seasonal menus with cooking demonstrations.',
  updated_at = NOW()
WHERE name LIKE '%River Ridge%Avon%'
  OR address LIKE '%101 Bickford Extension%';

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
  'River Ridge at Avon',
  'Avon, CT',
  '101 Bickford Extension, Avon, CT 06001',
  'Premier assisted living and memory care community operated by Benchmark Senior Living in Farmington Valley near Routes 202 and 44. U.S. News Best Senior Living community for both assisted living and memory care, earning Benchmark''s ''Best Meals and Dining'' award with 24+ years of compassionate care. Features The Harbor Program for memory-impaired residents, chef-prepared seasonal menus with cooking demonstrations, quiet grounds with expansive courtyards, serene walking paths, library, fitness room, landscaped gardens, private dining, salon, farmer''s porch, gazebo social hours, and lively bistro.',
  'Assisted Living & Memory Care',
  NULL,
  NULL,
  3650,
  9386,
  'Contact Benchmark Senior Living',
  'https://www.benchmarkseniorliving.com/senior-living/ct/avon/river-ridge-at-avon/',
  ARRAY[
    'Assisted Living',
    'Memory Care (The Harbor Program)',
    'Nursing Home Care',
    'Respite Care'
  ]::text[],
  ARRAY[
    'Studio Apartments',
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments'
  ]::text[],
  ARRAY[
    'Quiet Grounds with Expansive Outdoor Courtyard',
    'Serene Walking Paths',
    'Library',
    'Fitness Room with Equipment',
    'Landscaped Gardens',
    'Wellness and Fitness Centers',
    'Private Dining Room',
    'Full-Service Hair Salon',
    'Recreation Room',
    'Farmer''s Porch',
    'Gazebo with Social Hours',
    'Lively Bistro',
    'Chef-Prepared Seasonal Menus',
    'Cooking Demonstrations',
    'The Harbor Program (Memory Care)',
    '24-Hour Staff Availability',
    'Transportation Services',
    'Emergency Response Systems',
    'Farmington Valley Location (Routes 202 & 44)',
    'Dry Cleaning Services'
  ]::text[],
  'River Ridge at Avon offers monthly rental pricing from $3,650-$9,386 (average $5,600) with studios starting at $5,100/month and no entrance fees, operated by Benchmark Senior Living''s 28-year-established portfolio of 61 communities.',
  'Recognized as a U.S. News Best Senior Living community for both assisted living and memory care, River Ridge provides 24+ years of compassionate care through Benchmark''s culture of caring, featuring The Harbor Program for advanced dementia support and earning the ''Best Meals and Dining'' award.',
  'The community offers studio, one-bedroom, and two-bedroom private apartments across assisted living and memory care levels, all featuring various floor plans, emergency systems, and access to quiet grounds and landscaped gardens.',
  'Located in Farmington Valley near Routes 202 and 44, this Benchmark Senior Living community features quiet grounds with expansive courtyards, serene walking paths, library, fitness room, landscaped gardens, private dining, salon, recreation room, farmer''s porch, gazebo social hours, lively bistro, and chef-prepared seasonal menus with cooking demonstrations.',
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
WHERE name LIKE '%River Ridge%Avon%'
  OR address LIKE '%101 Bickford Extension%';

-- Expected Results:
-- name: River Ridge at Avon
-- location: Avon, CT
-- phone: Contact Benchmark Senior Living
-- community_type: Assisted Living & Memory Care
-- monthly_cost_min: 3650
-- monthly_cost_max: 9386
-- star_rating: NULL
-- num_care_levels: 4
-- num_housing_options: 3
-- num_amenities: 20

-- NOTE: Phone number not readily available in public sources - contact Benchmark Senior Living
-- NOTE: Resident count not disclosed - set to NULL
