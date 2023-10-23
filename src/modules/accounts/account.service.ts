import uuid from 'uuid';
import { Account } from '../../domain/models';
import { Event, AccountCreatedEvent } from '../../domain/events';
import { publish } from '../eventStore/event.service';

const parseToEvent = (newEvent:AccountCreatedEvent):Event => {
  const event:Event = {
    id: newEvent.id,
    type: 'accountCreated',
    version: '1.0',
    created: new Date().toISOString(),
    payload: JSON.stringify(newEvent),
  };

  return event;
};

const buildEvent = (toCreate:Account):AccountCreatedEvent => ({
  id: uuid.v4(),
  account: toCreate,
  date: new Date().toISOString(),
});

const createAccount = async (toCreate:Account):Promise<Account> => {
  const event:AccountCreatedEvent = buildEvent(toCreate);
  await publish(parseToEvent(event));

  return toCreate;
};

export {
  createAccount,
  buildEvent,
  parseToEvent,
};
