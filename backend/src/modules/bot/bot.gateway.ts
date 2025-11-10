import {
  Injectable,
  OnModuleInit,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class BotGateway implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BotGateway.name);
  private readonly client: Client;

  constructor(private readonly analyticsService: AnalyticsService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel, Partials.Message],
    });
  }

  async onModuleInit() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      this.logger.log(`🤖 Bot logged in as ${this.client.user?.tag}`);


      this.client.on(Events.MessageCreate, async (message) => {
        if (!message.guild || message.author.bot) return;

        await this.analyticsService.recordEvent({
          guildId: message.guild.id,
          userId: message.author.id,
          channelId: message.channel.id,
          event: 'messageCreate',
          timestamp: new Date(),
        });
      });

      this.client.on(Events.GuildMemberAdd, async (member) => {
        await this.analyticsService.recordEvent({
          guildId: member.guild.id,
          userId: member.id,
          event: 'guildMemberAdd',
          timestamp: new Date(),
        });
      });

      this.client.on(Events.GuildMemberRemove, async (member) => {
        await this.analyticsService.recordEvent({
          guildId: member.guild.id,
          userId: member.id,
          event: 'guildMemberRemove',
          timestamp: new Date(),
        });
      });

      this.client.on(Events.MessageDelete, async (message) => {
        if (!message.guild) return;

        await this.analyticsService.recordEvent({
          guildId: message.guild.id,
          userId: message.author?.id || 'unknown',
          channelId: message.channelId,
          event: 'messageDelete',
          timestamp: new Date(),
        });
      });

      this.logger.log('✅ Discord event listeners registered successfully.');
    } catch (error) {
      this.logger.error('Failed to initialize Discord Bot:', error);
    }
  }

  async onModuleDestroy() {
    await this.client.destroy();
    this.logger.log('🛑 Discord bot connection closed.');
  }

}
