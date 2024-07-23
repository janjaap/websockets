FROM node:22-bullseye

WORKDIR /usr/app

COPY ./ ./

RUN npm i --no-package-lock --verbose

EXPOSE 4000

CMD ["node", "index.js"]
