"use client"

import { useState, useEffect } from "react"
import { CommunityMap } from "@/components/community-map"
import { CommunityGrid } from "@/components/community-grid"
import { SearchFilters } from "@/components/search-filters"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { ApiClient } from "@/lib/api-client"
import type { Community, FilterOptions } from "@/lib/types"

export default function HomePage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState<string>()
  const [filters, setFilters] = useState<FilterOptions>({
    visited: "all",
    sortBy: "distance",
  })

  // Load communities on mount
  useEffect(() => {
    loadCommunities()
  }, [])

  // Filter and search communities
  useEffect(() => {
    let filtered = [...communities]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (community) =>
          community.name.toLowerCase().includes(query) ||
          community.location.toLowerCase().includes(query) ||
          community.community_type?.toLowerCase().includes(query),
      )
    }

    // Apply visited filter
    if (filters.visited === "visited") {
      filtered = filtered.filter((c) => c.visited)
    } else if (filters.visited === "not-visited") {
      filtered = filtered.filter((c) => !c.visited)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "distance":
          return (a.distance_miles || 999) - (b.distance_miles || 999)
        case "rating":
          return (b.star_rating || 0) - (a.star_rating || 0)
        case "name":
          return a.name.localeCompare(b.name)
        case "cost":
          return (a.monthly_cost_min || 999999) - (b.monthly_cost_min || 999999)
        default:
          return 0
      }
    })

    setFilteredCommunities(filtered)
  }, [communities, searchQuery, filters])

  const loadCommunities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ApiClient.getCommunities()
      setCommunities(data)
    } catch (err) {
      setError("Failed to load communities. Please try again.")
      console.error("Error loading communities:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleVisited = async (id: string) => {
    try {
      const community = communities.find((c) => c.id === id)
      if (!community) return

      const updated = await ApiClient.toggleVisited(id, !community.visited)
      setCommunities((prev) => prev.map((c) => (c.id === id ? updated : c)))
    } catch (err) {
      console.error("Error toggling visited status:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <div className="text-muted-foreground">Loading retirement communities...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={loadCommunities} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Suharto Retirement Community Evaluator</h1>
                <p className="text-sm text-muted-foreground">Find and compare retirement communities in Connecticut</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                {filteredCommunities.length} communities
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main Content - Side by side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Communities List - Left Side */}
          <div className="order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Communities ({filteredCommunities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <CommunityGrid
                  communities={filteredCommunities}
                  onToggleVisited={handleToggleVisited}
                  selectedCommunity={selectedCommunity}
                  onCommunitySelect={setSelectedCommunity}
                />
              </CardContent>
            </Card>
          </div>

          {/* Map - Right Side */}
          <div className="order-1 lg:order-2">
            <Card className="lg:sticky lg:top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Community Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommunityMap
                  communities={filteredCommunities}
                  selectedCommunity={selectedCommunity}
                  onCommunitySelect={setSelectedCommunity}
                  className="h-96 lg:h-[500px]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
