import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import Strategy, { StrategyOptions } from "passport-discord";


interface DiscordProfile extends Profile {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  guilds?: any[];
}

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get<string>('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email', 'guilds'],
    } as StrategyOptions);
  }

  async validate(accessToken: string, refreshToken: string, profile: DiscordProfile,) {
    const { id, username, discriminator, avatar, email, guilds } = profile;

    return {
      discordId: id,
      username,
      discriminator,
      avatar,
      email,
      accessToken,
      refreshToken,
      guilds, // List of servers user is in
    };
  }
}