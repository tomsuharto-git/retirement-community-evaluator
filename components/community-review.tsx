"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Save, Edit2, X } from "lucide-react"
import type { Community } from "@/lib/types"
import { ApiClient } from "@/lib/api-client"

interface CommunityReviewProps {
  community: Community
  onUpdate: (updated: Community) => void
}

export function CommunityReview({ community, onUpdate }: CommunityReviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editedReview, setEditedReview] = useState({
    review_first_year_rating: community.review_first_year_rating || 0,
    review_affordability_rating: community.review_affordability_rating || 0,
    review_care_rating: community.review_care_rating || 0,
    review_housing_rating: community.review_housing_rating || 0,
    review_community_rating: community.review_community_rating || 0,
    review_overall_rating: community.review_overall_rating || 0,
    review_pros: community.review_pros || "",
    review_cons: community.review_cons || "",
    review_notes: community.review_notes || "",
  })

  const hasAnyReview =
    community.review_first_year_rating ||
    community.review_affordability_rating ||
    community.review_care_rating ||
    community.review_housing_rating ||
    community.review_community_rating ||
    community.review_overall_rating ||
    community.review_pros ||
    community.review_cons ||
    community.review_notes

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const updated = await ApiClient.updateCommunity(community.id, editedReview)
      onUpdate(updated)
      setIsEditing(false)
    } catch (err) {
      console.error("Error saving review:", err)
      alert("Failed to save review. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedReview({
      review_first_year_rating: community.review_first_year_rating || 0,
      review_affordability_rating: community.review_affordability_rating || 0,
      review_care_rating: community.review_care_rating || 0,
      review_housing_rating: community.review_housing_rating || 0,
      review_community_rating: community.review_community_rating || 0,
      review_overall_rating: community.review_overall_rating || 0,
      review_pros: community.review_pros || "",
      review_cons: community.review_cons || "",
      review_notes: community.review_notes || "",
    })
    setIsEditing(false)
  }

  const renderStars = (rating: number, editable: boolean = false, onChange?: (rating: number) => void) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => editable && onChange && onChange(i)}
          disabled={!editable}
          className={`transition-colors ${editable ? "cursor-pointer hover:scale-110" : ""}`}
        >
          <Star
            className={`h-5 w-5 ${
              i <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      )
    }
    return <div className="flex gap-1">{stars}</div>
  }

  const RatingRow = ({
    label,
    value,
    field
  }: {
    label: string
    value: number
    field: keyof typeof editedReview
  }) => (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-3">
        {renderStars(
          isEditing ? editedReview[field] as number : value,
          isEditing,
          (rating) => setEditedReview({ ...editedReview, [field]: rating })
        )}
        <span className="text-sm text-muted-foreground w-8 text-right">
          {isEditing ? editedReview[field] : value || "—"}/5
        </span>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Review</CardTitle>
          {!isEditing ? (
            <Button
              variant={hasAnyReview ? "outline" : "default"}
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {hasAnyReview ? "Edit Review" : "Add Review"}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Review"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!hasAnyReview && !isEditing ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2">No review yet</p>
            <p className="text-sm">Click "Add Review" to share your thoughts about this community</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Ratings Section */}
            <div className="space-y-1">
              <h3 className="font-semibold mb-3">Ratings</h3>
              <RatingRow
                label="Overall Rating"
                value={community.review_overall_rating || 0}
                field="review_overall_rating"
              />
              <RatingRow
                label="First Year Experience"
                value={community.review_first_year_rating || 0}
                field="review_first_year_rating"
              />
              <RatingRow
                label="Affordability"
                value={community.review_affordability_rating || 0}
                field="review_affordability_rating"
              />
              <RatingRow
                label="Care Quality"
                value={community.review_care_rating || 0}
                field="review_care_rating"
              />
              <RatingRow
                label="Housing Quality"
                value={community.review_housing_rating || 0}
                field="review_housing_rating"
              />
              <RatingRow
                label="Community & Amenities"
                value={community.review_community_rating || 0}
                field="review_community_rating"
              />
            </div>

            {/* Pros Section */}
            <div>
              <Label htmlFor="pros" className="font-semibold mb-2 block">
                Pros
              </Label>
              {isEditing ? (
                <Textarea
                  id="pros"
                  value={editedReview.review_pros}
                  onChange={(e) => setEditedReview({ ...editedReview, review_pros: e.target.value })}
                  placeholder="What are the positive aspects of this community?"
                  rows={3}
                  className="resize-none"
                />
              ) : community.review_pros ? (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{community.review_pros}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No pros listed yet</p>
              )}
            </div>

            {/* Cons Section */}
            <div>
              <Label htmlFor="cons" className="font-semibold mb-2 block">
                Cons
              </Label>
              {isEditing ? (
                <Textarea
                  id="cons"
                  value={editedReview.review_cons}
                  onChange={(e) => setEditedReview({ ...editedReview, review_cons: e.target.value })}
                  placeholder="What are the drawbacks or concerns about this community?"
                  rows={3}
                  className="resize-none"
                />
              ) : community.review_cons ? (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{community.review_cons}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No cons listed yet</p>
              )}
            </div>

            {/* Notes Section */}
            <div>
              <Label htmlFor="notes" className="font-semibold mb-2 block">
                Additional Notes
              </Label>
              {isEditing ? (
                <Textarea
                  id="notes"
                  value={editedReview.review_notes}
                  onChange={(e) => setEditedReview({ ...editedReview, review_notes: e.target.value })}
                  placeholder="Any other thoughts or observations about this community?"
                  rows={4}
                  className="resize-none"
                />
              ) : community.review_notes ? (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{community.review_notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">No additional notes yet</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
