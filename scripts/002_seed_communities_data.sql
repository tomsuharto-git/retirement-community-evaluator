-- Insert sample retirement communities data based on the mockup
INSERT INTO public.communities (
  name, location, address, latitude, longitude, distance_miles, drive_time_minutes,
  star_rating, resident_count, visited, community_type, monthly_cost_min, monthly_cost_max,
  amenities, description, phone
) VALUES 
(
  'Brookdale Chatfield', 'West Hartford', '1 Chatfield Dr, West Hartford, CT 06110',
  41.7658, -72.7201, 2.1, 8, 4.0, 120,
  false, 'Continuing Care', 3070, 7806,
  ARRAY['Independent Living', 'Assisted Living', 'Memory Care', 'Fitness Center', 'Chef-Prepared Dining', 'Social Events', '24/7 Staff', 'West Farms Mall Access', 'Wolcott Park Access'],
  'Senior living with meaningful experiences, vibrant community and personalized care on 10+ luscious acres. Offers independent living, assisted living and memory care. U.S. News rated Best Senior Living for memory care.',
  '(860) 561-1669'
),
(
  'The McAuley', 'West Hartford', '275 Steele Rd, West Hartford, CT 06117',
  41.7834, -72.7123, 3.2, 10, 5.0, 85,
  false, 'Assisted Living', 4200, 6800,
  ARRAY['Memory Care', 'Nursing', 'Therapy', 'Chapel'],
  'Comprehensive care community with a focus on dignity and quality of life.',
  '(860) 555-0124'
),
(
  'Farmington Station', 'Farmington', '1 Batterson Park Rd, Farmington, CT 06032',
  41.7199, -72.8326, 4.3, 12, 4.5, 95,
  false, 'Independent Living', 3200, 4800,
  ARRAY['Golf Course', 'Pool', 'Restaurant', 'Library'],
  'Luxury retirement living with golf course views and upscale amenities.',
  '(860) 555-0125'
),
(
  'Brookdale West Hartford', 'West Hartford', '22 Simsbury Rd, West Hartford, CT 06117',
  41.7612, -72.7089, 2.4, 9, 4.0, 110,
  false, 'Assisted Living', 4240, 7200,
  ARRAY['Assisted Living', 'Memory Care', 'Pet-Friendly', 'Private Apartments', 'Chef-Inspired Meals', 'Restaurant-Style Dining', 'Landscaped Campus', '24/7 Trained Staff', 'Near University of Hartford', 'Near Hartford Golf Club'],
  'Home-like senior living community offering assisted living and memory care with personalized support. Beautifully landscaped campus on private grounds. U.S. News rated Best Senior Living for memory care.',
  '(860) 523-9899'
),
(
  'Avery West Hartford', 'West Hartford', '101 S Main St, West Hartford, CT 06107',
  41.7612, -72.7423, 2.7, 12, 4.5, 75,
  false, 'Independent Living', 4000, 6200,
  ARRAY['Concierge', 'Fitness', 'Cultural Events', 'Fine Dining'],
  'Upscale independent living in the heart of West Hartford with concierge services.',
  '(860) 555-0127'
),
(
  'Avery Heights', 'Hartford', '705 New Britain Ave, Hartford, CT 06106',
  41.7456, -72.7012, 2.7, 10, 4.5, 200,
  false, 'Continuing Care', 3800, 8500,
  ARRAY['Healthcare', 'Independent Living', 'Assisted Living', 'Skilled Nursing'],
  'Full-service continuing care retirement community with comprehensive healthcare.',
  '(860) 555-0128'
),
(
  'Duncaster', 'Bloomfield', '40 Loeffler Rd, Bloomfield, CT 06002',
  41.8234, -72.7456, 6.1, 18, 5.0, 340,
  false, 'Continuing Care', 4500, 9200,
  ARRAY['Golf', 'Fitness Center', 'Pool', 'Healthcare', 'Dining'],
  'Premier continuing care retirement community with extensive amenities and healthcare services.',
  '(860) 555-0129'
),
(
  'Middlewoods of Farmington', 'Farmington', '1 Middlewoods Way, Farmington, CT 06032',
  41.7089, -72.8234, 5.4, 14, 3.5, 180,
  false, 'Independent Living', 3600, 5400,
  ARRAY['Nature Trails', 'Clubhouse', 'Pool', 'Tennis'],
  'Scenic retirement community surrounded by nature with active lifestyle amenities.',
  '(860) 555-0130'
),
(
  'Seabury', 'Bloomfield', '200 Seabury Dr, Bloomfield, CT 06002',
  41.8156, -72.7389, 6.2, 19, 4.0, 260,
  false, 'Continuing Care', 4200, 8800,
  ARRAY['Healthcare', 'Fitness', 'Arts Center', 'Library'],
  'Established continuing care community with strong healthcare services and cultural programs.',
  '(860) 555-0131'
),
(
  'River Ridge at Avon', 'Avon', '200 Climax Rd, Avon, CT 06001',
  41.7923, -72.8456, 7.8, 20, 5.0, 160,
  false, 'Independent Living', 3900, 5800,
  ARRAY['River Views', 'Walking Trails', 'Clubhouse', 'Transportation'],
  'Beautiful riverside retirement community with scenic views and outdoor recreation.',
  '(860) 555-0132'
);
