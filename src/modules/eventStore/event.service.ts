import { Event } from '../../domain/events';
import EventRepository from './event.repository';

const eventStore = new EventRepository();

const publish = async (newEvent:Event):Promise<number> => {
  // Check if the event exist to handle idempotency.
  const found:Event| null = await eventStore.getById(newEvent.id);

  if (found) {
    return newEvent.id;
  }

  await eventStore.save(newEvent);
  return newEvent.id;
};

const searchEvent = async (typeList:string[], likeExp:string): Promise<Event[]> => {
  const results = await eventStore.searchEvent(typeList, likeExp);
  return results;
};

export {
  publish,
  searchEvent,
};

/*
exports

todo:
    - agregar parsers para los tipos de eventos de dominio a la entidad evento de la bd     ?
    - agregar repository al event store para interactuar con la db                          ok
    - agregar event.store.service para asegurar cosas como:
        - idempotencia                                                                      ok
    - crear ledger module para registrar las operaciones de deposit y withdraw
    - crear balance que pueda reconstruir todas las transacciones y calculr el valor final,
        crear un metodo apply para ir actualizando el valor de estado de una clase.
*/
