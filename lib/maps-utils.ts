export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Math.round(distance * 10) / 10 // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function estimateDriveTime(distanceMiles: number): number {
  // Rough estimate: 30 mph average in suburban/city areas
  const avgSpeed = 30
  const timeHours = distanceMiles / avgSpeed
  const timeMinutes = Math.round(timeHours * 60)

  return Math.max(timeMinutes, 5) // Minimum 5 minutes
}

export function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!window.google?.maps) {
      resolve(null)
      return
    }

    const geocoder = new window.google.maps.Geocoder()

    geocoder.geocode({ address }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location
        resolve({
          lat: location.lat(),
          lng: location.lng(),
        })
      } else {
        resolve(null)
      }
    })
  })
}
