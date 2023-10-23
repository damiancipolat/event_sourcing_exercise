import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { Account } from '../../domain/models';
import { Event, AccountCreatedEvent } from '../../domain/events';
import { publish } from '../eventStore/event.service';

const parseToEvent = (newEvent:AccountCreatedEvent):Event => {
  const event:Event = {
    id: 0,
    type: 'accountCreated',
    version: '1.0',
    created: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    payload: JSON.stringify(newEvent),
  };

  return event;
};

const buildEvent = (toCreate:Account):AccountCreatedEvent => ({
  id: uuidv4(),
  account: toCreate,
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
