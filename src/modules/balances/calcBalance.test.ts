import calculateBalance from './calcBalance';
import constants from '../transactions/constants';
import { Event } from '../../domain/events';

describe('calculateBalance', () => {
  it('should calculate the balance correctly for deposits', () => {
    const transactions:Event[] = [
      {
        type: constants.DEPOSIT_COMPLETE,
        id: '111111',
        version: '1.0',
        created: '2023-01-01 12:12:34',
        payload: JSON.stringify({
          transaction: { ammount: 100 },
        }),
      },
      {
        type: constants.WITHDRAW_COMPLETE,
        id: '222222',
        version: '1.0',
        created: '2023-01-01 12:12:34',
        payload: JSON.stringify({
          transaction: { ammount: 20 },
        }),
      },
      {
        type: constants.DEPOSIT_COMPLETE,
        id: '33333',
        version: '1.0',
        created: '2023-01-01 12:12:34',
        payload: JSON.stringify({
          transaction: { ammount: 1 },
        }),
      },
    ];

    const result = calculateBalance(transactions);
    expect(result).toEqual(81);
  });
});
