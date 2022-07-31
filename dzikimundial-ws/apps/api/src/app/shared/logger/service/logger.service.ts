import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string): void {
    Logger.log(message);
  }
}
