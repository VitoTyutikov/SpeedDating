# Build stage
FROM node:18.18.2 as build-stage
WORKDIR /build_stage
COPY package.json ./

RUN npm install -g npm@10.2.4
RUN npm install --silent
COPY . .
RUN npm run build

# Production stage
FROM node:18.18.2 as production-stage
WORKDIR /app
RUN npm install -g serve
COPY --from=build-stage /build_stage/build ./build

CMD ["serve", "-s", "build", "-l", "3000"]
