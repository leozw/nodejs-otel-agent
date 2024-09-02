FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install OpenTelemetry Agent for NodeJS by Leonardo Zwirtes
RUN npm install otel-agent-nodejs --save

COPY . .

RUN npm run build

# Set NODE_OPTIONS to load OpenTelemetry before application
ENV NODE_OPTIONS="--require otel-agent-nodejs"

EXPOSE 3000

CMD ["node", "dist/server.js"]
