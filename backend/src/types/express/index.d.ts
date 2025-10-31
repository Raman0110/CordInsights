import { DiscordProfile } from "../../modules/auth/discord.strategy";

export { };

declare global {
  namespace Express {
    interface User extends DiscordProfile {
      userId: string;
      discordId: string;
      username: string;
    }
  }
}