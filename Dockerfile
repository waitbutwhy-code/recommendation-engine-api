# Get base image for Node
FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source 
COPY . /usr/src/app
RUN npm install

# Expose port (make sure to be the same port that express is listening too
EXPOSE 3001
CMD ["npm", "start"]
