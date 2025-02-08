FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Create volume for logs
VOLUME [ "/usr/src/app/logs" ]

# Expose port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]