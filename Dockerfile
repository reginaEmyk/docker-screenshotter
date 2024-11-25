# Use an official Node runtime as a parent image
FROM node:18-alpine

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
#TODO DON'T INSTALL UNREQUIRED PACKAGES
RUN apk update && apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    xvfb \
    wait4ports \
    xorg-server

RUN npm install -g pnpm

ENV HOST 0.0.0.0

# Set the working directory in the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json
COPY package.json ./

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install dependencies using Yarn
RUN pnpm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches, starting Xvfb in the background 
CMD Xvfb :99 -screen 0 1024x768x24 & export DISPLAY=:99 && pnpm start

