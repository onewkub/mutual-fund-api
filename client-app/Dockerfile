FROM node:14-alpine
WORKDIR /client-app
COPY . .
RUN yarn install --production
CMD ["yarn", "start"]