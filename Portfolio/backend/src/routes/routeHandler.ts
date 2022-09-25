import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    error: (code: number, message: string) => Response;
    success: (code: number, message: string, result: any) => Response;
  }
}

const routeHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log('routeHandler=====');
  res.error = (statusCode: number, errorMessage: string) => res.status(statusCode).json(errorMessage);
  res.success = (statusCode: number, message: string, result: any) =>
    res.status(statusCode).json({
      message,
      result,
    });
  return next();
};

export default routeHandler;
