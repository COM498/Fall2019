#use node image
FROM node:11

#set working directory
WORKDIR /usr/src/server

#copy package.json
COPY package*.json ./

#install node modules
RUN npm install

#copy code files
COPY . .

#expose port 80
EXPOSE 80

#start node server
CMD ["npm", "start"]