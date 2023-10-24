import { Request, Response, NextFunction } from 'express';
import validate from './transaction.middleware';
import logger from '../utils/logger';

// Mocks
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
}));

const mockNext = jest.fn() as NextFunction;

describe('validate middleware', () => {
  it('detect logger stdout', () => {
    const validRequestBody = {
      type: 'deposit',
      ammount: 40000,
      accountId: '111232323',
    };

    mockRequest.body = validRequestBody;
    validate(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      { accountId: '111232323', ammount: 40000 },
      'Deposit over warning value',
    );
  });
});
