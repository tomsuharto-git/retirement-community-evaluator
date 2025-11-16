"use client"

import { MapPin, Globe, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Community } from "@/lib/types"

interface CommunityRatingsSummaryProps {
  community: Community
}

export function CommunityRatingsSummary({ community }: CommunityRatingsSummaryProps) {

  return (
    <Card>
      <CardContent className="p-6">
        {/* Community Description */}
        {community.description && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {community.description}
            </p>
          </div>
        )}

        {/* Additional Information */}
        <div className="space-y-3">
          {/* Resident Count */}
          {community.resident_count && (
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground mb-1">Current Residents</div>
                <div className="text-sm text-muted-foreground">{community.resident_count}</div>
              </div>
            </div>
          )}

          {/* Address */}
          {community.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground mb-1">Address</div>
                <div className="text-sm text-muted-foreground">{community.address}</div>
              </div>
            </div>
          )}

          {/* Distance from Blodgett's */}
          {(community.distance_miles || community.drive_time_minutes) && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground mb-1">Distance from Blodgett's</div>
                <div className="text-sm text-muted-foreground">
                  {community.distance_miles && `${community.distance_miles} miles`}
                  {community.distance_miles && community.drive_time_minutes && " • "}
                  {community.drive_time_minutes && `${community.drive_time_minutes} min drive`}
                </div>
              </div>
            </div>
          )}

          {/* Website */}
          {community.website && (
            <div className="flex items-start gap-2">
              <Globe className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground mb-1">Website</div>
                <a
                  href={community.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {community.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
