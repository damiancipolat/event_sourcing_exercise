import { Request, Response } from 'express';
import {
  depositController, withdrawController,
} from './transaction.controller';
import ledgerService from './ledger.service';

jest.mock('./ledger.service', () => ({
  executeDeposit: jest.fn().mockResolvedValue({
    type: 'deposit',
    ammount: 100,
    accountId: '12345',
  }),
  executeWithdraw: jest.fn().mockResolvedValue({
    type: 'withdraw',
    ammount: 10,
    accountId: '12345',
  }),
}));

describe('depositController', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should respond with a 200 status code and the created transaction on success', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    req.body = {
      type: 'deposit',
      ammount: 100,
      accountId: '12345',
    };

    await depositController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accountId: '12345',
      ammount: 100,
      type: 'deposit',
    });
  });

  it('should respond with a 500 status code and an empty object on error', async () => {
    ledgerService.executeDeposit = jest.fn().mockRejectedValue(new Error('Some error'));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    req.body = {
      ammount: 100,
      accountId: '12345',
    };

    await depositController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({});
  });
});

describe('withdrawController', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should respond with a 200 status code and the created transaction on success', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    req.body = {
      type: 'withdraw',
      ammount: 10,
      accountId: '12345',
    };

    await withdrawController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accountId: '12345',
      ammount: 10,
      type: 'withdraw',
    });
  });

  it('should respond with a 500 status code and an empty object on error', async () => {
    ledgerService.executeWithdraw = jest.fn().mockRejectedValue(new Error('Some error'));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    req.body = {
      ammount: 100,
      accountId: '12345',
    };

    await withdrawController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({});
  });
});
