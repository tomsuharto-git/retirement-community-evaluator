import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Check if environment variables are set
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }

    // Try to create a client and query
    const supabase = await createClient()
    const { data, error, count } = await supabase
      .from("communities")
      .select("*", { count: "exact" })

    return NextResponse.json({
      success: !error,
      envCheck,
      error: error ? { message: error.message, details: error } : null,
      rowCount: count,
      sampleData: data?.slice(0, 2), // Return first 2 communities as sample
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
}
