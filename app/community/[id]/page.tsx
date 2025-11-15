"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Phone, Globe, DollarSign, Users, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { ApiClient } from "@/lib/api-client"
import type { Community } from "@/lib/types"
import { LoadingSpinner } from "@/components/loading-spinner"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CommunityDetailPageProps {
  params: {
    id: string
  }
}

export default function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const router = useRouter()
  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [communityImages, setCommunityImages] = useState<string[]>([])

  useEffect(() => {
    loadCommunity()
  }, [params.id])

  useEffect(() => {
    if (community) {
      // Generate image paths based on community name
      const slug = community.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

      // Check if images exist for this community (we have images for some communities)
      // This will be populated from the database in the future
      const imageCount = getImageCount(slug)
      const images = Array.from({ length: imageCount }, (_, i) =>
        `/community-images/${slug}-${i + 1}.jpg`
      )
      setCommunityImages(images)
    }
  }, [community])

  const getImageCount = (slug: string): number => {
    // Based on the images we have
    const imageCounts: Record<string, number> = {
      "avery-heights": 6,
      "aviva-west-hartford": 12,
      "farmington-station": 8,
    }
    return imageCounts[slug] || 0
  }

  const loadCommunity = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ApiClient.getCommunity(params.id)
      setCommunity(data)
    } catch (err) {
      setError("Failed to load community details")
      console.error("Error loading community:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleVisited = async () => {
    if (!community) return
    try {
      const updated = await ApiClient.toggleVisited(community.id, !community.visited)
      setCommunity(updated)
    } catch (err) {
      console.error("Error toggling visited status:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <div className="text-muted-foreground">Loading community details...</div>
        </div>
      </div>
    )
  }

  if (error || !community) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error || "Community not found"}</p>
            <Button onClick={() => router.push("/")} className="w-full">
              Back to Communities
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatCost = (min?: number, max?: number) => {
    if (!min && !max) return "Contact for pricing"
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}/mo`
    if (min) return `From $${min.toLocaleString()}/mo`
    return `Up to $${max?.toLocaleString()}/mo`
  }

  const renderStars = (rating?: number) => {
    if (!rating) return null
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{community.name}</h1>
              {community.address ? (
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {community.address}
                </div>
              ) : (
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {community.location}
                </div>
              )}
            </div>
            <Button
              variant={community.visited ? "default" : "outline"}
              onClick={handleToggleVisited}
              className="flex items-center gap-2"
            >
              <Heart className={community.visited ? "fill-current" : ""} />
              {community.visited ? "Visited" : "Mark as Visited"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Photo Gallery */}
        {communityImages.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {communityImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={image}
                          alt={`${community.name} - Photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
              <div className="text-center text-sm text-muted-foreground mt-2">
                {communityImages.length} {communityImages.length === 1 ? "photo" : "photos"}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {community.community_type && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Type</div>
                  <Badge variant="secondary" className="text-base">
                    {community.community_type}
                  </Badge>
                </div>
              )}

              {(community.distance_miles || community.drive_time_minutes) && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Distance</div>
                  <div className="text-base">
                    {community.distance_miles && `${community.distance_miles} miles`}
                    {community.distance_miles && community.drive_time_minutes && " • "}
                    {community.drive_time_minutes && `${community.drive_time_minutes} min drive`}
                  </div>
                </div>
              )}

              {community.resident_count && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Residents</div>
                  <div className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4" />
                    {community.resident_count} residents
                  </div>
                </div>
              )}

              {community.phone && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Phone</div>
                  <a href={`tel:${community.phone}`} className="flex items-center gap-2 text-base hover:underline">
                    <Phone className="h-4 w-4" />
                    {community.phone}
                  </a>
                </div>
              )}

              {community.website && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Website</div>
                  <a
                    href={community.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-base hover:underline text-blue-600"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            {community.description && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-muted-foreground">{community.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financials Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financials
            </CardTitle>
          </CardHeader>
          <CardContent>
            {community.financials_summary && (
              <p className="text-muted-foreground mb-4">{community.financials_summary}</p>
            )}

            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Monthly Cost</div>
                <div className="text-lg font-semibold">{formatCost(community.monthly_cost_min, community.monthly_cost_max)}</div>
              </div>

              {(community.entrance_fee_min || community.entrance_fee_max) && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Entrance Fee</div>
                  <div className="text-lg font-semibold">{formatCost(community.entrance_fee_min, community.entrance_fee_max)}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Care Levels Section */}
        {community.care_levels && community.care_levels.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Care Levels Available</CardTitle>
            </CardHeader>
            <CardContent>
              {community.care_summary && (
                <p className="text-muted-foreground mb-4">{community.care_summary}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {community.care_levels.map((level, index) => (
                  <Badge key={index} variant="default" className="text-sm">
                    {level}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Housing Options Section */}
        {community.housing_options && community.housing_options.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Housing Options</CardTitle>
            </CardHeader>
            <CardContent>
              {community.housing_summary && (
                <p className="text-muted-foreground mb-4">{community.housing_summary}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {community.housing_options.map((option, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {option}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Community Amenities Section */}
        {community.amenities && community.amenities.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Community Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              {community.community_summary && (
                <p className="text-muted-foreground mb-4">{community.community_summary}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {(showAllAmenities ? community.amenities : community.amenities.slice(0, 8)).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {amenity}
                  </Badge>
                ))}
              </div>
              {community.amenities.length > 8 && (
                <Button variant="outline" onClick={() => setShowAllAmenities(!showAllAmenities)}>
                  {showAllAmenities ? "Show Less" : `Show All ${community.amenities.length} Amenities`}
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
