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
