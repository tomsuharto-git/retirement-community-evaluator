"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, Phone } from "lucide-react"
import type { Community } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CommunityCardProps {
  community: Community
  onToggleVisited: (id: string) => void
}

export function CommunityCard({ community, onToggleVisited }: CommunityCardProps) {
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
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", isCompareSelected && "ring-2 ring-blue-500")}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">{community.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {community.location}
            </div>
            {community.community_type && (
              <Badge variant="secondary" className="mb-2">
                {community.community_type}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleCompare(community.id)}
            className={cn("ml-2", isCompareSelected && "bg-blue-50 border-blue-500 text-blue-700")}
          >
            {isCompareSelected ? "Remove" : "Compare"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          {community.distance_miles && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {community.distance_miles} miles
            </div>
          )}
          {community.drive_time_minutes && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {community.drive_time_minutes} min
            </div>
          )}
          {community.resident_count && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {community.resident_count} residents
            </div>
          )}
          {community.phone && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-1" />
              {community.phone}
            </div>
          )}
        </div>

        {community.star_rating && (
          <div className="flex items-center mb-3">
            <div className="flex mr-2">{renderStars(community.star_rating)}</div>
            <span className="text-sm text-muted-foreground">{community.star_rating}</span>
          </div>
        )}

        <div className="text-sm font-medium text-foreground mb-3">
          {formatCost(community.monthly_cost_min, community.monthly_cost_max)}
        </div>

        {community.amenities && community.amenities.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {community.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {community.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{community.amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant={community.visited ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleVisited(community.id)}
            className="flex-1"
          >
            {community.visited ? "Visited" : "Mark as Visited"}
          </Button>
          <Link href={`/community/${community.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
