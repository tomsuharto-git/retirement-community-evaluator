-- Supabase Update Statement for The McAuley
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'The McAuley',
  location = 'West Hartford, CT',
  address = '275 Steele Road, West Hartford, CT 06117',
  description = 'West Hartford''s only Life Plan Community (CCRC), celebrating its 30th Anniversary on a beautiful 26-acre campus adjacent to University of Saint Joseph. Voted Best in Independent Living by West Hartford Magazine for eight consecutive years, this Trinity Health Senior Communities facility partners with Saint Mary Home as ''The Mercy Community'' to offer independent living, assisted living, rehabilitation, and advanced nursing care. Features unique wood shop, greenhouse, garden boxes, floral design space, art exhibitions, 19th hole golf lounge, and interfaith meditation room.',
  community_type = 'Life Plan Community / CCRC',
  resident_count = 135,
  star_rating = NULL,
  monthly_cost_min = 5000,
  monthly_cost_max = 6000,
  phone = '(860) 920-6300',
  website = 'https://www.trinityhealthseniorcommunities.org/connecticut/the-mcauley',
  care_levels = ARRAY[
    'Independent Living',
    'Assisted Living',
    'Rehabilitation Services',
    'Advanced Nursing Care'
  ]::text[],
  housing_options = ARRAY[
    'Studio Apartments',
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments',
    'Executive Suites',
    'Assisted Living Residences',
    'Pet-Friendly Residences'
  ]::text[],
  amenities = ARRAY[
    '26-Acre Campus',
    'Salon & Spa',
    'Fitness Center',
    'Resident Library',
    '19th Hole Lounge with Indoor/Outdoor Putting Greens',
    'Fireside Lounge',
    'Dining Room',
    'Interfaith Meditation Room',
    'Wood Shop',
    'Greenhouse',
    'Outdoor Garden Boxes',
    'Floral Design Space',
    'Art Exhibition Spaces',
    'Adjacent to University of Saint Joseph',
    'Near Elizabeth Park',
    'Minutes from West Hartford Center',
    'Transportation Services',
    'Multiple Dining Venues',
    'Cultural Programming',
    'Pet-Friendly Policies'
  ]::text[],
  financials_summary = 'The McAuley operates as a Life Plan Community with Life Care contracts averaging $5,369/month, slightly above West Hartford''s $5,250 CCRC average, providing predictable lifetime costs and priority access to rehabilitation and nursing care through the Saint Mary Home partnership.',
  care_summary = 'Celebrating 30 years as West Hartford''s only Life Plan Community, The McAuley offers Trinity Health System-backed care from independent living through advanced nursing via the Saint Mary Home partnership, with seamless transitions and long-term care coverage built into Life Care contracts.',
  housing_summary = 'The 26-acre campus features pet-friendly studios, one-bedroom, two-bedroom apartments, and executive suites for independent living, plus one dedicated assisted living floor, with most residents living independently in beautiful, modern residences.',
  community_summary = 'Voted Best in Independent Living by West Hartford Magazine for eight consecutive years, this 30-year Trinity Health community on 26 acres adjacent to University of Saint Joseph features a wood shop, greenhouse, garden boxes, floral design space, art exhibitions, 19th hole golf lounge, interfaith meditation room, and proximity to Elizabeth Park.',
  updated_at = NOW()
WHERE name = 'The McAuley'
  OR address LIKE '%275 Steele Road%';

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
  'The McAuley',
  'West Hartford, CT',
  '275 Steele Road, West Hartford, CT 06117',
  'West Hartford''s only Life Plan Community (CCRC), celebrating its 30th Anniversary on a beautiful 26-acre campus adjacent to University of Saint Joseph. Voted Best in Independent Living by West Hartford Magazine for eight consecutive years, this Trinity Health Senior Communities facility partners with Saint Mary Home as ''The Mercy Community'' to offer independent living, assisted living, rehabilitation, and advanced nursing care. Features unique wood shop, greenhouse, garden boxes, floral design space, art exhibitions, 19th hole golf lounge, and interfaith meditation room.',
  'Life Plan Community / CCRC',
  135,
  NULL,
  5000,
  6000,
  '(860) 920-6300',
  'https://www.trinityhealthseniorcommunities.org/connecticut/the-mcauley',
  ARRAY[
    'Independent Living',
    'Assisted Living',
    'Rehabilitation Services',
    'Advanced Nursing Care'
  ]::text[],
  ARRAY[
    'Studio Apartments',
    'One-Bedroom Apartments',
    'Two-Bedroom Apartments',
    'Executive Suites',
    'Assisted Living Residences',
    'Pet-Friendly Residences'
  ]::text[],
  ARRAY[
    '26-Acre Campus',
    'Salon & Spa',
    'Fitness Center',
    'Resident Library',
    '19th Hole Lounge with Indoor/Outdoor Putting Greens',
    'Fireside Lounge',
    'Dining Room',
    'Interfaith Meditation Room',
    'Wood Shop',
    'Greenhouse',
    'Outdoor Garden Boxes',
    'Floral Design Space',
    'Art Exhibition Spaces',
    'Adjacent to University of Saint Joseph',
    'Near Elizabeth Park',
    'Minutes from West Hartford Center',
    'Transportation Services',
    'Multiple Dining Venues',
    'Cultural Programming',
    'Pet-Friendly Policies'
  ]::text[],
  'The McAuley operates as a Life Plan Community with Life Care contracts averaging $5,369/month, slightly above West Hartford''s $5,250 CCRC average, providing predictable lifetime costs and priority access to rehabilitation and nursing care through the Saint Mary Home partnership.',
  'Celebrating 30 years as West Hartford''s only Life Plan Community, The McAuley offers Trinity Health System-backed care from independent living through advanced nursing via the Saint Mary Home partnership, with seamless transitions and long-term care coverage built into Life Care contracts.',
  'The 26-acre campus features pet-friendly studios, one-bedroom, two-bedroom apartments, and executive suites for independent living, plus one dedicated assisted living floor, with most residents living independently in beautiful, modern residences.',
  'Voted Best in Independent Living by West Hartford Magazine for eight consecutive years, this 30-year Trinity Health community on 26 acres adjacent to University of Saint Joseph features a wood shop, greenhouse, garden boxes, floral design space, art exhibitions, 19th hole golf lounge, interfaith meditation room, and proximity to Elizabeth Park.',
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
WHERE name = 'The McAuley'
  OR address LIKE '%275 Steele Road%';

-- Expected Results:
-- name: The McAuley
-- location: West Hartford, CT
-- phone: (860) 920-6300
-- community_type: Life Plan Community / CCRC
-- monthly_cost_min: 5000
-- monthly_cost_max: 6000
-- star_rating: NULL
-- num_care_levels: 4
-- num_housing_options: 6
-- num_amenities: 20
