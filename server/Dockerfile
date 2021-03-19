FROM node:14-alpine
RUN apk add --no-cache bash
WORKDIR /server
COPY .  . 
RUN yarn install --production
CMD ["yarn", "start"]
