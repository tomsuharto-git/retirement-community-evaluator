-- Update Brookdale Chatfield with comprehensive research findings
-- Research completed on 2025-10-24

UPDATE communities
SET
  -- Contact Information
  phone = '(860) 561-1669',
  website = 'https://www.brookdale.com/en/communities/brookdale-chatfield.html',
  address = '1 Chatfield Drive, West Hartford, CT 06110',

  -- Enhanced Description
  description = 'Part of the nation''s largest senior living provider, Brookdale Chatfield offers independent living, assisted living, and memory care on a single campus nestled on over 10 acres of beautifully landscaped grounds in West Hartford. Named a U.S. News ''Best Senior Living Community'' for memory care, the community features chef-prepared restaurant-style dining, luxury amenities including a sports bar and theater, and personalized care plans that adjust as needs change.',

  -- Community Type
  community_type = 'Senior Living Community (IL, AL, MC)',

  -- Resident Count and Rating
  resident_count = 120,
  star_rating = 3.8,

  -- Pricing (Fee-for-Service Model, No Entrance Fee)
  monthly_cost_min = 4095,
  monthly_cost_max = 8025,

  -- Care Levels (3 levels)
  care_levels = ARRAY[
    'Independent Living',
    'Assisted Living',
    'Memory Care'
  ],

  -- Housing Options (3 types)
  housing_options = ARRAY[
    'Studio',
    'One-bedroom apartment',
    'Two-bedroom apartment'
  ],

  -- Comprehensive Amenities (20 detailed amenities)
  amenities = ARRAY[
    '10+ Acres of Landscaped Grounds',
    'Restaurant-Style Dining with Chef-Prepared Meals',
    'Pub & Sports Bar',
    'Theater',
    'Fitness Center with Exercise Classes',
    'Game Room with Billiards',
    'Arts & Crafts Studio',
    'Library',
    'Beauty Salon & Barber Shop',
    'Café & Bistro',
    'Walking Paths Throughout Campus',
    'Therapy Room',
    '24/7 Emergency Alert System',
    'Transportation Services',
    'Housekeeping & Laundry Services',
    'Concierge Services',
    'Guest Suites',
    'Personal Solutions Ordering Program',
    'Meditation Groups & Wellness Classes',
    'Social Activities & Entertainment'
  ],

  -- Section Summaries
  financials_summary = 'Brookdale Chatfield offers a flexible fee-for-service model with no large entrance fee required, with monthly costs ranging from $4,095 to $8,025 depending on care level. As part of the nation''s largest senior living provider, residents pay only for the services they need, with care plans that adjust as needs change, plus a one-time community fee of $550-$6,100.',

  care_summary = 'As a U.S. News ''Best Senior Living Community'' for memory care, Brookdale Chatfield provides three levels of care on one campus - independent living, assisted living, and specialized memory care using person-centered Celebrations programming. With 24/7 staffing, personalized care plans, and the comprehensive Optimum Life® wellness approach, transitions between care levels are seamless as needs evolve.',

  housing_summary = 'Brookdale Chatfield offers spacious apartments from studios to two-bedroom units across its 10-acre landscaped campus, with independent living residences featuring full kitchens and in-unit washer/dryers. Semi-private options provide more affordable choices, while memory care apartments are located in secured areas designed specifically for residents with Alzheimer''s and dementia.',

  community_summary = 'Nestled on over 10 acres near West Farms Mall and Wolcott Park, Brookdale Chatfield features luxury amenities including a pub/sports bar, theater, arts studio, and restaurant-style dining with chef-prepared meals. Residents enjoy daily activities from karaoke to meditation groups, walking paths through beautifully landscaped grounds, and the convenience of the Personal Solutions ordering program.',

  -- Update timestamp
  updated_at = NOW()

WHERE name = 'Brookdale Chatfield';

-- Verify the update
SELECT
  name,
  location,
  address,
  phone,
  website,
  community_type,
  resident_count,
  star_rating,
  monthly_cost_min,
  monthly_cost_max,
  array_length(care_levels, 1) as care_levels_count,
  array_length(housing_options, 1) as housing_options_count,
  array_length(amenities, 1) as amenities_count,
  length(financials_summary) as financials_summary_length,
  length(care_summary) as care_summary_length,
  length(housing_summary) as housing_summary_length,
  length(community_summary) as community_summary_length,
  updated_at
FROM communities
WHERE name = 'Brookdale Chatfield';
