import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Server } from '../servers/server.entity';
import { Member } from '../members/member.entity';
import { Message } from '../messages/message.entity';
import { DailyChannelStats } from '../stats/daily-channel-stats.entity';

export enum ChannelType {
  TEXT = 'text',
  VOICE = 'voice',
  CATEGORY = 'category',
  THREAD = 'thread',
}

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discordChannelId: string;

  @ManyToOne(() => Server, (server) => server.channels, { onDelete: 'CASCADE' })
  server: Server;

  @Column()
  name: string;

  @Column({ type: "enum", enum: ChannelType })
  type: ChannelType

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[]

  @OneToMany(() => DailyChannelStats, (dailyStats) => dailyStats.channel)
  dailyStats: DailyChannelStats[]
}
