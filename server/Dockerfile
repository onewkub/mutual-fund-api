FROM node:14-alpine
WORKDIR /server
# RUN apk add --no-cache bash
COPY .  . 
RUN yarn install --production
CMD ["yarn", "start"]
