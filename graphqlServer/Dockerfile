FROM node:8.10
ADD . /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install

EXPOSE 8083

CMD npm run start
