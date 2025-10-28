"use client"

import { useEffect, useRef, useState } from "react"
import type { Community } from "@/lib/types"

interface CommunityMapProps {
  communities: Community[]
  selectedCommunity?: string
  onCommunitySelect: (communityId: string) => void
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function CommunityMap({ communities, selectedCommunity, onCommunitySelect, className = "" }: CommunityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load Google Maps script
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      console.error("Failed to load Google Maps script")
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || map || !isLoaded || !window.google) return

    // Center map on Hartford, CT area
    const hartfordCenter = { lat: 41.7658, lng: -72.7201 }

    const newMap = new window.google.maps.Map(mapRef.current, {
      zoom: 11,
      center: hartfordCenter,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    setMap(newMap)
  }, [map, isLoaded])

  // Update markers when communities change
  useEffect(() => {
    if (!map || !communities.length || !window.google) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create new markers
    const newMarkers = communities.map((community) => {
      const marker = new window.google.maps.Marker({
        position: { lat: community.latitude, lng: community.longitude },
        map: map,
        title: community.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: community.visited ? "#10b981" : "#3b82f6",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      })

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm mb-1">${community.name}</h3>
            <p class="text-xs text-gray-600 mb-1">${community.location}</p>
            ${
              community.star_rating
                ? `
              <div class="flex items-center mb-1">
                <span class="text-xs text-yellow-600">★ ${community.star_rating}</span>
              </div>
            `
                : ""
            }
            ${
              community.distance_miles
                ? `
              <p class="text-xs text-gray-500">${community.distance_miles} miles away</p>
            `
                : ""
            }
          </div>
        `,
      })

      marker.addListener("click", () => {
        // Close all other info windows
        markers.forEach((m) => m.infoWindow?.close())

        // Open this info window
        infoWindow.open(map, marker)

        // Select community
        onCommunitySelect(community.id)
      })

      // Store info window reference
      marker.infoWindow = infoWindow

      return marker
    })

    setMarkers(newMarkers)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      communities.forEach((community) => {
        bounds.extend({ lat: community.latitude, lng: community.longitude })
      })
      map.fitBounds(bounds)

      // Ensure minimum zoom level
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > 13) map.setZoom(13)
        window.google.maps.event.removeListener(listener)
      })
    }
  }, [map, communities, onCommunitySelect])

  // Highlight selected community
  useEffect(() => {
    if (!selectedCommunity || !markers.length || !window.google) return

    markers.forEach((marker, index) => {
      const community = communities[index]
      const isSelected = community.id === selectedCommunity

      marker.setIcon({
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 12 : 8,
        fillColor: community.visited ? "#10b981" : "#3b82f6",
        fillOpacity: 1,
        strokeColor: isSelected ? "#fbbf24" : "#ffffff",
        strokeWeight: isSelected ? 3 : 2,
      })

      // Open info window for selected community
      if (isSelected) {
        marker.infoWindow?.open(map, marker)
      }
    })
  }, [selectedCommunity, markers, communities, map])

  if (!isLoaded) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
            <div className="text-muted-foreground text-sm">Loading map...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-muted-foreground mb-2">Map unavailable</div>
            <div className="text-sm text-muted-foreground">Google Maps API key required</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  )
}
