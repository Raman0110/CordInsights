import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DiscordAuthGuard } from "./guards/discord-auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { DiscordStrategy } from "./discord.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "discord" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: '7d' }
      })
    })
  ],
  providers: [AuthService, DiscordStrategy, DiscordAuthGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }