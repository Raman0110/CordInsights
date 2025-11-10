import { Module } from '@nestjs/common';
import { AnalyticsModule } from '../analytics/analytics.module';
import { BotGateway } from './bot.gateway';
import { BotController } from './bot.controller';
import { ServerService } from '../servers/server.service';

@Module({
  imports: [AnalyticsModule],
  providers: [BotGateway, ServerService],
  controllers: [BotController]
})
export class BotModule { }
