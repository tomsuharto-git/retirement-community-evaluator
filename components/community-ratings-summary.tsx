"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Community } from "@/lib/types"

interface CommunityRatingsSummaryProps {
  community: Community
}

export function CommunityRatingsSummary({ community }: CommunityRatingsSummaryProps) {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="h-6 w-6 fill-yellow-400 text-yellow-400"
        />
      )
    }

    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <Star
          key="half"
          className="h-6 w-6 fill-yellow-400/50 text-yellow-400"
        />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="h-6 w-6 text-gray-300"
        />
      )
    }

    return stars
  }

  // Calculate average review rating if available
  const reviewRating = community.review_overall_rating || 0
  const seniorlyRating = 9.5 // This would come from external API or database

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reviews Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Reviews</h3>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {renderStars(reviewRating)}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">
                  {reviewRating > 0 ? reviewRating.toFixed(1) : "—"}
                </span>
                <span className="text-sm text-muted-foreground">/5</span>
              </div>
            </div>
            {community.review_overall_rating && (
              <p className="text-sm text-muted-foreground">
                Based on your personal review
              </p>
            )}
            {!community.review_overall_rating && (
              <p className="text-sm text-muted-foreground italic">
                No reviews yet
              </p>
            )}
          </div>

          {/* Seniorly Rating Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Seniorly Rating</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-foreground">
                {seniorlyRating}
              </span>
              <span className="text-2xl text-muted-foreground">/10</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on community ratings
            </p>
          </div>
        </div>

        {/* Community Description */}
        {community.description && (
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {community.description}
            </p>
          </div>
        )}

        {/* Resident Information */}
        {community.resident_count && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Current Residents
              </span>
              <span className="text-lg font-semibold text-foreground">
                {community.resident_count}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
