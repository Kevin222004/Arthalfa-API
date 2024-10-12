# Use the official Node.js 18 image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy .env file into the image (optional, for local dev use)
# If you do not want to copy the .env file, you can provide environment variables separately
COPY .env .env

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
