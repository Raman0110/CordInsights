import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Server } from '../servers/server.entity';

@Entity('daily_server_stats')
export class DailyServerStats {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Server, (server) => server.dailyStats, { onDelete: 'CASCADE' })
  server: Server;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 0 })
  totalMembers: number;

  @Column({ default: 0 })
  activeMembers: number;

  @Column({ default: 0 })
  inactiveMembers: number;

  @Column({ default: 0 })
  newJoins: number;

  @Column({ default: 0 })
  leaves: number;

  @Column({ default: 0 })
  messagesSent: number;

  @Column({ default: 0 })
  uniqueActiveUsers: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  serverHealthScore: number;
}
