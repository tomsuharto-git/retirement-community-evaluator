// Test Supabase connection and check communities data
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔌 Testing Supabase connection...\n')

  try {
    // Test 1: Check if we can connect
    const { data: tables, error: tableError } = await supabase
      .from('communities')
      .select('count')
      .limit(1)

    if (tableError) {
      console.error('❌ Connection failed:', tableError.message)
      return
    }

    console.log('✅ Connection successful!\n')

    // Test 2: Get all communities
    const { data: communities, error: dataError } = await supabase
      .from('communities')
      .select('*')
      .order('distance_miles', { ascending: true })

    if (dataError) {
      console.error('❌ Error fetching data:', dataError.message)
      return
    }

    console.log(`📊 Found ${communities?.length || 0} communities:\n`)

    // Display communities
    communities?.forEach((community, index) => {
      console.log(`${index + 1}. ${community.name}`)
      console.log(`   📍 ${community.location}`)
      console.log(`   📏 ${community.distance_miles} miles • ${community.drive_time_minutes} min`)
      console.log(`   ⭐ Rating: ${community.star_rating || 'Not rated'}`)
      console.log(`   👥 Residents: ${community.resident_count || 'Unknown'}`)
      console.log(`   ${community.visited ? '✅ Visited' : '⏳ Not visited yet'}`)
      console.log('')
    })

    // Test 3: Check table structure
    console.log('📋 Table columns:')
    if (communities && communities.length > 0) {
      const columns = Object.keys(communities[0])
      console.log(columns.join(', '))
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testConnection()
