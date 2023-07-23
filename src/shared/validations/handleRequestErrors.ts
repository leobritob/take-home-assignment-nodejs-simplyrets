import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function handleRequestErrors(error: any, req: Request, res: Response, next: NextFunction) {
  let { statusCode = 500, name, message } = error;
  const payload: any = { error: name, message };
  if (error instanceof ZodError) {
    delete payload.message;
    statusCode = 400;
    payload.error = 'ValidationException';
    payload.errors = error.errors;
  }
  return res.status(statusCode).json(payload);
}
