FROM node:14.17.6

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y nano
RUN npm install --production
CMD npm run start
