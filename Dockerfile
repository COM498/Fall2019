#use nginx image
FROM nginx:alpine

#copy configuration file
COPY nginx.conf /etc/nginx/nginx.conf
