FROM node:14.17

WORKDIR /home/app

COPY package*.json ./

# RUN curl -qL https://www.npmjs.com/install.sh | sh
RUN npm install -g nodemon node-gyp mkdirp core-js
RUN npm install --unsafe-perm -g sharp
RUN npm install

COPY . .

# USER node

# COPY --chown=node:node . .
RUN chown -R $USER:$(id -gn $USER) /root/

# EXPOSE 8100

CMD ["npm", "run", "dev"]
