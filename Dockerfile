FROM node:16.3.0-alpine

WORKDIR /app

COPY ./ ./

RUN apk add --no-cache python3 g++ make
RUN apk add --update alpine-sdk tzdata && \
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    apk del tzdata

EXPOSE 3001

CMD [ "npm", "run", "start" ]