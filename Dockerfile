FROM node:18
ARG env

WORKDIR /opt/integration-hub

COPY dist/ .
COPY credential ./credential
COPY package.json .

RUN mkdir -p /opt/integration-hub/logs
RUN npm install pm2 -g
RUN npm install --omit=dev && rm package*.json

CMD ["pm2-runtime", "server.js"]

EXPOSE 8085
