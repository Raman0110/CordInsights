import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Server } from '../servers/server.entity';

export enum ReportType {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum ReportSentVia {
  DISCORD_DM = 'discord_dm',
  CHANNEL_POST = 'channel_post',
  EMAIL = 'email',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Server, (server) => server.reports, { onDelete: 'CASCADE' })
  server: Server;

  @Column({ type: 'enum', enum: ReportType })
  reportType: ReportType;

  @Column({ type: 'jsonb' })
  content: any;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: ReportSentVia, default: ReportSentVia.DISCORD_DM })
  sentVia: ReportSentVia;
}
