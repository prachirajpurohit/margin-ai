# base image
FROM node:20-alpine

# set working directory
WORKDIR /app

# copy package files first (better caching)
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of the app
COPY . .

# build next.js
RUN npm run build

# expose port
EXPOSE 3000

# start
CMD ["npm", "start"]
