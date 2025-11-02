export interface Community {
  id: string
  name: string
  location: string
  address?: string
  latitude: number
  longitude: number
  distance_miles?: number
  drive_time_minutes?: number
  star_rating?: number
  resident_count?: number
  visited: boolean
  compare_selected: boolean
  community_type?: string
  monthly_cost_min?: number
  monthly_cost_max?: number
  amenities?: string[]
  description?: string
  phone?: string
  website?: string
  image_url?: string
  created_at?: string
  updated_at?: string

  // Section summaries (written during research)
  financials_summary?: string
  care_summary?: string
  housing_summary?: string
  community_summary?: string

  // Additional detail page fields
  care_levels?: string[]
  housing_options?: string[]
  entrance_fee_min?: number
  entrance_fee_max?: number
  images?: string[]

  // Review fields
  review_first_year_rating?: number
  review_affordability_rating?: number
  review_care_rating?: number
  review_housing_rating?: number
  review_community_rating?: number
  review_overall_rating?: number
  review_pros?: string
  review_cons?: string
  review_notes?: string
}

export interface MapPin {
  id: string
  name: string
  latitude: number
  longitude: number
  visited: boolean
}

export interface FilterOptions {
  visited: "all" | "visited" | "not-visited"
  sortBy: "distance" | "rating" | "name" | "cost"
  communityType?: string
  maxDistance?: number
  minRating?: number
}
