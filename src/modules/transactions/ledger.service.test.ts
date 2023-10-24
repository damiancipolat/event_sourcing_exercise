import ledgerService from './ledger.service';
import constants from './constants';
import { Transaction } from '../../domain/models';

import {
  Event,
  DepositCompleteEvent,
} from '../../domain/events';

jest.mock('luxon', () => {
  const originalModule = jest.requireActual('luxon');
  return {
    ...originalModule,
    DateTime: {
      ...originalModule.DateTime,
      now: () => ({
        toFormat: () => '2023-10-24 15:30:00',
      }),
    },
  };
});

jest.mock('../eventStore/event.service', () => ({
  publish: jest.fn().mockResolvedValue({}),
}));

describe('ledgerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('executeDeposit', () => {
    it('parseToEvent', () => {
      const tran:Transaction = {
        type: 'deposit',
        ammount: 100,
        accountId: 'd85c78c1-fcdf-4147-b835',
      };
      const event:DepositCompleteEvent = {
        transaction: tran,
        id: 'd85c78c1-fcdf-4147-b835-134d14662fa2',
      };

      const compare = {
        id: 'd85c78c1-fcdf-4147-b835-134d14662fa2',
        type: 'depositComplete',
        version: '1.0',
        created: '2023-10-24 15:30:00',
        payload: '{"transaction":{"type":"deposit","ammount":100,"accountId":"d85c78c1-fcdf-4147-b835"},"id":"d85c78c1-fcdf-4147-b835-134d14662fa2"}',
      };

      const parsed:Event = ledgerService.parseToEvent(constants.DEPOSIT_COMPLETE, event);
      expect(parsed).toStrictEqual(compare);
    });

    it('Test execute deposit', async () => {
      const mockTransaction:Transaction = {
        type: 'deposit',
        ammount: 100,
        accountId: 'd85c78c1-fcdf-4147-b835',
      };

      const result = await ledgerService.executeDeposit(mockTransaction);
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('executeWithDraw', () => {
    it('Test execute withdraw', async () => {
      const mockTransaction:Transaction = {
        type: 'withdraw',
        ammount: 100,
        accountId: 'd85c78c1-fcdf-4147-b835',
      };

      const result = await ledgerService.executeDeposit(mockTransaction);
      expect(result).toEqual(mockTransaction);
    });
  });
});
