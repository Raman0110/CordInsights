import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DiscordAuthGuard } from "./guards/discord-auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { DiscordStrategy } from "./discord.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, DiscordStrategy, DiscordAuthGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }