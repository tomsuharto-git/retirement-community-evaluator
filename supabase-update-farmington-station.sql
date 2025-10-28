-- Supabase Update Statement for Farmington Station Senior Living
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'Farmington Station Senior Living',
  location = 'Farmington, CT',
  address = '111 Scott Swamp Road, Farmington, CT 06032',
  description = 'Premier assisted living and memory care community with 89 AL apartments and 45 memory care units, proudly recognized as one of the first in the nation to receive Purple Flag for Dementia Care™ Accreditation. U.S. News Best Senior Living community earning A Place for Mom awards for ''Best Meals and Dining'' and ''Most Friendly in Senior Living'' with a 9.2/10 score from 75 reviews. Features award-winning Brain Healthy Cooking, state-of-the-art Compass Memory Support Neighborhood®, movie theater, FOX Rehabilitation partnership, and no minimum stay respite policy.',
  community_type = 'Assisted Living & Memory Care',
  resident_count = 134,
  star_rating = 4.6,
  monthly_cost_min = 2975,
  monthly_cost_max = 8750,
  phone = '(860) 284-0505',
  website = 'https://www.seniorlivingresidences.com/communities/farmington-station-ct/',
  care_levels = ARRAY[
    'Assisted Living',
    'Compass Memory Support Neighborhood® (Memory Care)',
    'Memory Care',
    'Respite Care',
    'Independent Living'
  ]::text[],
  housing_options = ARRAY[
    'Assisted Living Apartments (89 units)',
    'Memory Care Studio Apartments (5 units)',
    'Memory Care Private Bedroom Friendship Suites (40 units)',
    'Respite Stay Accommodations'
  ]::text[],
  amenities = ARRAY[
    'Purple Flag for Dementia Care™ Accreditation',
    'Compass Memory Support Neighborhood®',
    'Award-Winning Brain Healthy Cooking Program',
    'Movie Theater with Monday Movie Nights',
    'Full-Service Salon',
    'Social Hour in the Café',
    'Forever Fit Exercise Program',
    'Educational Lectures',
    'Musical Performances',
    'Serene Outdoor Spaces with Gardens and Patios',
    'Enclosed Courtyards for Memory Care',
    'FOX Rehabilitation Partnership (On-Site Therapy)',
    'Person-Centered Proactive Wellness Care',
    '24/7 Trained Staff',
    'Emergency Response Systems',
    'Daily Activity Programming',
    'Transportation Services',
    'Convenient Farmington Location Near Downtown',
    'Respite Care with No Minimum Stay Policy',
    'Friendship Suites Social Connection Design'
  ]::text[],
  financials_summary = 'Farmington Station offers monthly rental pricing from $2,975-$8,750 (average $4,346) with no entrance fees, positioned below Farmington''s $5,250 area average, and features a unique no minimum stay policy for flexible respite care in both assisted living and memory care neighborhoods.',
  care_summary = 'As one of the nation''s first Purple Flag for Dementia Care™ Accredited communities with a U.S. News Best Senior Living rating and 9.2/10 score from 75 reviews, Farmington Station provides award-winning care through the Compass Memory Support Neighborhood®, Brain Healthy Cooking program, and FOX Rehabilitation partnership, earning ''Most Friendly in Senior Living'' recognition.',
  housing_summary = 'The community features 89 assisted living apartments plus 45 memory care units (5 studios and 40 private bedroom friendship suites) in the specialized Compass neighborhood, all with access to enclosed courtyards and serene outdoor spaces.',
  community_summary = 'Earning A Place for Mom awards for ''Best Meals and Dining'' and ''Most Friendly in Senior Living,'' this Senior Living Residences community features a movie theater for Monday Movie Nights, full-service salon, café with social hour, Forever Fit exercise, educational lectures, musical performances, and convenient access to historic downtown Farmington''s shopping, dining, and medical facilities.',
  updated_at = NOW()
