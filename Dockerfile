# Use the official Node.js 18 image as the base
FROM node:20-slim

# Install Google Cloud SDK for gsutil
RUN apt-get update && apt-get install -y curl gnupg && \
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && apt-get install -y google-cloud-sdk

# Set working directory
WORKDIR /app

# Install dependencies in a separate layer for better caching
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose port (Cloud Run automatically assigns ports but requires the container to listen on $PORT)
ENV PORT=8080

CMD gcloud auth activate-service-account --key-file=/secrets/gcp-key.json && npm run deploy && npm start
