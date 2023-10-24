import { v4 as uuidv4 } from 'uuid';
import { parseToEvent, buildEvent } from './account.service';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('1111-222-333'),
}));

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

describe('buildEvent', () => {
  it('should build an account event', () => {
    const toCreate = {
      accountId: '11111',
      accountNumber: '333333',
      customer: {
        name: 'damian',
        surname: 'cipolat',
        email: 'damian.cipolat@gmail.com',
      },
    };

    const compare = {
      id: '1111-222-333',
      account: {
        accountId: '11111',
        accountNumber: '333333',
        customer: {
          name: 'damian',
          surname: 'cipolat',
          email: 'damian.cipolat@gmail.com',
        },
      },
    };
    const event = buildEvent(toCreate);
    expect(event).toStrictEqual(compare);
  });
});

describe('parseToEvent', () => {
  it('should parse an account created event', () => {
    const accountEvent = {
      id: uuidv4(),
      account: {
        accountId: '11111',
        accountNumber: '333333',
        customer: {
          name: 'damian',
          surname: 'cipolat',
          email: 'damian.cipolat@gmail.com',
        },
      },
    };

    const compare = {
      id: '1111-222-333',
      type: 'accountCreated',
      version: '1.0',
      created: '2023-10-24 15:30:00',
      payload: '{"id":"1111-222-333","account":{"accountId":"11111","accountNumber":"333333","customer":{"name":"damian","surname":"cipolat","email":"damian.cipolat@gmail.com"}}}',
    };
    const result = parseToEvent(accountEvent);
    expect(result).toStrictEqual(compare);
  });
});
