const { Kafka } = require('kafkajs')

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'mi-app-consumidor',
  brokers: ['localhost:9092']
})

// Create a consumer with a specific group ID
const consumer = kafka.consumer({ groupId: 'grupo-lectores-1' })

const run = async () => {
  // Connect the consumer
  await consumer.connect()
  console.log('✅ Consumidor conectado. Esperando mensajes...')

  // Subscribe to the topic from the beginning
  await consumer.subscribe({ topic: 'mi-topic-paso-a-paso', fromBeginning: true })

  // Listen for messages continuously
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`\n📥 MENSAJE RECIBIDO [Topic: ${topic} | Partición: ${partition}]`)
      console.log(`💬 Contenido: ${message.value.toString()}`)
    },
  })
}

run().catch(console.error)
