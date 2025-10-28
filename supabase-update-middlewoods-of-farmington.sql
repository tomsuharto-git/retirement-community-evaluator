-- Supabase Update Statement for Middlewoods of Farmington
-- Community ID: TBD (check existing database for ID or insert new record)
-- Last Updated: October 24, 2025

-- UPDATE existing record (if community already exists in database)
UPDATE communities
SET
  name = 'Middlewoods of Farmington',
  location = 'Farmington, CT',
  address = '509 Middle Road, Farmington, CT 06032',
  description = 'Small, home-like assisted living community with 73 apartments, affiliated with the University of Connecticut Health Center. Owned by United Methodist Homes, a faith-based non-profit, this intimate community offers relationship-centered care with unique benefits including on-site UConn geriatric physician and psychiatrist appointments, complimentary YMCA membership, and full kitchens in all apartments. Rated 9.4/10 by A Place for Mom, featuring wellness clinic with on-site RN, arts room, beauty salon, movie theater, and diverse fitness programming.',
  community_type = 'Independent Living & Assisted Living',
  resident_count = 73,
  star_rating = 4.7,
  monthly_cost_min = 2280,
  monthly_cost_max = 5474,
  phone = 'Contact facility for phone number',
  website = 'https://www.umh.org/middlewoods',
  care_levels = ARRAY[
    'Independent Living',
    'Assisted Living',
    'On-Site Medical Services (UConn Geriatric Physicians)',
    'On-Site Psychiatric Services (UConn Geriatric Psychiatrist)',
    'Wellness Clinic with RN'
  ]::text[],
  housing_options = ARRAY[
    'Efficiency Apartments with Kitchenettes',
    'One-Bedroom Apartments with Full Kitchens',
    'Two-Bedroom Apartments with Full Kitchens'
  ]::text[],
  amenities = ARRAY[
    'University of Connecticut Health Center Affiliation',
    'On-Site Geriatric Physician Appointments (UConn)',
    'On-Site Geriatric Psychiatrist Services (UConn)',
    'Complimentary YMCA Membership',
    'Full Kitchens in All Apartments',
    'Wellness Clinic with On-Site RN',
    'Arts Room',
    'Beauty Salon and Barber Shop',
    'Regular Movie Nights',
    'Community Movie Theater',
    'Transportation Services',
    'Parking Facilities',
    'Balance, Stretching & Strength Training Classes',
    'Yoga, Qigong, Tai Chi Classes',
    'Barre and Zumba Classes',
    'Podiatrist Clinic On-Site',
    'Hearing Clinic On-Site',
    'Medication Support',
    'Emergency Call System',
    'Community-Sponsored Activities'
  ]::text[],
  financials_summary = 'Middlewoods of Farmington offers monthly rental pricing averaging $3,910 (ranging from $2,280-$5,474 across sources) with no entrance fees, including 3 meals daily, weekly housekeeping and laundry, on-site wellness clinic with RN, and complimentary YMCA membership, all supported by United Methodist Homes'' faith-based non-profit mission.',
  care_summary = 'Rated 9.4/10 by A Place for Mom, this United Methodist Homes community provides relationship-centered assisted living with unique UConn Health affiliation enabling on-site geriatric physician and psychiatrist appointments, plus podiatrist and hearing clinics, all in a small 73-apartment home-like setting.',
  housing_summary = 'The intimate 73-apartment community offers efficiency, one-bedroom, and two-bedroom units, each featuring full kitchens (unusual for assisted living), in-suite kitchenettes, emergency call systems, and various floor plans promoting independence and home-like comfort.',
  community_summary = 'Owned by United Methodist Homes and affiliated with UConn Health Center, this small Farmington community features complimentary YMCA membership, on-site arts room, beauty salon, movie theater, diverse fitness classes (yoga, qigong, tai chi, barre, Zumba, balance training), and easy access to UConn geriatric specialists, podiatry, and hearing services.',
  updated_at = NOW()
