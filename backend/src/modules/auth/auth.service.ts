import { Injectable } from "@nestjs/common";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { DiscordProfile } from "./discord.strategy";


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) { }

  async loginWithDiscord(profile: DiscordProfile) {
    let user = await this.userRepo.findOne({ where: { discordId: profile.discordId } });

    if (!user) {
      user = this.userRepo.create({
        discordId: profile.discordId,
        username: profile.username,
        discriminator: profile.discriminator,
        avatarUrl: profile.avatar,
        email: profile.email,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
      })
      await this.userRepo.save(user);
    }

    const payload = {
      sub: user.id,
      discordId: user.discordId,
      username: user.username,
    }

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }
}