import uuid from 'uuid';

import { Transaction } from '../../domain/models';

import {
  Event,
  WithdrawCompleteEvent,
  DepositCompleteEvent,
} from '../../domain/events';

import { publish } from '../eventStore/event.service';

const parseToEvent = (type:string, newEvent:WithdrawCompleteEvent|DepositCompleteEvent):Event => {
  const event:Event = {
    id: newEvent.id,
    type,
    version: '1.0',
    created: new Date().toISOString(),
    payload: JSON.stringify(newEvent),
  };

  return event;
};

const executeDeposit = async (operation:Transaction):Promise<Transaction> => {
  const event:DepositCompleteEvent = {
    transaction: operation,
    date: new Date().toISOString(),
    id: uuid.v4(),
  };

  await publish(parseToEvent('depositComplete', event));
  return operation;
};

const executeWithdraw = async (operation:Transaction) => {
  const event:DepositCompleteEvent = {
    transaction: operation,
    date: new Date().toISOString(),
    id: uuid.v4(),
  };

  await publish(parseToEvent('withdrawComplete', event));
  return operation;
};

export {
  executeWithdraw,
  executeDeposit,
};
