import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    // Get query parameters
    const search = searchParams.get("search") || ""
    const visited = searchParams.get("visited") || "all"
    const sortBy = searchParams.get("sortBy") || "distance"
    const communityType = searchParams.get("communityType")
    const maxDistance = searchParams.get("maxDistance")
    const minRating = searchParams.get("minRating")

    // Build query
    let query = supabase.from("communities").select("*")

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,location.ilike.%${search}%,community_type.ilike.%${search}%`)
    }

    // Apply visited filter
    if (visited === "visited") {
      query = query.eq("visited", true)
    } else if (visited === "not-visited") {
      query = query.eq("visited", false)
    }

    // Apply community type filter
    if (communityType && communityType !== "all") {
      query = query.eq("community_type", communityType)
    }

    // Apply distance filter
    if (maxDistance) {
      query = query.lte("distance_miles", Number.parseFloat(maxDistance))
    }

    // Apply rating filter
    if (minRating) {
      query = query.gte("star_rating", Number.parseFloat(minRating))
    }

    // Apply sorting
    switch (sortBy) {
      case "distance":
        query = query.order("distance_miles", { ascending: true, nullsLast: true })
        break
      case "rating":
        query = query.order("star_rating", { ascending: false, nullsLast: true })
        break
      case "name":
        query = query.order("name", { ascending: true })
        break
      case "cost":
        query = query.order("monthly_cost_min", { ascending: true, nullsLast: true })
        break
      default:
        query = query.order("distance_miles", { ascending: true, nullsLast: true })
    }

    const { data, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch communities" }, { status: 500 })
    }

    return NextResponse.json({ communities: data || [] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("communities").insert([body]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create community" }, { status: 500 })
    }

    return NextResponse.json({ community: data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
