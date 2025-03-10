import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'pub', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '12',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
});
