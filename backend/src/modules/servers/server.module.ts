import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { JwtStrategy } from "../auth/jwt.strategy";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";


@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  providers: [ServerService],
  controllers: [ServerController],
  exports: [ServerService],
})
export class ServerModule { }