FROM node:18.16.0
ADD . /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install --omit dev
RUN npm run build
ENV TEST 'test'
EXPOSE 3000

CMD ["node_modules/.bin/serve", "-s", "build"]
