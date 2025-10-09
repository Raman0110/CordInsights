import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Server } from '../servers/server.entity';
import { Channel } from '../channels/channel.entity';

@Entity('daily_channel_stats')
export class DailyChannelStats {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Server, (server) => server.dailyChannelStats, { onDelete: 'CASCADE' })
  server: Server;

  @ManyToOne(() => Channel, (channel) => channel.dailyStats, { onDelete: 'CASCADE' })
  channel: Channel;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 0 })
  messagesSent: number;

  @Column({ default: 0 })
  uniqueUsers: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  avgMessageLength: number;
}
