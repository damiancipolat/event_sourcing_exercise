import { Request, Response, NextFunction } from 'express';
import validate from './account.guard';

// Mocks
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

const mockNext = jest.fn() as NextFunction;

describe('validate middleware', () => {
  it('should pass validation for a valid request body', () => {
    const validRequestBody = {
      name: 'test',
      surname: 'test',
      email: 'mock@aaa.com',
      accountNumber: '121321323',
    };

    mockRequest.body = validRequestBody;

    validate(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('should return a 400 error response for an invalid request body', () => {
    const invalidRequestBody = {
      type: 'deposit',
      ammount: 1000,
    };

    mockRequest.body = invalidRequestBody;

    validate(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'error in schema' });
  });
});
