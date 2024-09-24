# Use Node.js 20 official image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the application port
EXPOSE 3000

# Use node --watch for live-reloading during development
CMD ["npx", "tsx", "--watch", "src/app.ts"]
