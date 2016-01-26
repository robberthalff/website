FROM node:5.5-slim

ENV CONTENT_HOST localhost
ENV CONTENT_PORT 3000
ENV API_HOST localhost
ENV API_PORT 3030

EXPOSE 3030
EXPOSE 8080

WORKDIR /app
COPY . /app

RUN ["npm", "install", "phantomjs", "-g"]

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
