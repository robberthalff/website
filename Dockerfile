FROM node

ENV CONTENT_HOST api.robberthalff.com
ENV CONTENT_PORT 80
ENV API_HOST 0.0.0.0
ENV API_PORT 3030

EXPOSE 3030
EXPOSE 8080

WORKDIR /app
COPY . /app

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
