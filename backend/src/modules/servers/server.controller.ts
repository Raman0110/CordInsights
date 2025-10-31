import { Controller, Get, Param, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import axios from "axios";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ServerService } from "./server.service";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";


@Controller("server")
export class ServerController {

  constructor(
    private readonly serverService: ServerService,
    private readonly configService: ConfigService
  ) { }


  @Get("all")
  @UseGuards(JWTAuthGuard)
  async getUserServer(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req.user?.userId) {
        throw new UnauthorizedException("User not authenticated");
      }

      const accessToken = await this.serverService.getUserAccessToken(req?.user?.userId);
      const response = await axios.get(`${this.configService.get('DISCORD_URL')}/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      res.status(200).json(response.data);
    } catch (error: any) {

      res.status(error.response?.status || 500).json({
        error: error.response?.data || error.message,
        status: error.response?.status
      });
    }
  }
}