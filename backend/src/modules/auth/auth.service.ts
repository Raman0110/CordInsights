import { Injectable } from "@nestjs/common";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  async validateDiscordUser(profile: Partial<User>) {
    let user = await this.userRepo.findOne({ where: { discordId: profile.discordId } });

    if (!user) {
      user = this.userRepo.create(profile);
      await this.userRepo.save(user);
    }

    return user;
  }
}