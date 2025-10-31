import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class ServerService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  getUserAccessToken = async (userId: string) => {
    const user = await this.userRepo.findOne({ where: { id: userId } })
    if (!user) throw new Error("No user found for provided id");

    return user.accessToken
  }
}