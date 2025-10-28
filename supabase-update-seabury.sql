-- Update Seabury with comprehensive research findings
-- Research completed on 2025-10-24

UPDATE communities
SET
  -- Contact Information
  phone = '(860) 286-0243',
  website = 'https://seaburylife.org/',
  address = '200 Seabury Drive, Bloomfield, CT 06002',

  -- Enhanced Description
  description = 'Founded in 1992 on a former dairy farm, Seabury is a CARF-accredited Active Life Plan Community (CCRC) situated on 66 acres of beautiful Connecticut countryside. Winner of Hartford Magazine''s ''Best of Hartford'' award from 2009-2023, Seabury emphasizes a ''Wellness for Life'' philosophy with comprehensive care, active lifestyle programming, and the security of future long-term care at no additional cost through their Life Care contract.',

  -- Community Type
  community_type = 'Continuing Care Retirement Community (CCRC)',

  -- Resident Count and Rating
  resident_count = 260,
  star_rating = 4.0,

  -- Pricing
  monthly_cost_min = 4200,
  monthly_cost_max = 8800,

  -- Complete Care Levels (7 levels)
  care_levels = ARRAY[
    'Independent Living',
    'Assisted Living',
    'Enhanced Living',
    'Memory Care',
    'Skilled Nursing',
    'Rehabilitation Care',
    'Home Care'
  ],

  -- Housing Options (5 types)
  housing_options = ARRAY[
    'Studio',
    'One-bedroom apartment',
    'Two-bedroom apartment',
    'Two-bedroom apartment with den',
    'Cottage'
  ],

  -- Comprehensive Amenities (21 detailed amenities)
  amenities = ARRAY[
    'Extensive Fitness & Wellness Center with HUR & Keiser Equipment',
    'Indoor Heated Swimming Pool',
    'Spa & Hot Tub',
    'Dance Studio',
    'Pilates Studio',
    'Therapeutic Massage Suite',
    'The Fran Perkins Arboretum with 30+ Cherry Trees',
    '66 Acres of Grounds & Walking Trails',
    'Hartford HealthCare Clinic On-Site',
    '24-Hour Nursing Care',
    'Physical, Occupational & Speech Therapy',
    'Library',
    'Art Gallery',
    'Chapel',
    'Game Room',
    'Computer Center',
    'In-House TV Channel',
    'Restaurant-Style Dining',
    'Beauty Salon & Barbershop',
    'Transportation Services',
    'Outdoor Gardens',
    'Solar Energy Initiatives'
  ],

  -- Section Summaries
  financials_summary = 'Seabury offers a Life Care contract that provides guaranteed living accommodations and comprehensive care at no additional cost as needs change, with monthly fees ranging from $4,200 to $8,800. The Seabury Charitable Foundation ensures that no resident who becomes unable to pay will lose their home, providing true financial security and peace of mind.',

  care_summary = 'As a CARF-accredited Active Life Plan Community with 14 consecutive ''Best of Hartford'' awards, Seabury provides a full continuum of care from independent living through skilled nursing, including specialized memory care and the on-site Hartford HealthCare Clinic. The ''Wellness for Life'' philosophy emphasizes preventive care and active living, with state-of-the-art HUR and Keiser fitness equipment.',

  housing_summary = 'Seabury offers charming individual cottages and spacious apartments ranging from studios to two-bedroom units with dens, all situated on a former dairy farm now featuring the 66-acre Fran Perkins Arboretum. Residents enjoy beautiful views of landscaped grounds, cherry tree groves, and walking trails throughout the campus.',

  community_summary = 'With 66 acres of countryside, the Fran Perkins Arboretum featuring 30+ cherry trees, and an extensive wellness center with pool, spa, dance and Pilates studios, Seabury emphasizes active living and environmental stewardship. The community offers educational programs, cultural experiences, and social activities guided by resident involvement and a commitment to sustainability with solar energy initiatives.',

  -- Update timestamp
  updated_at = NOW()

WHERE name = 'Seabury';

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
WHERE name = 'Seabury';
