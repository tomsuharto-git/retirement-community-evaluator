"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Globe, DollarSign, Users, Star, Heart, ChevronLeft, ChevronRight, Home, UsersRound, Edit2, Plus, X, Save } from "lucide-react"
import Link from "next/link"
import { ApiClient } from "@/lib/api-client"
import type { Community } from "@/lib/types"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CommunityReviewV2 } from "@/components/community-review-v2"
import { CommunityRatingsSummary } from "@/components/community-ratings-summary"
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

  // Edit states for each section
  const [editingFinancials, setEditingFinancials] = useState(false)
  const [editingCare, setEditingCare] = useState(false)
  const [editingHousing, setEditingHousing] = useState(false)
  const [editingCommunity, setEditingCommunity] = useState(false)

  // Edited values
  const [editedFinancials, setEditedFinancials] = useState({
    monthly_cost_min: 0,
    monthly_cost_max: 0,
    entrance_fee_min: 0,
    entrance_fee_max: 0,
  })
  const [editedCarelevels, setEditedCareLevels] = useState<string[]>([])
  const [editedHousingOptions, setEditedHousingOptions] = useState<string[]>([])
  const [editedAmenities, setEditedAmenities] = useState<string[]>([])
  const [newCareLevel, setNewCareLevel] = useState("")
  const [newHousingOption, setNewHousingOption] = useState("")
  const [newAmenity, setNewAmenity] = useState("")

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

      // Initialize edited values
      setEditedFinancials({
        monthly_cost_min: community.monthly_cost_min || 0,
        monthly_cost_max: community.monthly_cost_max || 0,
        entrance_fee_min: community.entrance_fee_min || 0,
        entrance_fee_max: community.entrance_fee_max || 0,
      })
      setEditedCareLevels(community.care_levels || [])
      setEditedHousingOptions(community.housing_options || [])
      setEditedAmenities(community.amenities || [])
    }
  }, [community])

  const getImageCount = (slug: string): number => {
    // Based on the images we have
    const imageCounts: Record<string, number> = {
      "avery-heights": 6,
      "aviva-west-hartford": 12,
      "brookdale-chatfield": 3,
      "duncaster": 3,
      "farmington-station": 8,
      "middlewoods-of-farmington": 3,
      "seabury": 3,
      "the-hearth-at-glastonbury": 3,
      "the-reservoir": 3,
      "touchpoints-at-farmington": 3,
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

  const handleSaveFinancials = async () => {
    if (!community) return
    try {
      const updated = await ApiClient.updateCommunity(community.id, editedFinancials)
      setCommunity(updated)
      setEditingFinancials(false)
    } catch (err) {
      console.error("Error saving financials:", err)
    }
  }

  const handleSaveCare = async () => {
    if (!community) return
    try {
      const updated = await ApiClient.updateCommunity(community.id, { care_levels: editedCarelevels })
      setCommunity(updated)
      setEditingCare(false)
    } catch (err) {
      console.error("Error saving care levels:", err)
    }
  }

  const handleSaveHousing = async () => {
    if (!community) return
    try {
      const updated = await ApiClient.updateCommunity(community.id, { housing_options: editedHousingOptions })
      setCommunity(updated)
      setEditingHousing(false)
    } catch (err) {
      console.error("Error saving housing options:", err)
    }
  }

  const handleSaveCommunity = async () => {
    if (!community) return
    try {
      const updated = await ApiClient.updateCommunity(community.id, { amenities: editedAmenities })
      setCommunity(updated)
      setEditingCommunity(false)
    } catch (err) {
      console.error("Error saving amenities:", err)
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
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Suharto Retirement Community Evaluator</h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Community Info */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-foreground mb-2">{community.name}</h2>
          {community.address ? (
            <div className="flex items-center text-muted-foreground text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              {community.address}
            </div>
          ) : (
            <div className="flex items-center text-muted-foreground text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              {community.location}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Label htmlFor={`visited-${community.id}`} className="text-sm text-muted-foreground cursor-pointer">
              {community.visited ? "Visited" : "Not Visited"}
            </Label>
            <Switch
              id={`visited-${community.id}`}
              checked={community.visited}
              onCheckedChange={(checked) => {
                handleToggleVisited()
              }}
            />
          </div>
        </div>
      </div>

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

        {/* Ratings Summary */}
        <div className="mb-6">
          <CommunityRatingsSummary community={community} />
        </div>

        {/* Financials Section */}
        <Card className="mb-6 border-l-4 border-l-[#22C55E]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#22C55E]" />
                Financials
              </CardTitle>
              {!editingFinancials ? (
                <Button variant="ghost" size="sm" onClick={() => setEditingFinancials(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleSaveFinancials}>
                  <Save className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {community.financials_summary && (
              <p className="text-muted-foreground mb-4">{community.financials_summary}</p>
            )}

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Monthly Cost</div>
                {editingFinancials ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={editedFinancials.monthly_cost_min || ""}
                      onChange={(e) => setEditedFinancials({ ...editedFinancials, monthly_cost_min: parseInt(e.target.value) || 0 })}
                      className="w-32"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={editedFinancials.monthly_cost_max || ""}
                      onChange={(e) => setEditedFinancials({ ...editedFinancials, monthly_cost_max: parseInt(e.target.value) || 0 })}
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="text-lg font-semibold">{formatCost(community.monthly_cost_min, community.monthly_cost_max)}</div>
                )}
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Entrance Fee</div>
                {editingFinancials ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={editedFinancials.entrance_fee_min || ""}
                      onChange={(e) => setEditedFinancials({ ...editedFinancials, entrance_fee_min: parseInt(e.target.value) || 0 })}
                      className="w-32"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={editedFinancials.entrance_fee_max || ""}
                      onChange={(e) => setEditedFinancials({ ...editedFinancials, entrance_fee_max: parseInt(e.target.value) || 0 })}
                      className="w-32"
                    />
                  </div>
                ) : (
                  <div className="text-lg font-semibold">{formatCost(community.entrance_fee_min, community.entrance_fee_max)}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Care Levels Section */}
        {(community.care_levels && community.care_levels.length > 0) || editingCare ? (
          <Card className="mb-6 border-l-4 border-l-[#A855F7]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#A855F7]" />
                  Care
                </CardTitle>
                {!editingCare ? (
                  <Button variant="ghost" size="sm" onClick={() => setEditingCare(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSaveCare}>
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {community.care_summary && (
                <p className="text-muted-foreground mb-4">{community.care_summary}</p>
              )}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Care Levels Available</h3>
                {editingCare ? (
                  <div className="space-y-2">
                    {editedCarelevels.map((level, index) => (
                      <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
                        <Badge className="text-sm bg-[#A855F7]">{level}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditedCareLevels(editedCarelevels.filter((_, i) => i !== index))}
                          className="h-6 w-6 p-0 ml-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add care level..."
                        value={newCareLevel}
                        onChange={(e) => setNewCareLevel(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newCareLevel.trim()) {
                            e.preventDefault()
                            setEditedCareLevels([...editedCarelevels, newCareLevel.trim()])
                            setNewCareLevel("")
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          if (newCareLevel.trim()) {
                            setEditedCareLevels([...editedCarelevels, newCareLevel.trim()])
                            setNewCareLevel("")
                          }
                        }}
                        size="sm"
                        variant="outline"
                        className="px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {community.care_levels?.map((level, index) => (
                      <Badge key={index} className="text-sm bg-[#A855F7] hover:bg-[#9333EA]">
                        {level}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Housing Options Section */}
        {(community.housing_options && community.housing_options.length > 0) || editingHousing ? (
          <Card className="mb-6 border-l-4 border-l-[#EF4444]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-[#EF4444]" />
                  Housing
                </CardTitle>
                {!editingHousing ? (
                  <Button variant="ghost" size="sm" onClick={() => setEditingHousing(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSaveHousing}>
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {community.housing_summary && (
                <p className="text-muted-foreground mb-4">{community.housing_summary}</p>
              )}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Available Housing Options</h3>
                {editingHousing ? (
                  <div className="space-y-2">
                    {editedHousingOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
                        <Badge className="text-sm bg-[#EF4444]">{option}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditedHousingOptions(editedHousingOptions.filter((_, i) => i !== index))}
                          className="h-6 w-6 p-0 ml-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add housing option..."
                        value={newHousingOption}
                        onChange={(e) => setNewHousingOption(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newHousingOption.trim()) {
                            e.preventDefault()
                            setEditedHousingOptions([...editedHousingOptions, newHousingOption.trim()])
                            setNewHousingOption("")
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          if (newHousingOption.trim()) {
                            setEditedHousingOptions([...editedHousingOptions, newHousingOption.trim()])
                            setNewHousingOption("")
                          }
                        }}
                        size="sm"
                        variant="outline"
                        className="px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {community.housing_options?.map((option, index) => (
                      <Badge key={index} className="text-sm bg-[#EF4444] hover:bg-[#DC2626]">
                        {option}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Community Amenities Section */}
        {(community.amenities && community.amenities.length > 0) || editingCommunity ? (
          <Card className="mb-6 border-l-4 border-l-[#FB923C]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UsersRound className="h-5 w-5 text-[#FB923C]" />
                  Community
                </CardTitle>
                {!editingCommunity ? (
                  <Button variant="ghost" size="sm" onClick={() => setEditingCommunity(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSaveCommunity}>
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {community.community_summary && (
                <p className="text-muted-foreground mb-4">{community.community_summary}</p>
              )}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Community Amenities</h3>
                {editingCommunity ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editedAmenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                          <span className="text-sm">{amenity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditedAmenities(editedAmenities.filter((_, i) => i !== index))}
                            className="h-4 w-4 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add amenity..."
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newAmenity.trim()) {
                            e.preventDefault()
                            setEditedAmenities([...editedAmenities, newAmenity.trim()])
                            setNewAmenity("")
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          if (newAmenity.trim()) {
                            setEditedAmenities([...editedAmenities, newAmenity.trim()])
                            setNewAmenity("")
                          }
                        }}
                        size="sm"
                        variant="outline"
                        className="px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(showAllAmenities ? community.amenities : community.amenities?.slice(0, 8) || []).map((amenity, index) => (
                        <Badge key={index} className="text-sm bg-[#FB923C] hover:bg-[#F97316]">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    {community.amenities && community.amenities.length > 8 && (
                      <Button variant="outline" onClick={() => setShowAllAmenities(!showAllAmenities)}>
                        {showAllAmenities ? "Show Less" : `Show All ${community.amenities.length} Amenities`}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Review Section */}
        <CommunityReviewV2 community={community} onUpdate={setCommunity} />
      </main>
    </div>
  )
}
