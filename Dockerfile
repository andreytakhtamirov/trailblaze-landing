# Use the official Node.js 18 image as the base
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install dependencies in a separate layer for better caching
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (Cloud Run automatically assigns ports but requires the container to listen on $PORT)
ENV PORT=8080

# Start the Next.js servernod
CMD ["npm", "start"]
