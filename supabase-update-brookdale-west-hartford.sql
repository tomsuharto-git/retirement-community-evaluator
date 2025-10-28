-- Supabase Update Statement for Brookdale West Hartford
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'Brookdale West Hartford',
  location = 'West Hartford, CT',
  address = '22 Simsbury Road, West Hartford, CT 06117',
  description = 'Upscale assisted living and memory care community with 70+ private, pet-friendly apartments. U.S. News Best Senior Living community for memory care, awarded #1 in Customer Satisfaction with multiple awards for memory care quality, activities/enrichment, caregiving excellence, and dining services. Features beautifully landscaped grounds, restaurant-style dining, and person-centered care with 24/7 trained staff.',
  community_type = 'Assisted Living & Memory Care',
  resident_count = 70,
  star_rating = 4.9,
  monthly_cost_min = 3395,
  monthly_cost_max = 7125,
  phone = '(860) 523-9899',
  website = 'https://www.brookdale.com/en/communities/brookdale-west-hartford.html',
  care_levels = ARRAY['Assisted Living', 'Memory Care']::text[],
  housing_options = ARRAY[
    'Studio Apartments (Private)',
    'Studio with Alcove (Private)',
    'One-Bedroom Apartments (Private)',
    'Two-Bedroom Apartments (Private)',
    'Shared Bedrooms (Semi-private)'
  ]::text[],
  amenities = ARRAY[
    '24/7 Emergency Alert Systems',
    'Restaurant-Style Dining Room',
    'Beautifully Landscaped Grounds',
    'Scenic Walking Paths',
    'Fireside Living Room',
    'Arts and Crafts Studio',
    'Beauty and Barber Shop',
    'Courtyard Gardens',
    'Café/Bistro',
    'Concierge Service',
    'Transportation Services',
    'On-Site Parking',
    'Guest Suites',
    'Wi-Fi Throughout Community',
    'Postal Services',
    'Memory Care Gardens',
    'Daily Fitness Classes',
    'Music Therapy Programs',
    'Pet-Friendly Accommodations',
    'Personal Solutions Program'
  ]::text[],
  financials_summary = 'Brookdale West Hartford operates on a fee-for-service rental model with no entrance fees, offering assisted living from $3,395-$7,125/month and memory care from $6,420/month, with dining and housekeeping included in the base rate but additional costs for higher care levels and optional services.',
  care_summary = 'As a U.S. News Best Senior Living community for memory care with a 4.9-star rating, Brookdale provides 24/7 staffing with person-centered care plans, offering 6+ daily memory care programs including music therapy, gardening, and creative arts, plus customized assisted living support.',
  housing_summary = 'The community features over 70 private, pet-friendly apartments in five configurations (studios, alcoves, one-bedroom, two-bedroom, and shared rooms), all equipped with emergency alert systems and available floor plan variations.',
  community_summary = 'Part of Brookdale Senior Living''s 47-year legacy, this West Hartford location earned #1 in Customer Satisfaction and multiple awards for memory care quality, activities/enrichment, caregiving, and dining services, featuring beautifully landscaped grounds with walking paths, a fireside lounge, arts studio, and restaurant-style dining.',
  updated_at = NOW()
WHERE name = 'Brookdale West Hartford'
  OR address LIKE '%22 Simsbury Road%';

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
  'Brookdale West Hartford',
  'West Hartford, CT',
  '22 Simsbury Road, West Hartford, CT 06117',
  'Upscale assisted living and memory care community with 70+ private, pet-friendly apartments. U.S. News Best Senior Living community for memory care, awarded #1 in Customer Satisfaction with multiple awards for memory care quality, activities/enrichment, caregiving excellence, and dining services. Features beautifully landscaped grounds, restaurant-style dining, and person-centered care with 24/7 trained staff.',
  'Assisted Living & Memory Care',
  70,
  4.9,
  3395,
  7125,
  '(860) 523-9899',
  'https://www.brookdale.com/en/communities/brookdale-west-hartford.html',
  ARRAY['Assisted Living', 'Memory Care']::text[],
  ARRAY[
    'Studio Apartments (Private)',
    'Studio with Alcove (Private)',
    'One-Bedroom Apartments (Private)',
    'Two-Bedroom Apartments (Private)',
    'Shared Bedrooms (Semi-private)'
  ]::text[],
  ARRAY[
    '24/7 Emergency Alert Systems',
    'Restaurant-Style Dining Room',
    'Beautifully Landscaped Grounds',
    'Scenic Walking Paths',
    'Fireside Living Room',
    'Arts and Crafts Studio',
    'Beauty and Barber Shop',
    'Courtyard Gardens',
    'Café/Bistro',
    'Concierge Service',
    'Transportation Services',
    'On-Site Parking',
    'Guest Suites',
    'Wi-Fi Throughout Community',
    'Postal Services',
    'Memory Care Gardens',
    'Daily Fitness Classes',
    'Music Therapy Programs',
    'Pet-Friendly Accommodations',
    'Personal Solutions Program'
  ]::text[],
  'Brookdale West Hartford operates on a fee-for-service rental model with no entrance fees, offering assisted living from $3,395-$7,125/month and memory care from $6,420/month, with dining and housekeeping included in the base rate but additional costs for higher care levels and optional services.',
  'As a U.S. News Best Senior Living community for memory care with a 4.9-star rating, Brookdale provides 24/7 staffing with person-centered care plans, offering 6+ daily memory care programs including music therapy, gardening, and creative arts, plus customized assisted living support.',
  'The community features over 70 private, pet-friendly apartments in five configurations (studios, alcoves, one-bedroom, two-bedroom, and shared rooms), all equipped with emergency alert systems and available floor plan variations.',
  'Part of Brookdale Senior Living''s 47-year legacy, this West Hartford location earned #1 in Customer Satisfaction and multiple awards for memory care quality, activities/enrichment, caregiving, and dining services, featuring beautifully landscaped grounds with walking paths, a fireside lounge, arts studio, and restaurant-style dining.',
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
WHERE name = 'Brookdale West Hartford'
  OR address LIKE '%22 Simsbury Road%';

-- Expected Results:
-- name: Brookdale West Hartford
-- location: West Hartford, CT
-- phone: (860) 523-9899
-- community_type: Assisted Living & Memory Care
-- monthly_cost_min: 3395
-- monthly_cost_max: 7125
-- star_rating: 4.9
-- num_care_levels: 2
-- num_housing_options: 5
-- num_amenities: 20
