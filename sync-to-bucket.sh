#!/bin/bash

BUCKET_NAME="trailblaze-assets"
CDN_PATH="_next/static/"
IMAGE_PATH="public/images/"

gcloud info

# Upload static files
gsutil -m rsync -r -d .next/static gs://$BUCKET_NAME/$CDN_PATH

# Upload images
gsutil -m rsync -r -d $IMAGE_PATH gs://$BUCKET_NAME/images/
