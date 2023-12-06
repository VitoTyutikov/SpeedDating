# pull official base image
FROM node:18.18.2-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "run build"]