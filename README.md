# Node.js OpenTelemetry Agent (Usage example)

Welcome to the **Node.js OpenTelemetry Agent** project! 🎉 This is a fun and educational Node.js application fully instrumented with [OpenTelemetry](https://opentelemetry.io/) to capture traces and metrics. Whether you're looking to learn about observability or just want a solid foundation for your own projects, you've come to the right place!

## Table of Contents

- [Getting Started](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Prerequisites](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Installation](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Running the Application](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Using Docker](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Project Structure](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [How It Works: Simplifying Instrumentation](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Required Environment Variables](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Available Routes](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Features](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [Contributing](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)
- [License](https://www.notion.so/849eb34a798d4cf1b6a227f414acc664?pvs=21)

## Getting Started

To get started with this project, you’ll need to have Node.js and Docker installed on your machine. Don’t worry—I’ll guide you through everything!

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 20 or higher).
- **Docker**: Docker is required for containerization.

## Installation

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/leozw/nodejs-otel-agent.git # or ssh git@github.com:leozw/nodejs-otel-agent.git
cd nodejs-otel-agent
yarn install && yarn build
```

## Running the Application

To run the application locally, use the following command:

```bash
yarn start
```

For development mode, use:

```bash
yarn dev
```

This will start the application, and you’ll see traces and metrics being sent to your OpenTelemetry collector!

## Using Docker

Prefer running everything in a Docker container? No problem!

### Building and Running the Docker Container

To build and run the Docker container using Docker Compose, navigate to the root of the project and run:

```bash
docker-compose -f exemples/composer/docker-compose.yml up --build
```

This will spin up your application in a Docker container, ready to send traces and metrics to your OpenTelemetry setup.

### Accessing the Application

The application is exposed on port `3000`. You can access it at `http://localhost:3000`.

## Project Structure

Here’s a quick overview of the project’s structure:

```bash
nodejs-otel-agent/
├── dist/                   # Compiled JavaScript files
├── exemples/               # Example configurations for Docker and Kubernetes
│   └── composer/           # Docker Compose example
├── src/                    # Source TypeScript files
├── package.json            # Project configuration and dependencies
├── tsconfig.json           # TypeScript configuration
├── Dockerfile              # Dockerfile for containerization
└── README.md               # Project documentation
```

## How It Works: Simplifying Instrumentation

### The Motivation

Instrumentation in Node.js can sometimes be tricky and time-consuming, especially when trying to ensure that your application is properly configured to send traces and metrics to a backend like OpenTelemetry. The motivation behind this project is to simplify the process of instrumenting Node.js applications by automating much of the setup through a well-structured Dockerfile and environment configuration.

### The Dockerfile Magic

The `Dockerfile` provided in this project takes care of the heavy lifting for you:

```
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install OpenTelemetry Agent for NodeJS by Leonardo Zwirtes
RUN npm install otel-agent-nodejs

COPY . .

RUN npm run build

# Set NODE_OPTIONS to load OpenTelemetry before application
ENV NODE_OPTIONS="--require otel-agent-nodejs"

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### Key Components:

1. **Installing Dependencies**: The `otel-agent-nodejs` package is installed during the Docker build process. This package is designed to simplify the inclusion of OpenTelemetry in your application by requiring minimal setup on your part.
2. **Environment Configuration**: The `NODE_OPTIONS` environment variable is set to automatically require the OpenTelemetry agent before your application starts. This ensures that all necessary instrumentation is in place without the need to modify your application code.
3. **Ease of Use**: By using Docker, the entire environment is isolated, consistent, and easy to deploy. You don't need to worry about configuring your local machine or setting up complex environments—everything is handled within the container.

### Why This Matters

This setup drastically reduces the complexity and potential errors involved in instrumenting a Node.js application. It’s particularly useful for educational purposes or for quickly setting up observability in new or existing projects.

## Required Environment Variables

For the OpenTelemetry instrumentation to work correctly, certain environment variables need to be configured. These variables are essential whether you're running the application via Docker or deploying it in a Kubernetes environment.

### Docker Compose

In the `docker-compose.yml` file, you'll find the following environment variables:

```yaml
version: "3"

services:
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    ports:
      - "4317:4317"
      - "4318:4318"
      - "55680:55680"
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    command: ["--config=/etc/otel-collector-config.yaml"]

  nodejs-otel-agent1:
    build:
      context: ../..
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - OTEL_SERVICE_NAME=nodejs-otel-agent
      - OTEL_TRACES_EXPORTER=otlp
      - OTEL_METRICS_EXPORTER=otlp
      - OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://otel-collector:4318/v1/traces
      - OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://otel-collector:4318/v1/metrics
```

### Kubernetes Deployment

If you're deploying this application on Kubernetes, ensure that the following environment variables are set in your deployment YAML:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-otel-agent-deployment
  labels:
    app: nodejs-otel-agent
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nodejs-otel-agent
  template:
    metadata:
      labels:
        app: nodejs-otel-agent
    spec:
      containers:
        - name: nodejs-otel-agent
          image: leonardozwirtes/nodejs-otel-agent:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
          env:
            - name: OTEL_SERVICE_NAME
              value: "nodejs-otel-agent"
            - name: OTEL_TRACES_EXPORTER
              value: "otlp"
            - name: OTEL_METRICS_EXPORTER
              value: "otlp"
            - name: OTEL_EXPORTER_OTLP_TRACES_ENDPOINT
              value: "http://opentelemetrycollector.default.svc.cluster.local:4318/v1/traces"
            - name: OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
              value: "http://opentelemetrycollector.default.svc.cluster.local:4318/v1/metrics"
```

### Why These Variables Are Important

- **OTEL_SERVICE_NAME**: This variable sets the name of your service in the OpenTelemetry traces. It's crucial for identifying which service generated which traces.
- **OTEL_TRACES_EXPORTER**: Specifies the exporter to be used for sending trace data. Here, it's set to `otlp` (OpenTelemetry Protocol).
- **OTEL_METRICS_EXPORTER**: Specifies the exporter for sending metrics data, also set to `otlp`.
- **OTEL_EXPORTER_OTLP_TRACES_ENDPOINT**: Defines the endpoint where the OpenTelemetry collector is running. This is where the traces are sent.
- **OTEL_EXPORTER_OTLP_METRICS_ENDPOINT**: Defines the endpoint where the OpenTelemetry collector is running. This is where the metrics are sent.

These environment variables ensure that your application is correctly instrumented and that the OpenTelemetry agent can communicate with the OpenTelemetry collector.

## Available Routes

The application exposes several routes that you can access:

- **`/`**: A simple welcome message.
- **`/buteco`**: Returns a fun message—perfect for testing!
- **`/external-service-1`**: Fetches data from an external service (simulated with JSONPlaceholder).
- **`/external-service-2`**: Another external service endpoint (simulated with JSONPlaceholder).
- **`/external-service-3`**: Yet another external service endpoint (simulated with JSONPlaceholder).
- **`/file-manager-url`**: Displays the configured file manager URL.
- **`/local-service`**: Calls a local service within the application.
- **`/file-manager-service`**: Interacts with the file manager service.

These routes are designed to help you test the OpenTelemetry instrumentation and see how traces and metrics are collected and reported.

## Features

- **OpenTelemetry Integration**: The app is fully instrumented with OpenTelemetry for tracing and metrics.
- **Docker Support**: Easily containerize and deploy the app using Docker.
- **TypeScript**: The app is written in TypeScript for robust and scalable code.
- **Educational and Fun**: A great project to learn about observability in a fun and engaging way!

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. Let’s make this project even better together!

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.notion.so/LICENSE) file for more details.

---

Happy coding! 🚀