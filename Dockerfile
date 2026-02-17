# Use the exact Playwright version image
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# Copy only dependency files first (better layer caching)
COPY package.json package-lock.json* ./

# Install dependencies (Playwright is already in base image, but your project deps are not)
RUN npm ci

# Copy project files
COPY . .

# Default command (can be overridden by docker-compose)
CMD ["npx", "playwright", "test"]
