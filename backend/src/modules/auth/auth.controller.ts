import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DiscordAuthGuard } from "./guards/discord-auth.guard";
import type { Request, Response } from "express";
import { JWTAuthGuard } from "./guards/jwt-auth.guard";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("discord")
  @UseGuards(DiscordAuthGuard)
  async discordLogin() { } //passport handles login

  @Get("discord/callback")
  @UseGuards(DiscordAuthGuard)
  async discordLoginCallback(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException('No user found after Discord authentication');
    }
    const user = req.user;
    const jwt = await this.authService.loginWithDiscord(user);
    const response = {
      token: jwt.accessToken,
      user: jwt.user
    }
    res.json(response)
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getProfile(@Req() req: Request, @Res() res: Response) {
    res.status(200).json(req.user);
  }
}