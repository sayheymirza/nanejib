# Use Node.js v22 Alpine as the base image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Start the application (adjust the command as needed)
CMD ["npm", "start"]
