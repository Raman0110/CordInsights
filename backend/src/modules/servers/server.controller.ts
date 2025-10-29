import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import axios from "axios";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ServerService } from "./server.service";


@Controller("server")
export class ServerController {

  constructor(private readonly serverService: ServerService) { }


  @UseGuards(JWTAuthGuard)
  @Get("all")
  async getUserServer(@Req() req: any, @Res() res: any) {
    try {
      const accessToken = await this.serverService.getUserAccessToken(req.user.userId);
      const response = await axios.get(`https://discord.com/api/v10/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      res.json(response.data);
    } catch (error: any) {

      res.status(error.response?.status || 500).json({
        error: error.response?.data || error.message,
        status: error.response?.status
      });
    }
  }
}