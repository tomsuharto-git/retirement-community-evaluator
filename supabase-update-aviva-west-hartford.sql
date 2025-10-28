-- Supabase Update Statement for AVIVA West Hartford
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'AVIVA West Hartford',
  location = 'West Hartford, CT',
  address = '1 Hamilton Heights Drive, West Hartford, CT 06119',
  description = 'Magnificent historic senior living community on the former Vanderbilt estate, originally built by the Sisters of Mercy in the early 20th century. Registered with the National Register of Historic Places since 1983, AVIVA offers independent living, assisted living, memory care, and the innovative AssistedPlus program. Features include a bell tower with panoramic views, movie theater, spa, café/pub, and scenic walking trails in the heart of West Hartford.',
  community_type = 'Independent Living, Assisted Living & Memory Care',
  resident_count = 90,
  star_rating = NULL,
  monthly_cost_min = 2295,
  monthly_cost_max = 5500,
  phone = '(800) 755-1458',
  website = 'https://avivawesthartford.com/',
  care_levels = ARRAY[
    'Independent Living',
    'Assisted Living',
    'AssistedPlus (Enhanced Cognitive Support)',
    'Memory Care',
    'Respite Care'
  ]::text[],
  housing_options = ARRAY[
    'Studio Apartments',
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments',
    'Independent Living Apartments',
    'Assisted Living Apartments',
    'Memory Care Suites'
  ]::text[],
  amenities = ARRAY[
    'Historic Bell Tower with Panoramic Views',
    'National Register Historic Building',
    'Scenic Walking Trails',
    'Movie Theater',
    'Billiard Room',
    'Full-Service Salon and Spa',
    'Café and Pub',
    'Physical Therapy/Fitness Center',
    '24-Hour Emergency Response System',
    'Community-Wide Free Wi-Fi',
    'Multiple Elevators',
    'Backup Generator',
    'Landscaped Courtyards',
    'On-Site Therapy Services',
    'Chef-Prepared Meals',
    'Full Calendar of Events',
    'Transportation Services',
    'Private Kitchenettes in All Apartments',
    'Medication Management',
    'Pet-Friendly Policies'
  ]::text[],
  financials_summary = 'AVIVA West Hartford offers monthly rental pricing starting at $3,195 for independent living, $3,495 for assisted living, and $5,500 for memory care, with no entrance fees required and all meals, housekeeping, Wi-Fi, emergency response, and private kitchenettes included in the base rate.',
  care_summary = 'The community provides a comprehensive continuum from independent living through memory care, featuring the innovative AssistedPlus program for cognitive support, 24-hour staffing, on-site therapy services, and medication management across all care levels.',
  housing_summary = 'AVIVA offers studio, one-bedroom, and two-bedroom apartments throughout the historic National Register building, each featuring private kitchenettes, emergency call systems, and modern amenities within architecturally significant spaces.',
  community_summary = 'Built by the Sisters of Mercy on the former Vanderbilt estate and listed on the National Register of Historic Places since 1983, AVIVA West Hartford combines early 20th-century architectural elegance with modern senior living, featuring a bell tower with panoramic views, movie theater, spa, café/pub, and scenic trails.',
  updated_at = NOW()
WHERE name = 'Avery West Hartford'
  OR address LIKE '%101 S Main St%';

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
  'AVIVA West Hartford',
  'West Hartford, CT',
  '1 Hamilton Heights Drive, West Hartford, CT 06119',
  'Magnificent historic senior living community on the former Vanderbilt estate, originally built by the Sisters of Mercy in the early 20th century. Registered with the National Register of Historic Places since 1983, AVIVA offers independent living, assisted living, memory care, and the innovative AssistedPlus program. Features include a bell tower with panoramic views, movie theater, spa, café/pub, and scenic walking trails in the heart of West Hartford.',
  'Independent Living, Assisted Living & Memory Care',
  90,
  NULL,
  2295,
  5500,
  '(800) 755-1458',
  'https://avivawesthartford.com/',
  ARRAY[
    'Independent Living',
    'Assisted Living',
    'AssistedPlus (Enhanced Cognitive Support)',
    'Memory Care',
    'Respite Care'
  ]::text[],
  ARRAY[
    'Studio Apartments',
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments',
    'Independent Living Apartments',
    'Assisted Living Apartments',
    'Memory Care Suites'
  ]::text[],
  ARRAY[
    'Historic Bell Tower with Panoramic Views',
    'National Register Historic Building',
    'Scenic Walking Trails',
    'Movie Theater',
    'Billiard Room',
    'Full-Service Salon and Spa',
    'Café and Pub',
    'Physical Therapy/Fitness Center',
    '24-Hour Emergency Response System',
    'Community-Wide Free Wi-Fi',
    'Multiple Elevators',
    'Backup Generator',
    'Landscaped Courtyards',
    'On-Site Therapy Services',
    'Chef-Prepared Meals',
    'Full Calendar of Events',
    'Transportation Services',
    'Private Kitchenettes in All Apartments',
    'Medication Management',
    'Pet-Friendly Policies'
  ]::text[],
  'AVIVA West Hartford offers monthly rental pricing starting at $3,195 for independent living, $3,495 for assisted living, and $5,500 for memory care, with no entrance fees required and all meals, housekeeping, Wi-Fi, emergency response, and private kitchenettes included in the base rate.',
  'The community provides a comprehensive continuum from independent living through memory care, featuring the innovative AssistedPlus program for cognitive support, 24-hour staffing, on-site therapy services, and medication management across all care levels.',
  'AVIVA offers studio, one-bedroom, and two-bedroom apartments throughout the historic National Register building, each featuring private kitchenettes, emergency call systems, and modern amenities within architecturally significant spaces.',
  'Built by the Sisters of Mercy on the former Vanderbilt estate and listed on the National Register of Historic Places since 1983, AVIVA West Hartford combines early 20th-century architectural elegance with modern senior living, featuring a bell tower with panoramic views, movie theater, spa, café/pub, and scenic trails.',
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
WHERE name = 'AVIVA West Hartford'
  OR address LIKE '%1 Hamilton Heights%'
  OR address LIKE '%101 S Main St%';

-- Expected Results:
-- name: AVIVA West Hartford
-- location: West Hartford, CT
-- phone: (800) 755-1458
-- community_type: Independent Living, Assisted Living & Memory Care
-- monthly_cost_min: 2295
-- monthly_cost_max: 5500
-- star_rating: NULL
-- num_care_levels: 5
-- num_housing_options: 6
-- num_amenities: 20
