import eventService from './event.service';

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

describe('EventService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('test publish method', async () => {
    const event = {
      id: '78c1-fcdf-4147',
      type: 'deposit',
      version: '1.0',
      payload: '',
      created: '2010-01-01',
    };
    const result = await eventService.publish(event);
    expect(result).toEqual(event.id);
  });

  it('test search method', async () => {
    const event = {
      id: '78c1-fcdf-4147',
      type: 'deposit',
      version: '1.0',
      payload: '',
      created: '2010-01-01',
    };
    const accountId = '78c1-fcdf-4147';
    const result = await eventService.search(['deposit'], `%"accountId":"${accountId}"%`);
    expect(result).toStrictEqual([event]);
  });
});
