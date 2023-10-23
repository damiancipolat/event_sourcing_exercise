import { Event } from '../../domain/events';
import EventRepository from './event.repository';

const eventStore = new EventRepository();

const publish = async (newEvent:Event):Promise<string> => {
  // Check if the event exist to handle idempotency.
  const found:Event| null = await eventStore.getById(newEvent.id);

  if (found) {
    return newEvent.id;
  }

  await eventStore.save(newEvent);
  return newEvent.id;
};

const search = async (typeList:string[], likeExp:string): Promise<Event[]> => {
  const results = await eventStore.searchEvent(typeList, likeExp);
  return results;
};

export default {
  publish,
  search,
};
