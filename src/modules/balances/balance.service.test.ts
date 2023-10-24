import constants from '../transactions/constants';
import BalanceService from './balance.service';

jest.mock('../eventStore/event.service', () => ({
  search: jest.fn().mockResolvedValue([
    {
      type: constants.DEPOSIT_COMPLETE,
      id: '111111',
      version: '1.0',
      created: '2023-01-01 12:12:34',
      payload: JSON.stringify({
        transaction: { ammount: 100 },
      }),
    },
  ]),
}));

describe('EventService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('test get balance', async () => {
    const balanceSrv = new BalanceService();
    const total = await balanceSrv.getBalance('111111-222-333-444');
    expect(total).toEqual(100);
  });
});
