import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Server } from '../servers/server.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  discordId: string; // From Discord OAuth2

  @Column()
  username: string;

  @Column({ nullable: true })
  discriminator: string; // e.g., "#1234"

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  email: string; // Some Discord users share it via OAuth2 scope

  @Column({ default: false })
  isAdmin: boolean; // For platform-level admin (not Discord server admin)

  @Column()
  accessToken: string

  @Column()
  refreshToken: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Server, (server) => server.owner)
  servers: Server[];
}
