import { Controller, Get, Param, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServerService } from "../servers/server.service";
import type { Response } from "express";


@Controller("bot")
export class BotController {
  constructor
    (
      private readonly configService: ConfigService,
      private readonly serverService: ServerService
    ) { }

  @Get("invite")
  generateInvite(@Query('guild_id') guildId: string) {
    const clientId = this.configService.get("DISCORD_CLIENT_ID");
    const scopes = ["bot", "applications.commands"];
    const permissions = 274877925376;

    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=${scopes.join('%20')}&permissions=${permissions}&guild_id=${guildId}`;

    return inviteUrl;
  }

  @Get("status/:guildId")
  async getStatus(res: Response, @Param("guildId") guildId: string) {
    try {
      const server = await this.serverService.getGuildById(guildId);
      return { isInstalled: !!server }
    } catch (error: any) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data || error.message,
        status: error.response?.status
      });
    }
  }
}