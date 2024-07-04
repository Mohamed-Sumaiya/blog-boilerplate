# Base image
FROM node:alpine

# Added this to solve the creat-react-app bugs.
ENV CI=true
ENV WDS_SOCKET_PORT=0

# Working directory.
WORKDIR /app

# Get list of all dependencies.
COPY package.json ./

# Install all dependencies.
RUN npm install

# Copy the rest of the code. 
COPY ./ ./

# Run the service.
CMD ["npm", "start"]
