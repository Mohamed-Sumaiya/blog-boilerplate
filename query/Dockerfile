# Base image
FROM node:alpine

# Working directory.
WORKDIR /app

# Get list of all dependencies.
COPY package.json .

# Install all dependencies.
RUN npm install

# Copy the rest of the code. 
COPY ./ ./

# Run the service.
CMD ["npm", "start"]
