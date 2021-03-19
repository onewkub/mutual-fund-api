FROM node:14-alpine
WORKDIR /server
RUN apk add --no-cache bash
# RUN wget -qO- https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for | sh -s -- google.com:80 -- echo success
COPY .  . 
RUN yarn install --production
CMD ["yarn", "start"]
