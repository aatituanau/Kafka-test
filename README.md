# Apache Kafka - Practical Test

This repository contains a step-by-step practical implementation of Apache Kafka using Node.js and Docker. 
It demonstrates the core concepts of Pub/Sub architecture, Producers, Consumers, and Consumer Groups.

## Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose installed.
- [Node.js](https://nodejs.org/) installed.

## Project Structure

- `docker-compose.yml`: Infrastructure setup (Zookeeper, Kafka, and Kafka-UI).
- `producer.js`: A Node.js script that sends dynamic messages to the Kafka cluster.
- `consumer.js`: A primary consumer script (belonging to `readers-group-1`) that listens for messages.
- `consumer-b.js`: An alternative consumer script (belonging to `readers-group-2`) to demonstrate Kafka's broadcast capability to different groups.

## Getting Started

### 1. Start the Kafka Cluster
Open your terminal in the project directory and run:
```bash
docker-compose up -d
```
This will start Zookeeper, Kafka, and the Kafka-UI dashboard.

### 2. Install Dependencies
Install the required Node.js libraries (KafkaJS):
```bash
npm install
```

### 3. Visual Dashboard (Kafka-UI)
You can visually monitor your Kafka cluster, topics, and messages by opening your web browser and navigating to:
[http://localhost:8080](http://localhost:8080)

---

## How to Test the Flow

To see Kafka in action, you will need to run the following scripts in separate terminals to simulate a distributed system.

### Step 1: Start the Primary Consumer
In your first terminal window, start the main consumer:
```bash
node consumer.js
```
*The consumer will connect to Kafka and wait for incoming messages.*

### Step 2: Send a Message
Open a second terminal and execute the producer script:
```bash
node producer.js
```
*This will publish a single dynamic message to the topic. Check your first terminal; the consumer will immediately output the received message.*

### Step 3: Test Broadcast with Another Group
To see how Kafka handles multiple systems subscribing to the same data stream without competing for messages, open a third terminal and run:
```bash
node consumer-b.js
```
*Since this consumer uses a different `groupId`, it will read the entire message history from the beginning. If you run `node producer.js` again, you will see **both** consumers react and receive the message simultaneously!*

## Distributed Test (Connecting with a Colleague)
If you want to test this with a colleague on the same network:
1. Find your local IP address (e.g., `192.168.1.50`).
2. Update the `docker-compose.yml` file: Replace `localhost` with your IP address on the `KAFKA_ADVERTISED_LISTENERS` line.
3. Restart your docker containers (`docker-compose down` then `docker-compose up -d`).
4. Ask your colleague to replace `localhost` in their `producer.js` or `consumer.js` file with your IP address.
5. You are now communicating across machines!
