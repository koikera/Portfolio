FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY ./Portfolio .

RUN npm install -g @angular/cli@19

CMD ["ng", "serve", "--host", "0.0.0.0"]
