# Build stage
FROM node:18.18.2 as build-stage
WORKDIR /build_stage
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18.18.2 as production-stage
WORKDIR /app
# Install serve package globally
RUN npm install -g serve
# Correctly copy the build directory from the build-stage to the production-stage
COPY --from=build-stage /build_stage/build ./build

CMD ["serve", "-s", "build", "-l", "3000"]
