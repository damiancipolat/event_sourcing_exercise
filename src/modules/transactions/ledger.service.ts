import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { Transaction } from '../../domain/models';

import {
  Event,
  WithdrawCompleteEvent,
  DepositCompleteEvent,
} from '../../domain/events';

import eventService from '../eventStore/event.service';
import constants from './constants';

const parseToEvent = (type:string, newEvent:WithdrawCompleteEvent|DepositCompleteEvent):Event => {
  const event:Event = {
    id: newEvent.id,
    type,
    version: '1.0',
    created: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    payload: JSON.stringify(newEvent),
  };

  return event;
};

const executeDeposit = async (operation:Transaction):Promise<Transaction> => {
  const event:DepositCompleteEvent = {
    transaction: operation,
    id: uuidv4(),
  };

  await eventService.publish(parseToEvent(constants.DEPOSIT_COMPLETE, event));
  return operation;
};

const executeWithdraw = async (operation:Transaction) => {
  const event:DepositCompleteEvent = {
    transaction: operation,
    id: uuidv4(),
  };

  await eventService.publish(parseToEvent(constants.WITHDRAW_COMPLETE, event));
  return operation;
};

export {
  executeWithdraw,
  executeDeposit,
};
