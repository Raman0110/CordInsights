import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServerModule } from './modules/servers/server.module';
import { BotModule } from './modules/bot/bot.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    AuthModule,
    ServerModule,
    BotModule,
    AnalyticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