WHERE name LIKE '%Farmington Station%'
  OR address LIKE '%111 Scott Swamp%';

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
  'Farmington Station Senior Living',
  'Farmington, CT',
  '111 Scott Swamp Road, Farmington, CT 06032',
  'Premier assisted living and memory care community with 89 AL apartments and 45 memory care units, proudly recognized as one of the first in the nation to receive Purple Flag for Dementia Care™ Accreditation. U.S. News Best Senior Living community earning A Place for Mom awards for ''Best Meals and Dining'' and ''Most Friendly in Senior Living'' with a 9.2/10 score from 75 reviews. Features award-winning Brain Healthy Cooking, state-of-the-art Compass Memory Support Neighborhood®, movie theater, FOX Rehabilitation partnership, and no minimum stay respite policy.',
  'Assisted Living & Memory Care',
  134,
  4.6,
  2975,
  8750,
  '(860) 284-0505',
  'https://www.seniorlivingresidences.com/communities/farmington-station-ct/',
  ARRAY[
    'Assisted Living',
    'Compass Memory Support Neighborhood® (Memory Care)',
    'Memory Care',
    'Respite Care',
    'Independent Living'
  ]::text[],
  ARRAY[
    'Assisted Living Apartments (89 units)',
    'Memory Care Studio Apartments (5 units)',
    'Memory Care Private Bedroom Friendship Suites (40 units)',
    'Respite Stay Accommodations'
  ]::text[],
  ARRAY[
    'Purple Flag for Dementia Care™ Accreditation',
    'Compass Memory Support Neighborhood®',
    'Award-Winning Brain Healthy Cooking Program',
    'Movie Theater with Monday Movie Nights',
    'Full-Service Salon',
    'Social Hour in the Café',
    'Forever Fit Exercise Program',
    'Educational Lectures',
    'Musical Performances',
    'Serene Outdoor Spaces with Gardens and Patios',
    'Enclosed Courtyards for Memory Care',
    'FOX Rehabilitation Partnership (On-Site Therapy)',
    'Person-Centered Proactive Wellness Care',
    '24/7 Trained Staff',
    'Emergency Response Systems',
    'Daily Activity Programming',
    'Transportation Services',
    'Convenient Farmington Location Near Downtown',
    'Respite Care with No Minimum Stay Policy',
    'Friendship Suites Social Connection Design'
  ]::text[],
  'Farmington Station offers monthly rental pricing from $2,975-$8,750 (average $4,346) with no entrance fees, positioned below Farmington''s $5,250 area average, and features a unique no minimum stay policy for flexible respite care in both assisted living and memory care neighborhoods.',
  'As one of the nation''s first Purple Flag for Dementia Care™ Accredited communities with a U.S. News Best Senior Living rating and 9.2/10 score from 75 reviews, Farmington Station provides award-winning care through the Compass Memory Support Neighborhood®, Brain Healthy Cooking program, and FOX Rehabilitation partnership, earning ''Most Friendly in Senior Living'' recognition.',
  'The community features 89 assisted living apartments plus 45 memory care units (5 studios and 40 private bedroom friendship suites) in the specialized Compass neighborhood, all with access to enclosed courtyards and serene outdoor spaces.',
  'Earning A Place for Mom awards for ''Best Meals and Dining'' and ''Most Friendly in Senior Living,'' this Senior Living Residences community features a movie theater for Monday Movie Nights, full-service salon, café with social hour, Forever Fit exercise, educational lectures, musical performances, and convenient access to historic downtown Farmington''s shopping, dining, and medical facilities.',
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
WHERE name LIKE '%Farmington Station%'
  OR address LIKE '%111 Scott Swamp%';

-- Expected Results:
-- name: Farmington Station Senior Living
-- location: Farmington, CT
-- phone: (860) 284-0505
-- community_type: Assisted Living & Memory Care
-- monthly_cost_min: 2975
-- monthly_cost_max: 8750
-- star_rating: 4.6
-- num_care_levels: 5
-- num_housing_options: 4
-- num_amenities: 20
