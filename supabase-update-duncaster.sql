-- Update Duncaster with comprehensive research findings
-- Based on research completed on 2025-10-24

UPDATE communities
SET
  -- Contact Information (CRITICAL FIX)
  phone = '(860) 726-2000',  -- Was: (860) 555-0129 (placeholder)
  website = 'https://duncaster.org/',  -- Was: missing
  address = '40 Loeffler Road, Bloomfield, CT 06002',  -- New field

  -- Enhanced Description
  description = 'Established in 1984 as the first not-for-profit Continuing Care Retirement Community in Greater Hartford, Duncaster is a boutique Life Plan Community sitting on 94 acres of landscaped grounds, offering comprehensive LifeCare™ protection against high long-term care costs and voted Best Retirement Community by Hartford Magazine.',

  -- More Specific Community Type
  community_type = 'Continuing Care Retirement Community (CCRC)',

  -- Complete Care Levels (was only showing Independent Living)
  care_levels = ARRAY[
    'Independent Living',
    'Assisted Living',
    'Memory Care',
    'Skilled Nursing',
    'Rehabilitation Care',
    'Respite Care'
  ],

  -- Add Cottage Housing Option
  housing_options = ARRAY[
    'Studio',
    'One-bedroom apartment',
    'Two-bedroom apartment',
    'Cottage'
  ],

  -- Comprehensive Amenities (was only 5, now 17)
  amenities = ARRAY[
    'Indoor Heated Lap Pool',
    'Spa & Hot Tub',
    'Fitness Center with Personal Trainer',
    'Golf Course Access',
    '94 Acres of Grounds & Walking Trails',
    'Beauty Salon',
    'Library',
    'Arts & Crafts Studio',
    'Woodworking Shop',
    'Music & Dance Programs',
    'Aquatic Center with Water Aerobics',
    'Restaurant-Style Dining',
    '24-Hour Nursing Care',
    'Physical Therapy',
    'Transportation Services',
    'Over 40 Clubs & Activities',
    'Educational Programs'
  ],

  -- Update timestamp
  updated_at = NOW()

WHERE name = 'Duncaster';

-- Verify the update
SELECT
  name,
  location,
  address,
  phone,
  website,
  community_type,
  array_length(care_levels, 1) as care_levels_count,
  array_length(housing_options, 1) as housing_options_count,
  array_length(amenities, 1) as amenities_count,
  updated_at
FROM communities
WHERE name = 'Duncaster';
