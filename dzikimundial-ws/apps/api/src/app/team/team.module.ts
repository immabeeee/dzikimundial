import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../shared/logger/logger.module';
import { TeamController } from './controller/team.controller';
import { TeamEntity } from './model/team.entity';
import { TEAM_SERVICE } from './model/token';
import { TeamService } from './service/team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity]),
    AuthModule,
    LoggerModule,
  ],
  providers: [{
    provide: TEAM_SERVICE,
    useClass: TeamService
  }],
  controllers: [TeamController],
  exports: []
})
export class TeamModule {}
