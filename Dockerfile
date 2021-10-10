# App builder - final container
# Rebuilding the pm2 image for ARM architecture
# FROM arm64v8/node:current
FROM node:current
ENV NPM_CONFIG_LOGLEVEL warn

# Install pm2
RUN npm install pm2@3 -g

WORKDIR /usr/darkest-afk-discord-bot

COPY pm2-ecosystem.json ./

# Node dependencies / install
COPY package*.json ./
RUN npm install

# Code transfer
COPY src ./src

CMD [ "pm2-runtime", "start", "pm2-ecosystem.json" ]