WHERE name LIKE '%Middlewoods%Farmington%'
  OR address LIKE '%509 Middle Road%';

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
  'Middlewoods of Farmington',
  'Farmington, CT',
  '509 Middle Road, Farmington, CT 06032',
  'Small, home-like assisted living community with 73 apartments, affiliated with the University of Connecticut Health Center. Owned by United Methodist Homes, a faith-based non-profit, this intimate community offers relationship-centered care with unique benefits including on-site UConn geriatric physician and psychiatrist appointments, complimentary YMCA membership, and full kitchens in all apartments. Rated 9.4/10 by A Place for Mom, featuring wellness clinic with on-site RN, arts room, beauty salon, movie theater, and diverse fitness programming.',
  'Independent Living & Assisted Living',
  73,
  9.4,
  2280,
  5474,
  'Contact facility for phone number',
  'https://www.umh.org/middlewoods',
  ARRAY[
    'Independent Living',
    'Assisted Living',
    'On-Site Medical Services (UConn Geriatric Physicians)',
    'On-Site Psychiatric Services (UConn Geriatric Psychiatrist)',
    'Wellness Clinic with RN'
  ]::text[],
  ARRAY[
    'Efficiency Apartments with Kitchenettes',
    'One-Bedroom Apartments with Full Kitchens',
    'Two-Bedroom Apartments with Full Kitchens'
  ]::text[],
  ARRAY[
    'University of Connecticut Health Center Affiliation',
    'On-Site Geriatric Physician Appointments (UConn)',
    'On-Site Geriatric Psychiatrist Services (UConn)',
    'Complimentary YMCA Membership',
    'Full Kitchens in All Apartments',
    'Wellness Clinic with On-Site RN',
    'Arts Room',
    'Beauty Salon and Barber Shop',
    'Regular Movie Nights',
    'Community Movie Theater',
    'Transportation Services',
    'Parking Facilities',
    'Balance, Stretching & Strength Training Classes',
    'Yoga, Qigong, Tai Chi Classes',
    'Barre and Zumba Classes',
    'Podiatrist Clinic On-Site',
    'Hearing Clinic On-Site',
    'Medication Support',
    'Emergency Call System',
    'Community-Sponsored Activities'
  ]::text[],
  'Middlewoods of Farmington offers monthly rental pricing averaging $3,910 (ranging from $2,280-$5,474 across sources) with no entrance fees, including 3 meals daily, weekly housekeeping and laundry, on-site wellness clinic with RN, and complimentary YMCA membership, all supported by United Methodist Homes'' faith-based non-profit mission.',
  'Rated 9.4/10 by A Place for Mom, this United Methodist Homes community provides relationship-centered assisted living with unique UConn Health affiliation enabling on-site geriatric physician and psychiatrist appointments, plus podiatrist and hearing clinics, all in a small 73-apartment home-like setting.',
  'The intimate 73-apartment community offers efficiency, one-bedroom, and two-bedroom units, each featuring full kitchens (unusual for assisted living), in-suite kitchenettes, emergency call systems, and various floor plans promoting independence and home-like comfort.',
  'Owned by United Methodist Homes and affiliated with UConn Health Center, this small Farmington community features complimentary YMCA membership, on-site arts room, beauty salon, movie theater, diverse fitness classes (yoga, qigong, tai chi, barre, Zumba, balance training), and easy access to UConn geriatric specialists, podiatry, and hearing services.',
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
WHERE name LIKE '%Middlewoods%Farmington%'
  OR address LIKE '%509 Middle Road%';

-- Expected Results:
-- name: Middlewoods of Farmington
-- location: Farmington, CT
-- phone: Contact facility for phone number
-- community_type: Independent Living & Assisted Living
-- monthly_cost_min: 2280
-- monthly_cost_max: 5474
-- star_rating: 9.4
-- num_care_levels: 5
-- num_housing_options: 3
-- num_amenities: 20

-- NOTE: Phone number not readily available in public sources - recommend obtaining from facility directly
