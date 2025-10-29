import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServerModule } from './modules/servers/server.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    AuthModule,
    ServerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
