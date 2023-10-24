import EventRepository from './event.repository';
import { Event } from '../../domain/events';

jest.mock('knex', () => jest.fn().mockReturnValue(
  jest.fn().mockReturnValue({
    insert: jest.fn().mockResolvedValue({
      insertedId: 1,
    }),
    select: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        first: jest.fn().mockResolvedValue({
          id: '78c1-fcdf-4147',
          type: 'deposit',
          version: '1.0',
          payload: '',
          created: '2010-01-01',
        }),
      }),
      whereIn: jest.fn().mockReturnValue({
        andWhere: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockResolvedValue([{
            id: '78c1-fcdf-4147',
            type: 'deposit',
            version: '1.0',
            payload: '',
            created: '2010-01-01',
          }]),
        }),
      }),
    }),
  }),
));

describe('EventRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test save event', async () => {
    const eventRepo = new EventRepository();
    const mockEvent:Event = {
      id: 'd85c78c1-fcdf-4147-b835-134d14662fa2',
      type: 'deposit',
      version: '1.0',
      payload: '',
      created: '2010-01-01',
    };
    const result = await eventRepo.save(mockEvent);
    expect(result).toStrictEqual({ insertedId: 1 });
  });

  it('test get event by id', async () => {
    const eventRepo = new EventRepository();
    const result = await eventRepo.getById('78c1-fcdf-4147');
    const mock = {
      id: '78c1-fcdf-4147',
      type: 'deposit',
      version: '1.0',
      payload: '',
      created: '2010-01-01',
    };
    expect(result).toStrictEqual(mock);
  });
  it('test searchEvent id', async () => {
    const eventRepo = new EventRepository();
    const accountId = '78c1-fcdf-4147';
    const result = await eventRepo.searchEvent(['depositComplete'], `%"accountId":"${accountId}"%`);
    const mock = [{
      id: '78c1-fcdf-4147',
      type: 'deposit',
      version: '1.0',
      payload: '',
      created: '2010-01-01',
    }];
    expect(result).toStrictEqual(mock);
  });
});
