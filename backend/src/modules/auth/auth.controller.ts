import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DiscordAuthGuard } from "./guards/discord-auth.guard";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("discord")
  @UseGuards(DiscordAuthGuard)
  async discordLogin() { } //passport handles login
}