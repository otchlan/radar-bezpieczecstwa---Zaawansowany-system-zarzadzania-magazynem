FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

EXPOSE 3000

# For development mode (watches for changes)
CMD ["bun", "run", "dev"]