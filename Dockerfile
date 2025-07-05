FROM node:20-slim

# Install Google Cloud SDK
RUN apt-get update && apt-get install -y curl gnupg && \
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && apt-get install -y google-cloud-sdk

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

# Use the secret in a RUN step
RUN --mount=type=secret,id=gcp-key \
    gcloud auth activate-service-account --key-file=/run/secrets/gcp-key && \
    npm run build && \
    ./sync-to-bucket.sh

ENV PORT=8080

CMD ["npm", "start"]
