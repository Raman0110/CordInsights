import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../modules/users/user.entity";
import { Server } from "../modules/servers/server.entity";
import { Member } from "../modules/members/member.entity";
import { Message } from "../modules/messages/message.entity";
import { Channel } from "../modules/channels/channel.entity";
import { Alert } from "../modules/alerts/alert.entity";
import { DailyChannelStats } from "../modules/stats/daily-channel-stats.entity";
import { DailyServerStats } from "../modules/stats/daily-server-stats.entity";
import { RoleActivityStats } from "../modules/stats/role-activity-stats.entity";
import { Auth } from "../modules/auth/auth.entity";
import { Report } from "../modules/reports/report.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        synchronize: true, // Use only in development; for production, use migrations
        entities: [User, Server, Member, Message, Channel, Alert, DailyChannelStats, DailyServerStats, RoleActivityStats, Auth, Report]
      }),
    }),
  ],
})

export class DbModule { };