# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app for production
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 80

# Serve the app using a static server (e.g., serve package)
CMD ["npx", "serve", "build", "-l", "80"]
