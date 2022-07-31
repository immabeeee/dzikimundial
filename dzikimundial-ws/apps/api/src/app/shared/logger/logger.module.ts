import { Module } from '@nestjs/common';
import { LoggerService } from './service/logger.service';

@Module({
    imports: [
    ],
    providers: [LoggerService],
    controllers: [],
    exports: [LoggerService]
})
export class LoggerModule { }
