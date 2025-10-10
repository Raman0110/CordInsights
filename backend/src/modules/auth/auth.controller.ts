import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DiscordAuthGuard } from "./guards/discord-auth.guard";
import type { Request, Response } from "express";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("discord")
  @UseGuards(DiscordAuthGuard)
  async discordLogin() { } //passport handles login

  @Get("discord/callback")
  @UseGuards(DiscordAuthGuard)
  async discordLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = (req as any).user;
    const jwt = await this.authService.loginWithDiscord(user);
    const response = {
      token: jwt.accessToken,
      user: jwt.user
    }
    res.json(response)
  }

  @Get('me')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}