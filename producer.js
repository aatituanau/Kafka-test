// Hides partitioner warning
process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1" 

const { Kafka } = require('kafkajs')

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'mi-app-productor',
  brokers: ['localhost:9092']
})

// Create a producer instance
const producer = kafka.producer()

const run = async () => {
  // Connect to the broker
  await producer.connect()
  console.log('✅ Productor conectado a Kafka.')

  // Send a message to the topic
  await producer.send({
    topic: 'mi-topic-paso-a-paso',
    messages: [
      { value: `¡Hola Kafka! Este es un mensaje de prueba #${Math.floor(Math.random() * 1000)}` },
    ],
  })

  console.log('✉️ Mensaje enviado exitosamente.')
  
  // Disconnect the producer
  await producer.disconnect()
}

run().catch(console.error)
