FROM node:12-slim
ENV ENVIRONMENT="production"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD [ "npm", "start" ]