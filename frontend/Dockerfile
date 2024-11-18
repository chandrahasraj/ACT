# Stage 1: Build the React application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:latest

# Copy the build output from the previous stage to Nginx's web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the container (Nginx default)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
