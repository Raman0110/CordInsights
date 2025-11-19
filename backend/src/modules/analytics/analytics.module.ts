import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { Event } from './analytics.entity';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [
    AnalyticsService,
  ],
  exports: [
    AnalyticsService,
    TypeOrmModule,
  ],
  controllers: [AnalyticsController]
})
export class AnalyticsModule { }
