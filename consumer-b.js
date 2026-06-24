const { Kafka } = require('kafkajs')

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'app-notificaciones', 
  brokers: ['localhost:9092']
})

// A different consumer group
const consumer = kafka.consumer({ groupId: 'grupo-lectores-2' })

const run = async () => {
  await consumer.connect()
  console.log('🔔 [Consumidor B] Conectado. Pertenezco al Grupo 2...')
  
  await consumer.subscribe({ topic: 'mi-topic-paso-a-paso', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`\n📧 [Consumidor B] Reaccionando al mismo mensaje: ${message.value.toString()}`)
    },
  })
}

run().catch(console.error)
