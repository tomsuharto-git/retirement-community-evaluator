// Add Covenant Living of Cromwell to the database
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function addCromwell() {
  console.log('🏘️  Adding Covenant Living of Cromwell to database...\n')

  try {
    const { data, error } = await supabase
      .from('communities')
      .insert({
        name: 'Covenant Living of Cromwell',
        location: 'Cromwell',
        address: '101 West Street, Cromwell, CT 06416',
        latitude: 41.5950,
        longitude: -72.6450,
        distance_miles: 11.2,
        drive_time_minutes: 18,
        star_rating: 4.3,
        resident_count: 300,
        visited: false,
        community_type: 'Continuing Care',
        monthly_cost_min: 2742,
        monthly_cost_max: 5500,
        amenities: [
          'State-of-the-Art Fitness Center',
          'Town Center Community Room',
          'Restaurant-Style Dining',
          'Common Grounds Café',
          'Coffee Shop',
          'Movie Theater',
          'Music Room',
          'Arts & Crafts Studio',
          'Art Center',
          'Activities Room',
          'Barber & Beauty Salon',
          'Library',
          'Billiard Room',
          '42 Acres of Landscaped Grounds',
          'Flower-Filled Gardens',
          'Walking Trails',
          'Jogging & Biking Paths',
          'Natural Pond Views',
          'Pet-Friendly (Dog Run)',
          '24-Hour Emergency Response',
          '24-Hour Nursing Staff',
          'Medication Management',
          'Physical Therapy',
          'On-Site Rehabilitation',
          'Healthcare Navigation',
          'Transportation Services',
          'Daily Shopping Trips',
          'Housekeeping Services',
          'Laundry Services',
          'Community-Wide Free Wi-Fi',
          'Private Kitchenettes',
          'Patios & Balconies',
          'Multiple Elevators',
          'Backup Generator'
        ],
        description: 'Established continuing care retirement community on a picturesque 42-acre campus featuring flower-filled gardens and evergreen-shaded walking paths near Hartford. Offers complete continuum of care from independent living through skilled nursing at Pilgrim Manor, with specialized memory care, rehabilitation services, and the innovative LifeConnect wellness program. Award-winning community (Best of Hartford finalist 2019-2022) featuring Town Center with café, restaurant, movie theater, art studio, state-of-the-art fitness center, and over 40 clubs and activities for an engaged lifestyle.',
        phone: '(860) 635-2690',
        website: 'https://www.covlivingcromwell.org/'
      })
      .select()

    if (error) {
      console.error('❌ Error inserting community:', error.message)
      return
    }

    console.log('✅ Successfully added Covenant Living of Cromwell!')
    console.log('\n📊 Community details:')
    console.log(`   Name: ${data[0].name}`)
    console.log(`   Location: ${data[0].location}`)
    console.log(`   Address: ${data[0].address}`)
    console.log(`   Distance: ${data[0].distance_miles} miles`)
    console.log(`   Rating: ${data[0].star_rating} ⭐`)
    console.log(`   Residents: ${data[0].resident_count}`)
    console.log(`   Cost Range: $${data[0].monthly_cost_min.toLocaleString()} - $${data[0].monthly_cost_max.toLocaleString()}/mo`)
    console.log(`   ID: ${data[0].id}`)

    // Verify total count
    const { count } = await supabase
      .from('communities')
      .select('*', { count: 'exact', head: true })

    console.log(`\n✅ Total communities in database: ${count}`)

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

addCromwell()
