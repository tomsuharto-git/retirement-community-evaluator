#!/usr/bin/env python3
"""
Quick script to fetch images for the 2 remaining communities
from their direct photo galleries
"""

import requests
import os
import time

IMAGES_DIR = 'public/community-images'
os.makedirs(IMAGES_DIR, exist_ok=True)

# Manual URLs to high-quality images
# These would need to be filled in after inspecting the websites
IMAGES_TO_DOWNLOAD = {
    'farmington-station': [
        # Add URLs here after finding them on seniorly or official site
    ],
    'avery-heights': [
        # Add URLs here after finding them on seniorly or official site
    ]
}

def download_image(url, filename):
    """Download an image"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10, stream=True)

        if response.status_code == 200:
            filepath = os.path.join(IMAGES_DIR, filename)
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"✅ Downloaded: {filename}")
            return True
        else:
            print(f"❌ Failed: {filename} (status {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ Error downloading {filename}: {e}")
        return False

def main():
    print("📸 Downloading missing community images...")
    print("="*60)

    for community, urls in IMAGES_TO_DOWNLOAD.items():
        if not urls:
            print(f"⚠️  No URLs configured for {community}")
            continue

        print(f"\n📍 {community.replace('-', ' ').title()}")
        for i, url in enumerate(urls):
            filename = f"{community}-{i+1}.jpg"
            download_image(url, filename)
            time.sleep(0.5)  # Be respectful

    print("\n" + "="*60)
    print("✅ Done!")

if __name__ == '__main__':
    main()
