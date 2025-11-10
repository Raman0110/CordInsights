import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { NotFoundError } from "rxjs";


@Injectable()
export class ServerService {
  constructor
    (
      private readonly configService: ConfigService
    ) { }

  getGuildById = async (guildId: string) => {
    const server = await axios.get(`${this.configService.get("DISCORD_URL")}/guilds/${guildId}`, {
      headers: {
        Authorization: `Bot ${this.configService.get("DISCORD_BOT_TOKEN")}`
      }
    });

    if (!server) return null;

    return server;
  }
}