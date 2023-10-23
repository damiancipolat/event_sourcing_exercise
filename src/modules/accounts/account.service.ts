import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { Account } from '../../domain/models';
import { Event, AccountCreatedEvent } from '../../domain/events';
import eventService from '../eventStore/event.service';
import constants from './constants';

const parseToEvent = (newEvent:AccountCreatedEvent):Event => {
  const event:Event = {
    id: newEvent.id,
    type: constants.ACCOUNT_CREATED,
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
  await eventService.publish(parseToEvent(event));

  return toCreate;
};

const findAccount = async (accountNumber:string):Promise<Account|null> => {
  const accountFound:Event[] = await eventService.search(['accountCreated'], `%"accountNumber":"${accountNumber}"%`);

  if (accountFound && accountFound.length > 0) {
    const event:AccountCreatedEvent = JSON.parse(accountFound[accountFound.length - 1].payload);
    return event.account;
  }

  return null;
};

export {
  findAccount,
  createAccount,
  buildEvent,
  parseToEvent,
};
