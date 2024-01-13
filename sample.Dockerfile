FROM node:latest

WORKDIR /home/app

COPY package*.json ./

RUN curl -qL https://www.npmjs.com/install.sh | sh
RUN npm install -g npm@latest nodemon node-gyp sharp mkdirp core-js
RUN npm install
RUN npm fund

COPY . .

# USER node

# COPY --chown=node:node . .

EXPOSE 8281

CMD ["npm", "run", "dev"]