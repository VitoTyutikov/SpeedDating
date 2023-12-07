# # pull official base image
# FROM node:18.18.2-alpine

# # set working directory
# WORKDIR /app

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent

# # add app
# COPY . ./

# # start app
# CMD ["npm", "run build"]

# Build stage
# Build stage
FROM node:18.18.2 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

# Production stage
FROM node:18.18.2 as production-stage
WORKDIR /app
# Install serve package globally
RUN npm install -g serve
# Copy the build directory from the build-stage to the production-stage
COPY --from=build-stage /app/build /app
# Expose the port that serve will run on
# EXPOSE 3000
# Start the serve command
CMD ["serve", "-s", "build", "-l", "3000"]


