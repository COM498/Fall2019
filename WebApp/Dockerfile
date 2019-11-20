#use node image
FROM node:11

#set the working directory
WORKDIR /usr/src/app

#copy the package.json files
COPY package*.json ./

#install node modules
RUN npm install

#copy code files
COPY . .

#expose port 80
EXPOSE 80

#start the node server
CMD ["npm", "start"]
